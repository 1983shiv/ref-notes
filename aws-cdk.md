This guide covers the essentials of AWS CDK with TypeScript, practical examples, and five real-world applications. Let me know if you need deeper dives into any service or app!

It'll provide a comprehensive guide to AWS CDK (Cloud Development Kit) in TypeScript, tailored for beginners to advanced users, covering definitions, setup, step-by-step app creation, and detailed examples of five real-world applications using popular AWS services.

---

## What is AWS CDK?

The **AWS Cloud Development Kit (CDK)** is an open-source framework that allows you to define cloud infrastructure as code (IaC) using familiar programming languages like TypeScript, Python, Java, C#, and Go. Instead of writing YAML/JSON templates (like AWS CloudFormation), you write code to define AWS resources, leveraging programming constructs like loops, conditionals, and abstractions.

**Key Features**:
- **High-level constructs**: Pre-built components for common patterns (e.g., Lambda + API Gateway).
- **Type safety**: TypeScript ensures compile-time validation of AWS resources.
- **Modularity**: Reuse code across projects with constructs and stacks.
- **Integration with CloudFormation**: CDK synthesizes CloudFormation templates under the hood.
- **Local testing**: Simulate AWS resources locally for faster development.

**Why TypeScript?**
TypeScript combines JavaScript’s flexibility with static typing, making it ideal for large-scale infrastructure projects. It offers autocompletion, type checking, and better IDE support, reducing errors when defining AWS resources.

---

## Step-by-Step Guide to AWS CDK with TypeScript

