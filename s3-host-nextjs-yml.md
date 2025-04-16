# Hosting a Next.js App on AWS S3 Using CloudFormation

This guide provides a step-by-step tutorial to host your existing Next.js portfolio website (from the previous artifact, `2cbd3d0f-aa2b-4080-a03d-b2c8b192fcad`) on Amazon S3 using a CloudFormation template instead of AWS CDK. The Next.js app is already built as a static site, and we’ll create a CloudFormation template to configure an S3 bucket for website hosting, deploy the build files, and make the site publicly accessible. I’ll leverage your interest in practical, hands-on coding (from our prior conversations about Node.js, CI/CD, and TypeScript) to ensure the instructions are clear and actionable.

---

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version 18 or higher (`node -v`).
- **npm**: Included with Node.js (`npm -v`).
- **AWS CLI**: Configured with `aws configure` (Access Key, Secret Key, region e.g., `us-east-1`, output `json`).
- **Git**: For version control (`git --version`).
- **Next.js App**: The `shiv-portfolio-app` from the previous artifact, with static files in `out/` after running `npm run build`.
- **Code Editor**: VS Code or similar.
- **AWS Account**: With permissions to create S3 buckets and CloudFormation stacks.

Verify the Next.js build:

```bash
cd shiv-portfolio/shiv-portfolio-app
ls out
```

You should see `index.html`, `_next/`, etc. If not, rebuild:

```bash
npm run build
```

---

## Step-by-Step Tutorial

### Step 1: Prepare the CloudFormation Template

We’ll create a CloudFormation template to define an S3 bucket for website hosting and set up public access. Unlike CDK, which generates templates programmatically, CloudFormation requires a static YAML or JSON file.

1. **Create a Template Directory**:

   In the `shiv-portfolio` root directory (outside `shiv-portfolio-app`), create a folder for CloudFormation:

   ```bash
   mkdir cloudformation
   cd cloudformation
   ```

2. **Write the CloudFormation Template**:

   Create a file named `s3-website.yaml`:

   ```yaml
   AWSTemplateFormatVersion: '2010-09-09'
   Description: CloudFormation template to host a Next.js static website on S3
   
   Resources:
     WebsiteBucket:
       Type: AWS::S3::Bucket
       Properties:
         BucketName: !Sub shiv-portfolio-${AWS::AccountId}-${AWS::Region}
         AccessControl: PublicRead
         WebsiteConfiguration:
           IndexDocument: index.html
           ErrorDocument: index.html
         Tags:
           - Key: Name
             Value: ShivPortfolioWebsite
   
     BucketPolicy:
       Type: AWS::S3::BucketPolicy
       Properties:
         Bucket: !Ref WebsiteBucket
         PolicyDocument:
           Statement:
             - Sid: PublicReadForGetBucketObjects
               Effect: Allow
               Principal: '*'
               Action: s3:GetObject
               Resource: !Sub arn:aws:s3:::${WebsiteBucket}/*
   
   Outputs:
     WebsiteURL:
       Description: URL of the portfolio website
       Value: !GetAtt WebsiteBucket.WebsiteURL
     BucketName:
       Description: Name of the S3 bucket
       Value: !Ref WebsiteBucket
   ```

   **Explanation**:

   - **WebsiteBucket**:
     - Creates an S3 bucket named `shiv-portfolio-<account-id>-<region>` (unique to avoid conflicts).
     - Sets `AccessControl: PublicRead` for public access.
     - Configures website hosting with `index.html` as the default and error document (for SPA routing).
     - Adds a `Name` tag for identification.
   - **BucketPolicy**:
     - Grants public `s3:GetObject` permissions to allow anyone to view the website files.
     - Uses `!Sub` to reference the bucket’s ARN dynamically.
   - **Outputs**:
     - `WebsiteURL`: The S3 website endpoint (e.g., `http://shiv-portfolio-123456789012-us-east-1.s3-website-us-east-1.amazonaws.com`).
     - `BucketName`: The bucket name for reference.

   Save the file in `cloudformation/s3-website.yaml`.

---

### Step 2: Validate the CloudFormation Template

Before deploying, validate the template to catch syntax errors:

