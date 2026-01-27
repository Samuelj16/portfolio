#!/bin/bash

# ============================================
# AWS S3 + CloudFront Deployment Script
# Student Portfolio Website
# ============================================

set -e  # Exit on error

# Configuration - UPDATE THESE VALUES
BUCKET_NAME="samuel-joseph-portfolio"  # Must be globally unique
REGION="us-east-1"                    # AWS region
PROFILE=""                            # AWS CLI profile (leave empty for default)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored message
print_status() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Get script directory (where portfolio files are)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# AWS CLI command with optional profile
AWS_CMD="aws"
if [ -n "$PROFILE" ]; then
    AWS_CMD="aws --profile $PROFILE"
fi

# ============================================
# Pre-flight Checks
# ============================================

print_status "Running pre-flight checks..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first:"
    echo "  brew install awscli  # macOS"
    echo "  pip install awscli   # Python"
    exit 1
fi

# Check if AWS credentials are configured
if ! $AWS_CMD sts get-caller-identity &> /dev/null; then
    print_error "AWS credentials not configured. Run 'aws configure' first."
    exit 1
fi

print_success "AWS CLI configured"

# Check if bucket name is set
if [ "$BUCKET_NAME" = "your-portfolio-bucket" ]; then
    print_error "Please update BUCKET_NAME in this script before running."
    exit 1
fi

# ============================================
# Create S3 Bucket
# ============================================

print_status "Setting up S3 bucket: $BUCKET_NAME"

# Check if bucket exists
if $AWS_CMD s3api head-bucket --bucket "$BUCKET_NAME" 2>/dev/null; then
    print_warning "Bucket already exists, skipping creation"
else
    print_status "Creating S3 bucket..."

    if [ "$REGION" = "us-east-1" ]; then
        $AWS_CMD s3api create-bucket \
            --bucket "$BUCKET_NAME" \
            --region "$REGION"
    else
        $AWS_CMD s3api create-bucket \
            --bucket "$BUCKET_NAME" \
            --region "$REGION" \
            --create-bucket-configuration LocationConstraint="$REGION"
    fi

    print_success "Bucket created"
fi

# ============================================
# Configure Bucket for Static Website Hosting
# ============================================

print_status "Configuring static website hosting..."

# Enable static website hosting
$AWS_CMD s3 website "s3://$BUCKET_NAME/" \
    --index-document index.html \
    --error-document index.html

# Create bucket policy for public access
POLICY=$(cat <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF
)

# Disable block public access
$AWS_CMD s3api put-public-access-block \
    --bucket "$BUCKET_NAME" \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

# Apply bucket policy
echo "$POLICY" | $AWS_CMD s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy file:///dev/stdin

print_success "Static website hosting configured"

# ============================================
# Upload Files
# ============================================

print_status "Uploading files to S3..."

# Sync files with appropriate content types and cache headers
$AWS_CMD s3 sync "$PROJECT_DIR" "s3://$BUCKET_NAME/" \
    --exclude "deploy/*" \
    --exclude ".git/*" \
    --exclude ".DS_Store" \
    --exclude "*.md" \
    --delete

# Set cache headers for different file types
print_status "Setting cache headers..."

# HTML files - no cache (always fresh)
$AWS_CMD s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
    --recursive \
    --exclude "*" \
    --include "*.html" \
    --metadata-directive REPLACE \
    --cache-control "no-cache, no-store, must-revalidate" \
    --content-type "text/html"

# CSS files - cache for 1 year (use versioning in production)
$AWS_CMD s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
    --recursive \
    --exclude "*" \
    --include "*.css" \
    --metadata-directive REPLACE \
    --cache-control "max-age=31536000, public" \
    --content-type "text/css"

# JavaScript files - cache for 1 year
$AWS_CMD s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
    --recursive \
    --exclude "*" \
    --include "*.js" \
    --metadata-directive REPLACE \
    --cache-control "max-age=31536000, public" \
    --content-type "application/javascript"

# Images - cache for 1 year
$AWS_CMD s3 cp "s3://$BUCKET_NAME/" "s3://$BUCKET_NAME/" \
    --recursive \
    --exclude "*" \
    --include "*.png" \
    --include "*.jpg" \
    --include "*.jpeg" \
    --include "*.gif" \
    --include "*.svg" \
    --include "*.webp" \
    --metadata-directive REPLACE \
    --cache-control "max-age=31536000, public"

print_success "Files uploaded"

# ============================================
# Create CloudFront Distribution (Optional)
# ============================================

create_cloudfront() {
    print_status "Creating CloudFront distribution..."

    # Check if distribution already exists for this bucket
    EXISTING_DIST=$($AWS_CMD cloudfront list-distributions \
        --query "DistributionList.Items[?Origins.Items[0].DomainName=='$BUCKET_NAME.s3.amazonaws.com'].Id" \
        --output text)

    if [ -n "$EXISTING_DIST" ] && [ "$EXISTING_DIST" != "None" ]; then
        print_warning "CloudFront distribution already exists: $EXISTING_DIST"
        return
    fi

    # Create distribution config
    DIST_CONFIG=$(cat <<EOF
{
    "CallerReference": "portfolio-$(date +%s)",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": { "Forward": "none" }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true
    },
    "Comment": "Portfolio Website CDN",
    "Enabled": true,
    "DefaultRootObject": "index.html",
    "PriceClass": "PriceClass_100",
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    }
}
EOF
)

    # Create the distribution
    DIST_RESULT=$(echo "$DIST_CONFIG" | $AWS_CMD cloudfront create-distribution \
        --distribution-config file:///dev/stdin)

    DIST_ID=$(echo "$DIST_RESULT" | grep -o '"Id": "[^"]*"' | head -1 | cut -d'"' -f4)
    DIST_DOMAIN=$(echo "$DIST_RESULT" | grep -o '"DomainName": "[^"]*"' | head -1 | cut -d'"' -f4)

    print_success "CloudFront distribution created"
    echo ""
    echo -e "${GREEN}CloudFront Domain:${NC} https://$DIST_DOMAIN"
    echo -e "${YELLOW}Note: It may take 10-15 minutes for the distribution to deploy${NC}"
}

# ============================================
# Output URLs
# ============================================

echo ""
echo "============================================"
print_success "Deployment Complete!"
echo "============================================"
echo ""
echo -e "${GREEN}S3 Website URL:${NC}"
echo "  http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""

# Ask about CloudFront
read -p "Would you like to create a CloudFront distribution for HTTPS and CDN? (y/n): " create_cf
if [ "$create_cf" = "y" ] || [ "$create_cf" = "Y" ]; then
    create_cloudfront
fi

echo ""
echo "============================================"
echo -e "${BLUE}Next Steps:${NC}"
echo "============================================"
echo "1. Update your GitHub username in js/github.js"
echo "2. Replace placeholder content with your own"
echo "3. Add your project images to assets/images/"
echo "4. For custom domain, configure Route 53 or your DNS provider"
echo ""
echo -e "${YELLOW}To update your site, run this script again${NC}"
echo ""