### Prerequisites
1. **AWS Account**: Sign up at [aws.amazon.com](https://aws.amazon.com).
2. **Node.js**: Install Node.js (v16 or later) from [nodejs.org](https://nodejs.org).
3. **AWS CLI**: Install and configure the AWS CLI (`aws configure`) with your credentials.
4. **TypeScript**: Installed globally via `npm install -g typescript`.
5. **AWS CDK CLI**: Install via `npm install -g aws-cdk`.
6. **IDE**: Use VS Code or any TypeScript-compatible IDE for better development experience.

### Step 1: Set Up a New CDK Project
1. **Create a directory** for your project:
   ```bash
   mkdir my-cdk-app
   cd my-cdk-app
   ```
2. **Initialize a CDK app**:
   ```bash
   cdk init app --language typescript
   ```
   This creates a scaffold with:
   - `lib/my-cdk-app-stack.ts`: Main stack definition.
   - `bin/my-cdk-app.ts`: Entry point for the app.
   - `package.json`: Node.js dependencies.
   - `cdk.json`: CDK configuration.
3. **Install AWS CDK libraries**:
   ```bash
   npm install @aws-cdk/aws-ec2 @aws-cdk/aws-lambda @aws-cdk/aws-appsync @aws-cdk/aws-apigateway @aws-cdk/aws-dynamodb @aws-cdk/aws-eventbridge @aws-cdk/aws-ses @aws-cdk/aws-sns @aws-cdk/aws-s3
   ```
4. **Verify setup**:
   ```bash
   cdk synth
   ```
   This generates a CloudFormation template in `cdk.out/`.

### Step 2: Understand CDK Concepts
- **Construct**: The building block of CDK. Represents an AWS resource (e.g., S3 bucket, Lambda function).
- **Stack**: A collection of constructs that form a deployable unit (maps to a CloudFormation stack).
- **App**: The root of your CDK project, containing one or more stacks.
- **Environment**: Specifies the AWS account and region for deployment.

### Step 3: Write Your First CDK Stack
Edit `lib/my-cdk-app-stack.ts` to define a simple S3 bucket:
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define an S3 bucket
    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Deletes bucket on stack deletion
      autoDeleteObjects: true, // Auto-deletes objects on bucket deletion
    });
  }
}
```

### Step 4: Deploy the Stack
1. **Bootstrap CDK** (one-time setup for your AWS account/region):
   ```bash
   cdk bootstrap aws://<your-account-id>/<your-region>
   ```
2. **Synthesize the template**:
   ```bash
   cdk synth
   ```
3. **Deploy the stack**:
   ```bash
   cdk deploy
   ```
   This creates the S3 bucket in your AWS account.
4. **Clean up** (optional):
   ```bash
   cdk destroy
   ```

---

## Example 1: EC2 with Nginx and WordPress
This example creates an EC2 instance running Nginx and WordPress.

**Code** (`lib/ec2-wordpress-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class Ec2WordpressStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'WordpressVPC', {
      maxAzs: 2,
    });

    // Create an EC2 instance
    const instance = new ec2.Instance(this, 'WordpressInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: new ec2.SecurityGroup(this, 'InstanceSG', {
        vpc,
        allowAllOutbound: true,
      }),
    });

    // Allow HTTP traffic
    instance.connections.allowFromAnyIpv4(ec2.Port.tcp(80), 'Allow HTTP');

    // User data script to install Nginx and WordPress
    instance.addUserData(
      `#!/bin/bash
      yum update -y
      amazon-linux-extras install nginx1 -y
      systemctl enable nginx
      systemctl start nginx
      yum install php php-mysqlnd php-fpm mariadb -y
      wget https://wordpress.org/latest.tar.gz
      tar -xzf latest.tar.gz -C /usr/share/nginx/html/
      chown -R nginx:nginx /usr/share/nginx/html/wordpress
      echo "server {
        listen 80;
        root /usr/share/nginx/html/wordpress;
        index index.php;
        location / {
          try_files \$uri \$uri/ /index.php?\$args;
        }
        location ~ \\.php$ {
          include fastcgi_params;
          fastcgi_pass unix:/run/php-fpm/www.sock;
          fastcgi_index index.php;
          fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        }
      }" > /etc/nginx/conf.d/wordpress.conf
      systemctl restart nginx
      systemctl restart php-fpm`
    );

    // Add SSM role for debugging
    instance.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore')
    );

    // Output the instance public IP
    new cdk.CfnOutput(this, 'InstancePublicIP', {
      value: instance.instancePublicIp,
    });
  }
}
```

**Deploy**:
1. Update `bin/my-cdk-app.ts` to use `Ec2WordpressStack`.
2. Run `cdk deploy`.
3. Access the WordPress site via the public IP (configure a database separately for production).

**Usage**:
- Hosts a WordPress blog or site.
- Scalable by adding an Auto Scaling Group.
- Secure with a custom security group.

---

## Example 2: Lambda + API Gateway + DynamoDB
This example creates a serverless REST API with Lambda and DynamoDB for a simple CRUD app.

**Code** (`lib/serverless-api-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class ServerlessApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB table
    const table = new dynamodb.Table(this, 'ItemsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create Lambda function
    const fn = new lambda.Function(this, 'ItemsFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const AWS = require('aws-sdk');
        const dynamo = new AWS.DynamoDB.DocumentClient();
        exports.handler = async (event) => {
          const id = event.pathParameters?.id || Math.random().toString(36).slice(2);
          const body = event.body ? JSON.parse(event.body) : {};
          if (event.httpMethod === 'GET') {
            const data = await dynamo.get({ TableName: '${table.tableName}', Key: { id } }).promise();
            return { statusCode: 200, body: JSON.stringify(data.Item) };
          } else if (event.httpMethod === 'PUT') {
            await dynamo.put({ TableName: '${table.tableName}', Item: { id, ...body } }).promise();
            return { statusCode: 200, body: JSON.stringify({ id, ...body }) };
          }
          return { statusCode: 400 };
        };
      `),
    });

    // Grant Lambda access to DynamoDB
    table.grantReadWriteData(fn);

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'ItemsApi');
    const items = api.root.addResource('items');
    const item = items.addResource('{id}');
    item.addMethod('GET', new apigateway.LambdaIntegration(fn));
    item.addMethod('PUT', new apigateway.LambdaIntegration(fn));

    // Output API URL
    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url });
  }
}
```

**Deploy**:
1. Update `bin/my-cdk-app.ts`.
2. Run `cdk deploy`.
3. Test with `curl <api-url>/items/123` (GET) or `curl -X PUT <api-url>/items/123 -d '{"name":"test"}'` (PUT).

**Usage**:
- Backend for apps needing simple CRUD operations.
- Scales automatically with Lambda.
- Cost-efficient for low-traffic APIs.

---

## Example 3: AppSync + DynamoDB
This example creates a GraphQL API with AppSync and DynamoDB.

**Code** (`lib/appsync-graphql-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class AppsyncGraphqlStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create DynamoDB table
    const table = new dynamodb.Table(this, 'TodosTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create AppSync API
    const api = new appsync.GraphqlApi(this, 'TodoApi', {
      name: 'todo-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
    });

    // Create data source
    const dataSource = api.addDynamoDbDataSource('TodoDataSource', table);

    // Define resolvers
    dataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getTodo',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    dataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'createTodo',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').auto(),
        appsync.Values.projecting('input')
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    // Output API URL and key
    new cdk.CfnOutput(this, 'GraphqlUrl', { value: api.graphqlUrl });
    new cdk.CfnOutput(this, 'ApiKey', { value: api.apiKey || '' });
  }
}
```

**GraphQL Schema** (`graphql/schema.graphql`):
```graphql
type Todo {
  id: ID!
  title: String!
}
type Query {
  getTodo(id: ID!): Todo
}
type Mutation {
  createTodo(input: TodoInput!): Todo
}
input TodoInput {
  title: String!
}
```

**Deploy**:
1. Create the `graphql/` folder and add `schema.graphql`.
2. Update `bin/my-cdk-app.ts`.
3. Run `cdk deploy`.
4. Test with a GraphQL client like Postman.

**Usage**:
- Powers modern frontends (React, Vue) with real-time GraphQL.
- Integrates with authentication (Cognito).
- Scales with AppSync’s managed infrastructure.

---

## Five Real-World CDK Applications

### 1. E-commerce Website
**Architecture**:
- **S3**: Static website hosting for frontend (React).
- **API Gateway + Lambda**: REST API for product catalog and orders.
- **DynamoDB**: Stores products, users, and orders.
- **SES**: Sends order confirmation emails.
- **CloudFront**: CDN for fast content delivery.

**Code** (`lib/ecommerce-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ses from 'aws-cdk-lib/aws-ses';

export class EcommerceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for frontend
    const bucket = new s3.Bucket(this, 'FrontendBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'Distribution', {
      originConfigs: [
        {
          s3OriginSource: { s3BucketSource: bucket },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    // DynamoDB table for products
    const productTable = new dynamodb.Table(this, 'ProductsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda for product API
    const productFn = new lambda.Function(this, 'ProductFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const AWS = require('aws-sdk');
        const dynamo = new AWS.DynamoDB.DocumentClient();
        exports.handler = async () => {
          const data = await dynamo.scan({ TableName: '${productTable.tableName}' }).promise();
          return { statusCode: 200, body: JSON.stringify(data.Items) };
        };
      `),
    });
    productTable.grantReadData(productFn);

    // API Gateway
    const api = new apigateway.RestApi(this, 'ProductApi');
    api.root.addResource('products').addMethod('GET', new apigateway.LambdaIntegration(productFn));

    // SES for emails
    new ses.EmailIdentity(this, 'EmailIdentity', {
      identity: ses.Identity.email('no-reply@yourdomain.com'),
    });

    // Outputs
    new cdk.CfnOutput(this, 'FrontendUrl', { value: `https://${distribution.distributionDomainName}` });
    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url });
  }
}
```

**Features**:
- Scalable frontend with S3 + CloudFront.
- Serverless backend with Lambda.
- Email notifications for orders.
- DynamoDB for fast product queries.

---

### 2. Subscription-Based Website
**Architecture**:
- **EC2**: Hosts a Node.js app for subscription management.
- **DynamoDB**: Stores user subscriptions.
- **SNS**: Notifies users of subscription changes.
- **EventBridge**: Schedules billing reminders.

**Code** (`lib/subscription-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as eventbridge from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class SubscriptionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC for EC2
    const vpc = new ec2.Vpc(this, 'SubscriptionVPC', { maxAzs: 2 });

    // EC2 instance for Node.js app
    const instance = new ec2.Instance(this, 'AppInstance', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: new ec2.SecurityGroup(this, 'AppSG', {
        vpc,
        allowAllOutbound: true,
      }),
    });
    instance.connections.allowFromAnyIpv4(ec2.Port.tcp(80), 'Allow HTTP');

    // DynamoDB for subscriptions
    const subscriptionTable = new dynamodb.Table(this, 'SubscriptionsTable', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // SNS topic for notifications
    const topic = new sns.Topic(this, 'SubscriptionTopic');

    // Lambda for billing reminders
    const reminderFn = new lambda.Function(this, 'ReminderFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const AWS = require('aws-sdk');
        const sns = new AWS.SNS();
        exports.handler = async () => {
          await sns.publish({
            TopicArn: '${topic.topicArn}',
            Message: 'Your subscription is due soon!',
          }).promise();
          return { statusCode: 200 };
        };
      `),
    });
    topic.grantPublish(reminderFn);

    // EventBridge rule for weekly reminders
    new eventbridge.Rule(this, 'BillingRule', {
      schedule: eventbridge.Schedule.rate(cdk.Duration.days(7)),
      targets: [new targets.LambdaFunction(reminderFn)],
    });

    // Outputs
    new cdk.CfnOutput(this, 'InstanceIP', { value: instance.instancePublicIp });
  }
}
```

**Features**:
- Node.js app for subscription management.
- Automated billing reminders via EventBridge + Lambda.
- SNS for user notifications.
- DynamoDB for persistent storage.

---

### 3. Membership-Based Website
**Architecture**:
- **AppSync**: GraphQL API for membership data.
- **DynamoDB**: Stores member profiles.
- **Cognito**: User authentication.
- **S3**: Stores member-uploaded files.

**Code** (`lib/membership-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MembershipStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cognito user pool
    const userPool = new cognito.UserPool(this, 'MemberPool', {
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { email: true },
    });

    // DynamoDB for member data
    const memberTable = new dynamodb.Table(this, 'MembersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // AppSync API
    const api = new appsync.GraphqlApi(this, 'MemberApi', {
      name: 'member-api',
      schema: appsync.Schema.fromAsset('graphql/membership.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: { userPool },
        },
      },
    });

    // Data source
    const dataSource = api.addDynamoDbDataSource('MemberDataSource', memberTable);
    dataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getMember',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    // S3 bucket for uploads
    const uploadBucket = new s3.Bucket(this, 'UploadBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Outputs
    new cdk.CfnOutput(this, 'GraphqlUrl', { value: api.graphqlUrl });
    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId });
  }
}
```

**GraphQL Schema** (`graphql/membership.graphql`):
```graphql
type Member {
  id: ID!
  name: String!
}
type Query {
  getMember(id: ID!): Member
}
```

**Features**:
- Secure user authentication with Cognito.
- GraphQL API for member data.
- S3 for file uploads (e.g., profile pictures).
- Scalable and serverless.

---

### 4. Multiple News Websites
**Architecture**:
- **S3 + CloudFront**: Hosts multiple static news sites.
- **Lambda@Edge**: Customizes content based on domain.
- **DynamoDB**: Stores articles.
- **EventBridge**: Schedules content updates.

**Code** (`lib/news-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as eventbridge from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

export class NewsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 bucket for news sites
    const bucket = new s3.Bucket(this, 'NewsBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda@Edge for domain-based routing
    const edgeFn = new lambda.Function(this, 'EdgeFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          const request = event.Records[0].cf.request;
          request.uri = request.headers.host[0].value.includes('site1') ? '/site1/index.html' : '/site2/index.html';
          return request;
        };
      `),
    });

    // CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'NewsDistribution', {
      originConfigs: [
        {
          s3OriginSource: { s3BucketSource: bucket },
          behaviors: [
            {
              isDefaultBehavior: true,
              lambdaFunctionAssociations: [
                {
                  eventType: cloudfront.LambdaFunctionAssociationEventType.VIEWER_REQUEST,
                  lambdaFunction: edgeFn,
                },
              ],
            },
          ],
        },
      ],
    });

    // DynamoDB for articles
    const articleTable = new dynamodb.Table(this, 'ArticlesTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda for content updates
    const updateFn = new lambda.Function(this, 'UpdateFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async () => {
          console.log('Updating articles...');
          return { statusCode: 200 };
        };
      `),
    });

    // EventBridge for daily updates
    new eventbridge.Rule(this, 'UpdateRule', {
      schedule: eventbridge.Schedule.rate(cdk.Duration.days(1)),
      targets: [new targets.LambdaFunction(updateFn)],
    });

    // Outputs
    new cdk.CfnOutput(this, 'DistributionUrl', { value: `https://${distribution.distributionDomainName}` });
  }
}
```

**Features**:
- Multiple news sites from one S3 bucket.
- Dynamic routing with Lambda@Edge.
- Scheduled content updates.
- Fast delivery with CloudFront.

---

### 5. CRM System
**Architecture**:
- **AppSync**: GraphQL API for customer data.
- **DynamoDB**: Stores customer records.
- **Lambda**: Processes customer interactions.
- **SNS**: Sends notifications to sales reps.

**Code** (`lib/crm-stack.ts`):
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';

export class CrmStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB for customers
    const customerTable = new dynamodb.Table(this, 'CustomersTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // AppSync API
    const api = new appsync.GraphqlApi(this, 'CrmApi', {
      name: 'crm-api',
      schema: appsync.Schema.fromAsset('graphql/crm.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
      },
    });

    // Data source
    const dataSource = api.addDynamoDbDataSource('CustomerDataSource', customerTable);
    dataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getCustomer',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem('id', 'id'),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });

    // SNS topic for notifications
    const topic = new sns.Topic(this, 'CustomerTopic');

    // Lambda for processing interactions
    const interactionFn = new lambda.Function(this, 'InteractionFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        const AWS = require('aws-sdk');
        const sns = new AWS.SNS();
        exports.handler = async (event) => {
          await sns.publish({
            TopicArn: '${topic.topicArn}',
            Message: 'New customer interaction: ' + JSON.stringify(event),
          }).promise();
          return { statusCode: 200 };
        };
      `),
    });
    topic.grantPublish(interactionFn);

    // Outputs
    new cdk.CfnOutput(this, 'GraphqlUrl', { value: api.graphqlUrl });
  }
}
```

**GraphQL Schema** (`graphql/crm.graphql`):
```graphql
type Customer {
  id: ID!
  name: String!
}
type Query {
  getCustomer(id: ID!): Customer
}
```

**Features**:
- GraphQL API for customer management.
- Real-time notifications via SNS.
- Scalable data storage with DynamoDB.
- Extensible with Lambda for automation.

---

## Best Practices
1. **Modularize Constructs**: Create reusable constructs for common patterns (e.g., Lambda + API Gateway).
2. **Use Removal Policies**: Set `removalPolicy: cdk.RemovalPolicy.DESTROY` for non-production stacks to avoid orphaned resources.
3. **Secure Resources**: Use least-privilege IAM roles and security groups.
4. **Version Control**: Store CDK code in Git for collaboration and history.
5. **Test Locally**: Use `cdk synth` to validate templates before deployment.
6. **Monitor and Log**: Integrate CloudWatch for Lambda and API Gateway.

---

## Additional Resources
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
- [CDK Examples](https://github.com/aws-samples/aws-cdk-examples)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