```bash
aws cloudformation validate-template --template-body file://s3-website.yaml
```

You should see output like:

```json
{
    "Parameters": [],
    "Description": "CloudFormation template to host a Next.js static website on S3",
    "Capabilities": []
}
```

If errors occur, check YAML indentation (use 2 spaces) or syntax issues.

---

### Step 3: Deploy the CloudFormation Stack

1. **Create the Stack**:

   Deploy the template to create the S3 bucket:

   ```bash
   aws cloudformation create-stack \
     --stack-name ShivPortfolioStack \
     --template-body file://s3-website.yaml \
     --capabilities CAPABILITY_IAM
   ```

   - `stack-name`: Unique name for the stack.
   - `template-body`: Path to the YAML file.
   - `capabilities CAPABILITY_IAM`: Included in case future policies require IAM (safe to add).

2. **Monitor Stack Creation**:

   Check the stack’s status:

   ```bash
   aws cloudformation describe-stack-events \
     --stack-name ShivPortfolioStack \
     --query 'StackEvents[0:5].[ResourceStatus,LogicalResourceId]' \
     --output table
   ```

   Wait ~1-2 minutes. When complete, the stack status should be `CREATE_COMPLETE`:

   ```bash
   aws cloudformation describe-stacks \
     --stack-name ShivPortfolioStack \
     --query 'Stacks[0].StackStatus'
   ```

3. **Retrieve Outputs**:

   Get the website URL and bucket name:

   ```bash
   aws cloudformation describe-stacks \
     --stack-name ShivPortfolioStack \
     --query 'Stacks[0].Outputs'
   ```

   Example output:

   ```json
   [
     {
       "OutputKey": "WebsiteURL",
       "OutputValue": "http://shiv-portfolio-123456789012-us-east-1.s3-website-us-east-1.amazonaws.com",
       "Description": "URL of the portfolio website"
     },
     {
       "OutputKey": "BucketName",
       "OutputValue": "shiv-portfolio-123456789012-us-east-1",
       "Description": "Name of the S3 bucket"
     }
   ]
   ```

   Note the `BucketName` (e.g., `shiv-portfolio-123456789012-us-east-1`) and `WebsiteURL`.

---

### Step 4: Upload Next.js Build Files to S3

The CloudFormation template creates the bucket but doesn’t upload files (unlike CDK’s `BucketDeployment`). We’ll manually upload the `out/` directory using the AWS CLI.

1. **Navigate to Next.js Build**:

   Ensure you’re in the Next.js app directory:

   ```bash
   cd ../shiv-portfolio-app
   ```

   Verify the `out/` directory exists:

   ```bash
   ls out
   ```

2. **Sync Files to S3**:

   Upload the static files to the S3 bucket, replacing `<bucket-name>` with the `BucketName` from the outputs (e.g., `shiv-portfolio-123456789012-us-east-1`):

   ```bash
   aws s3 sync out/ s3://<bucket-name> --delete
   ```

   - `sync`: Copies files from `out/` to the bucket, only updating changed files.
   - `--delete`: Removes files in the bucket that aren’t in `out/`, keeping it clean.

   Example:

   ```bash
   aws s3 sync out/ s3://shiv-portfolio-123456789012-us-east-1 --delete
   ```

   This uploads `index.html`, `_next/`, and other assets.

---

### Step 5: Test the Website

1. **Access the Website**:

   Open the `WebsiteURL` from the CloudFormation outputs in a browser (e.g., `http://shiv-portfolio-123456789012-us-east-1.s3-website-us-east-1.amazonaws.com`).

   You should see your Next.js portfolio website with your resume details (header, about, technologies, work experience, education, contact), styled with Tailwind CSS.

2. **Verify Content**:

   - Check sections load correctly (e.g., click GitHub/LinkedIn links).
   - Ensure responsiveness on mobile devices.
   - If you see a 404 error, verify `index.html` is in the bucket:

     ```bash
     aws s3 ls s3://<bucket-name>/
     ```

     Confirm `index.html` and `_next/` are present.

---

### Step 6: Update the Website (Optional)

To update the site (e.g., after editing `src/app/page.tsx`):

