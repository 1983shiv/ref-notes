
# Next.js Portfolio Website and AWS CDK Deployment for Shiv Srivastava

This artifact provides a complete step-by-step guide to create a Next.js portfolio website displaying your resume and deploy it to Amazon S3 using AWS CDK. The website will be a single-page application showcasing your details from the provided resume, and the CDK stack will configure S3 for static website hosting with public access. Below, I’ll walk you through creating the Next.js app, building it, setting up the CDK infrastructure, and deploying everything to AWS.

---

## Step-by-Step Tutorial

### Step 1: Set Up Your Development Environment

Ensure you have the following installed:

- **Node.js**: Version 18 or higher. Download from [nodejs.org](https://nodejs.org).
- **npm**: Comes with Node.js, but verify with `npm -v`.
- **AWS CLI**: For AWS interactions. Install via `pip install awscli` or [AWS CLI docs](https://aws.amazon.com/cli/). Configure with `aws configure`, providing your Access Key, Secret Key, region (e.g., `us-east-1`), and output format (`json`).
- **AWS CDK**: Install globally with `npm install -g aws-cdk`.
- **TypeScript**: Install globally with `npm install -g typescript` (optional, as CDK will install it locally).
- **Git**: For version control. Install from [git-scm.com](https://git-scm.com).
- **Code Editor**: VS Code or any editor of your choice.

Verify installations:

```bash
node -v  # Should show v18.x.x or higher
npm -v   # Should show 8.x.x or higher
aws --version
cdk --version
git --version
```

---

### Step 2: Create the Next.js Application

We’ll create a Next.js app tailored to display your resume as a portfolio website with a clean, modern design using Tailwind CSS (as per your expertise listed in the resume).

1. **Initialize the Next.js Project**:

   Create a new directory for your project and set up Next.js:

   ```bash
   mkdir shiv-portfolio
   cd shiv-portfolio
   npx create-next-app@latest shiv-portfolio-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

   - Select **TypeScript** for consistency with your skills.
   - Enable **Tailwind CSS** for styling.
   - Use **App Router** for modern Next.js routing.
   - Accept other defaults (e.g., ESLint, src directory).

   Navigate to the app directory:

   ```bash
   cd shiv-portfolio-app
   ```

2. **Install Additional Dependencies**:

   Install `lucide-react` for icons to enhance the UI:

   ```bash
   npm install lucide-react
   ```

3. **Update Next.js Configuration**:

   To ensure the app is exportable as a static site for S3 hosting, modify `next.config.mjs`:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export', // Enable static export for S3 hosting
     trailingSlash: true, // Ensure S3 serves index.html correctly
     images: {
       unoptimized: true, // Disable image optimization for static export
     },
   };

   export default nextConfig;
   ```

   - `output: 'export'` generates static HTML files.
   - `trailingSlash: true` ensures URLs end with `/` for S3 compatibility.
   - `images.unoptimized: true` avoids Next.js image optimization, as S3 doesn’t support it.

4. **Create the Portfolio Page**:

   Replace the default `src/app/page.tsx` with a custom component to display your resume. The design will include sections for your profile, skills, work experience, education, and contact info, styled with Tailwind CSS.

   ```tsx
   // src/app/page.tsx
   import { Github, Linkedin, Mail, Phone } from 'lucide-react';

   export default function Home() {
     return (
       <div className="min-h-screen bg-gray-100 font-sans">
         {/* Header */}
         <header className="bg-blue-900 text-white py-6">
           <div className="container mx-auto px-4">
             <h1 className="text-4xl font-bold">Shiv Srivastava</h1>
             <p className="text-xl mt-2">Full Stack Developer | AWS & Next.js Specialist</p>
           </div>
         </header>

         {/* Main Content */}
         <main className="container mx-auto px-4 py-8">
           {/* About Section */}
           <section className="mb-12">
             <h2 className="text-3xl font-semibold mb-4">About Me</h2>
             <p className="text-lg text-gray-700">
               Results-driven Full Stack Developer with 8+ years of experience in AWS-powered solutions, Next.js, and WordPress development. Expert in building scalable, high-performance applications using AWS (Amplify, Lambda, AppSync, Cognito, S3), React.js, and eCommerce platforms (Shopify, WooCommerce). Passionate about optimizing web performance and cloud scalability.
             </p>
           </section>

           {/* Skills Section */}
           <section className="mb-12">
             <h2 className="text-3xl font-semibold mb-4">Technologies</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <div>
                 <h3 className="text-xl font-medium">Frontend Development</h3>
                 <p className="text-gray-600">Next.js, React.js, Nuxt.js, Vue.js, TypeScript, JavaScript, Shadcn, TailwindCSS, BootstrapCSS, HTML, CSS3</p>
               </div>
               <div>
                 <h3 className="text-xl font-medium">Backend & APIs</h3>
                 <p className="text-gray-600">Node.js, Express.js, REST API, GraphQL, Prisma</p>
               </div>
               <div>
                 <h3 className="text-xl font-medium">Cloud & DevOps</h3>
                 <p className="text-gray-600">AWS (Amplify, AppSync, Lambda, Cognito, API Gateway, CloudFormation, CDK, Route 53, IAM, S3, CloudWatch), Docker, CI/CD Pipelines</p>
               </div>
               <div>
                 <h3 className="text-xl font-medium">eCommerce & CMS</h3>
                 <p className="text-gray-600">Shopify, WooCommerce, WordPress, PHP, Contentful</p>
               </div>
               <div>
                 <h3 className="text-xl font-medium">Databases</h3>
                 <p className="text-gray-600">MySQL, PostgreSQL, DynamoDB, MongoDB</p>
               </div>
               <div>
                 <h3 className="text-xl font-medium">Tools & Testing</h3>
                 <p className="text-gray-600">Git, GitHub, GitHub Actions, Bitbucket, Grunt.js, Jest, React Testing Library</p>
               </div>
             </div>
           </section>

           {/* Work Experience Section */}
           <section className="mb-12">
             <h2 className="text-3xl font-semibold mb-4">Work Experience</h2>
             <div className="space-y-6">
               {/* Freelance Auction API */}
               <div>
                 <h3 className="text-2xl font-medium">Freelance Full Stack Developer (Upwork)</h3>
                 <p className="text-gray-500">Jan 2025 – Mar 2025</p>
                 <p className="text-gray-600">AWS-Powered Auction API</p>
                 <ul className="list-disc pl-5 text-gray-600">
                   <li>Designed scalable backend with AWS Lambda, AppSync (GraphQL), and DynamoDB.</li>
                   <li>Implemented secure authentication with AWS Cognito (JWT tokens).</li>
                   <li>Developed real-time bidding logic and integrated AWS SES for notifications.</li>
                   <li>Used CDK for infrastructure and CloudWatch for monitoring.</li>
                 </ul>
               </div>
               {/* Heroic Media */}
               <div>
                 <h3 className="text-2xl font-medium">Senior WordPress Developer, Heroic Media Ltd</h3>
                 <p className="text-gray-500">Mar 2024 – Jan 2025</p>
                 <ul className="list-disc pl-5 text-gray-600">
                   <li>Developed custom Gutenberg blocks for HT Knowledge Base plugin.</li>
                   <li>Integrated WPForms and Formidable Forms with knowledge base.</li>
                   <li>Set up CI/CD pipelines with Bitbucket and AWS S3.</li>
                   <li>Used Grunt.js for SCSS compilation and JS minification.</li>
                 </ul>
               </div>
               {/* Freelance eCommerce */}
               <div>
                 <h3 className="text-2xl font-medium">Freelance Full Stack Developer (Upwork)</h3>
                 <p className="text-gray-500">eCommerce Website Redesign</p>
                 <p className="text-gray-600">https://impossiblefoods.com</p>
                 <ul className="list-disc pl-5 text-gray-600">
                   <li>Coded 24+ screens from Figma designs using Next.js.</li>
                   <li>Integrated Google Maps and Contentful APIs.</li>
                   <li>Optimized performance with React Developer Tools.</li>
                   <li>Wrote Jest test cases for components.</li>
                 </ul>
               </div>
               {/* Tventurer */}
               <div>
                 <h3 className="text-2xl font-medium">Senior WordPress + WooCommerce Developer, Tventurer Pvt Ltd</h3>
                 <p className="text-gray-500">Feb 2023 – Feb 2024</p>
                 <p className="text-gray-600">https://www.garmentprinting.es</p>
                 <ul className="list-disc pl-5 text-gray-600">
                   <li>Built custom eCommerce quotation system with Salesforce API.</li>
                   <li>Developed plugin for automated product data integration.</li>
                   <li>Optimized performance per Google Lighthouse standards.</li>
                 </ul>
               </div>
             </div>
           </section>

           {/* Education Section */}
           <section className="mb-12">
             <h2 className="text-3xl font-semibold mb-4">Education</h2>
             <div className="space-y-4">
               <div>
                 <h3 className="text-2xl font-medium">MCA, IGNOU</h3>
                 <p className="text-gray-500">2023 | 65.34%</p>
               </div>
               <div>
                 <h3 className="text-2xl font-medium">BCA, IGNOU</h3>
                 <p className="text-gray-500">2021 | 65.85%</p>
               </div>
               <div>
                 <h3 className="text-2xl font-medium">Intermediate (Science & Math), UP Board</h3>
                 <p className="text-gray-500">60.5%</p>
               </div>
               <div>
                 <h3 className="text-2xl font-medium">Certificate</h3>
                 <p className="text-gray-600">Prompt Engineering for Everyone – IBM Skills Network</p>
               </div>
             </div>
           </section>

           {/* Contact Section */}
           <section>
             <h2 className="text-3xl font-semibold mb-4">Contact</h2>
             <div className="flex flex-col space-y-2">
               <p className="flex items-center">
                 <Mail className="mr-2" /> srivastava.shiv@yahoo.co.in
               </p>
               <p className="flex items-center">
                 <Phone className="mr-2" /> +91 9696290861
               </p>
               <p className="flex items-center">
                 <Github className="mr-2" />
                 <a href="https://github.com/1983shiv" target="_blank" rel="noopener noreferrer">github.com/1983shiv</a>
               </p>
               <p className="flex items-center">
                 <Linkedin className="mr-2" />
                 <a href="https://linkedin.com/in/shiv-srivastava" target="_blank" rel="noopener noreferrer">linkedin.com/in/shiv-srivastava</a>
               </p>
             </div>
           </section>
         </main>

         {/* Footer */}
         <footer className="bg-blue-900 text-white py-4">
           <div className="container mx-auto px-4 text-center">
             <p>&copy; 2025 Shiv Srivastava. All rights reserved.</p>
           </div>
         </footer>
       </div>
     );
   }
   ```

   This code creates a responsive single-page portfolio:
   - **Header**: Displays your name and title.
   - **About**: Summarizes your expertise.
   - **Technologies**: Lists skills in a grid, categorized as in your resume.
   - **Work Experience**: Details key projects with links (e.g., garmentprinting.es, impossiblefoods.com).
   - **Education**: Lists degrees and certification.
   - **Contact**: Includes email, phone, GitHub, and LinkedIn with icons.
   - **Footer**: Adds a simple copyright.

5. **Test the Application Locally**:

   Run the development server to preview:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser. You should see your portfolio with a blue header, organized sections, and responsive design. Adjust styles if desired (e.g., change colors in `bg-blue-900` or fonts).

6. **Build the Static Site**:

   Generate the static files for S3:

   ```bash
   npm run build
   ```

   This creates an `out` directory with static HTML, CSS, and JS files. Verify the build:

   ```bash
   ls out
   ```

   You should see files like `index.html`, `_next/`, etc.

---

### Step 3: Create the AWS CDK Application

Now, we’ll create a CDK app to deploy the Next.js static files to an S3 bucket configured for website hosting.

1. **Initialize the CDK Project**:

   In the root `shiv-portfolio` directory (outside `shiv-portfolio-app`), create a CDK project:

   ```bash
   cd ..
   mkdir cdk-infra
   cd cdk-infra
   cdk init app --language typescript
   ```

   This sets up a TypeScript CDK project with boilerplate files.

2. **Install CDK Dependencies**:

   Install the required AWS CDK modules:

   ```bash
   npm install @aws-cdk/aws-s3 @aws-cdk/aws-s3-deployment
   ```

   Update `package.json` to ensure compatibility (example):

   ```json
   {
     "dependencies": {
       "aws-cdk-lib": "^2.140.0",
       "@aws-cdk/aws-s3": "^2.140.0",
       "@aws-cdk/aws-s3-deployment": "^2.140.0",
       "constructs": "^10.0.0",
       "source-map-support": "^0.5.21"
     }
   }
   ```

   Run:

   ```bash
   npm install
   ```

3. **Define the CDK Stack**:

   Replace `lib/cdk-infra-stack.ts` with the following code to create an S3 bucket and deploy the Next.js build files:

   ```typescript
   // lib/cdk-infra-stack.ts
   import * as cdk from 'aws-cdk-lib';
   import { Construct } from 'constructs';
   import * as s3 from 'aws-cdk-lib/aws-s3';
   import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
   import * as path from 'path';

   export class CdkInfraStack extends cdk.Stack {
     constructor(scope: Construct, id: string, props?: cdk.StackProps) {
       super(scope, id, props);

       // Create S3 bucket for website hosting
       const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
         websiteIndexDocument: 'index.html',
         websiteErrorDocument: 'index.html', // Fallback for SPA routing
         publicReadAccess: true,
         blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS, // Allow public read
         removalPolicy: cdk.RemovalPolicy.DESTROY, // Delete bucket on stack deletion
         autoDeleteObjects: true, // Auto-delete objects on bucket deletion
       });

       // Deploy Next.js build files to S3
       new s3deploy.BucketDeployment(this, 'DeployWebsite', {
         sources: [s3deploy.Source.asset(path.join(__dirname, '../../shiv-portfolio-app/out'))],
         destinationBucket: websiteBucket,
       });

       // Output the website URL
       new cdk.CfnOutput(this, 'WebsiteURL', {
         value: websiteBucket.bucketWebsiteUrl,
         description: 'URL of the portfolio website',
       });
     }
   }
   ```

   - **S3 Bucket**: Configured for static website hosting with `index.html` as the default document. `publicReadAccess: true` allows public access, required for portfolio visibility.
   - **BucketDeployment**: Copies the `out` directory from `shiv-portfolio-app` to the S3 bucket.
   - **Output**: Provides the website URL after deployment.
   - **RemovalPolicy.DESTROY**: Ensures the bucket is deleted when the stack is destroyed to avoid costs.

4. **Update CDK Entry Point**:

   Ensure `bin/cdk-infra.ts` points to the stack:

   ```typescript
   #!/usr/bin/env node
   import 'source-map-support/register';
   import * as cdk from 'aws-cdk-lib';
   import { CdkInfraStack } from '../lib/cdk-infra-stack';

   const app = new cdk.App();
   new CdkInfraStack(app, 'CdkInfraStack', {
     env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
   });
   ```

---

### Step 4: Deploy the Application

1. **Build the Next.js App Again**:

   Ensure the `out` directory is up-to-date:

   ```bash
   cd ../shiv-portfolio-app
   npm run build
   ```

2. **Bootstrap CDK (if not done)**:

   Bootstrap your AWS account/region for CDK:

   ```bash
   cd ../cdk-infra
   cdk bootstrap aws://<your-account-id>/<your-region>
   ```

   Replace `<your-account-id>` and `<your-region>` (e.g., `us-east-1`). Find your account ID via `aws sts get-caller-identity`.

3. **Synthesize the CDK Stack**:

   Generate the CloudFormation template to verify:

   ```bash
   cdk synth
   ```

   Check `cdk.out/` for the template. Look for the S3 bucket and deployment resources.

4. **Deploy the CDK Stack**:

   Deploy to AWS:

   ```bash
   cdk deploy CdkInfraStack
   ```

   - Approve any IAM changes if prompted.
   - Wait ~2-3 minutes for deployment.
   - Output will show:

     ```
     Outputs:
     CdkInfraStack.WebsiteURL = http://<bucket-name>.s3-website-<region>.amazonaws.com
     ```

   Copy the URL (e.g., `http://websitebucket-xxx.s3-website-us-east-1.amazonaws.com`).

5全世界

5. **Test the Website**:

   Open the `WebsiteURL` in a browser. You should see your portfolio website with your resume details, styled as designed. Navigate sections (About, Technologies, etc.) to ensure everything works.

---

### Step 5: Clean Up (Optional)

To avoid AWS charges, delete the stack when done:

```bash
cdk destroy CdkInfraStack
```

Confirm deletion. This removes the S3 bucket and files.

---

### Project Structure

Your project should look like this:

```
shiv-portfolio/
├── shiv-portfolio-app/
│   ├── src/
│   │   ├── app/
│   │   │   └── page.tsx
│   ├── public/
│   ├── out/ (generated after build)
│   ├── next.config.mjs
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
├── cdk-infra/
│   ├── lib/
│   │   └── cdk-infra-stack.ts
│   ├── bin/
│   │   └── cdk-infra.ts
│   ├── package.json
│   ├── tsconfig.json
```

---

### Additional Notes

- **Why S3 for Hosting?**:
  - S3 is cost-effective for static sites (~$0.50/month for low traffic).
  - Simple setup with CDK automation.
  - Scales globally, ideal for a portfolio [].[](https://medium.com/%40redrobotdev/deploy-a-static-website-to-aws-06f33920b29d)

- **Enhancements (Optional)**:
  - Add **CloudFront** for HTTPS and CDN:
    - Update CDK to include `aws-cloudfront` and `aws-route53` for a custom domain.
    - Example in [].[](https://aws.amazon.com/blogs/apn/automating-secure-and-scalable-website-deployment-on-aws-with-amazon-cloudfront-and-aws-cdk/)
  - Add a contact form using AWS SES or a third-party service.
  - Use GitHub Actions for CI/CD to auto-deploy updates [].[](https://dev.to/parmentierchristophe/how-to-deploy-static-next-js-to-aws-s3-1d4f)

- **Your Resume in Context**:
  - The site showcases your Next.js, AWS, and TypeScript skills, aligning with your experience (e.g., AWS Lambda, CDK, eCommerce).
  - Links to projects (e.g., garmentprinting.es) enhance credibility.
  - Tailwind CSS reflects your styling expertise.

- **Cost**:
  - S3 costs are minimal (<$1/month for low traffic).
  - Free tier covers 12 months for new AWS accounts.
  - Monitor usage in AWS Billing Dashboard.

- **Troubleshooting**:
  - **404 Errors**: Ensure `websiteErrorDocument: index.html` in CDK and `trailingSlash: true` in `next.config.mjs`.
  - **Build Fails**: Verify `out` directory exists (`npm run build`).
  - **Access Denied**: Check S3 bucket policy in AWS Console; `publicReadAccess: true` should allow reads.
  - **CDK Errors**: Ensure AWS CLI is configured (`aws configure`) and CDK is bootstrapped.

---

### Accessing Your Website

- **URL**: Use the `WebsiteURL` from CDK output.
- **Updates**: Modify `page.tsx`, rebuild (`npm run build`), and redeploy (`cdk deploy`).
- **Domain**: For a custom domain (e.g., shivsrivastava.com), add Route 53 and CloudFront (ask for CDK code if needed).

Your portfolio is now live on S3, showcasing your skills to potential employers or clients! If you need tweaks (e.g., animations, forms, or CloudFront), let me know.