1. Rebuild the Next.js app:

   ```bash
   cd ../shiv-portfolio-app
   npm run build
   ```

2. Sync updated files:

   ```bash
   aws s3 sync out/ s3://<bucket-name> --delete
   ```

3. Refresh the website URL to see changes.

---

### Step 7: Clean Up

To avoid AWS charges, delete the stack and bucket contents:

1. **Delete Stack**:

   ```bash
   aws cloudformation delete-stack --stack-name ShivPortfolioStack
   ```

2. **Wait for Deletion**:

   Confirm deletion:

   ```bash
   aws cloudformation describe-stacks --stack-name ShivPortfolioStack
   ```

   If it returns `Stack does not exist`, deletion is complete. Otherwise, wait ~1-2 minutes.

3. **Verify Bucket Removal**:

   Check if the bucket is gone:

   ```bash
   aws s3 ls s3://<bucket-name>
   ```

   If it still exists (rare), manually delete it:

   ```bash
   aws s3 rb s3://<bucket-name> --force
   ```

---

## Project Structure

Your project should now include:

```
shiv-portfolio/
├── shiv-portfolio-app/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx
│   ├── public/
│   ├── out/
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
├── cloudformation/
│   └── s3-website.yaml
```

---

## Additional Notes

- **Why CloudFormation vs. CDK?**:
  - CloudFormation is a lower-level IaC tool, requiring manual template creation but offering fine-grained control.
  - Unlike CDK’s programmatic approach, CloudFormation is declarative, suitable for static configurations like S3 hosting.
  - Your familiarity with AWS (from resume: Lambda, CDK, CloudFormation) makes this a natural fit.

- **Limitations**:
  - CloudFormation doesn’t automate file uploads like CDK’s `BucketDeployment`. We used `aws s3 sync` instead.
  - For automated uploads, consider adding a CI/CD pipeline (e.g., GitHub Actions, as you’ve explored in CI/CD).

- **Enhancements**:
  - **CloudFront**: Add a CDN for HTTPS and faster delivery. Extend the template with `AWS::CloudFront::Distribution`.
  - **Route 53**: Use a custom domain (e.g., shivsrivastava.com). Ask for a template if needed.
  - **CI/CD**: Automate uploads with GitHub Actions (aligned with your resume’s GitHub Actions experience).

- **Cost**:
  - S3 hosting costs ~$0.50/month for low traffic.
  - Free tier includes 5 GB S3 storage for new accounts.
  - Monitor costs in AWS Billing Dashboard.
  - Deleting the stack prevents charges.

- **Troubleshooting**:
  - **Access Denied**: Verify the bucket policy allows `s3:GetObject` for `*`.
    - Check in AWS Console > S3 > Bucket > Permissions.
    - Reapply policy if needed:
      ```bash
      aws s3api put-bucket-policy --bucket <bucket-name> --policy file://policy.json
      ```
      ```json
      {
        "Statement": [
          {
            "Sid": "PublicReadForGetBucketObjects",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<bucket-name>/*"
          }
        ]
      }
      ```
  - **404 Errors**: Ensure `index.html` is uploaded and `WebsiteConfiguration` sets `index.html` as the error document.
  - **Template Errors**: Validate with `aws cloudformation validate-template` before deploying.
  - **Upload Issues**: Confirm `out/` exists and `aws s3 sync` targets the correct bucket.

- **Your Context**:
  - Your resume highlights AWS, Next.js, and CI/CD expertise, making S3 hosting a showcase of your skills.
  - The portfolio (from artifact `2cbd3d0f-aa2b-4080-a03d-b2c8b192fcad`) is unchanged, ensuring consistency.
  - The manual `s3 sync` aligns with your hands-on approach (e.g., Node.js, TypeScript projects).

---

## Accessing Your Website

- **URL**: Use the `WebsiteURL` from CloudFormation outputs.
- **Updates**: Edit `page.tsx`, rebuild, and sync files.
- **Domain**: For a custom domain, add CloudFront and Route 53 (request template if interested).

Your Next.js portfolio is now hosted on S3 using CloudFormation, accessible worldwide! If you need further tweaks (e.g., HTTPS, CI/CD, or debugging), let me know.

