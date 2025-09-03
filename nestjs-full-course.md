# NestJS Full Course: Key Concepts and Practical Steps

This video introduces NestJS, a powerful framework for building Node.js backend applications, and guides you through setting up your first project and understanding its core components and routing mechanisms.

## 1. Introduction to NestJS

NestJS is a **powerful framework for building Node.js backend applications**.

*   It is **based on TypeScript**, offering a clean and structured way to organise your code.
*   **Why choose NestJS?** It provides more structure and scalability compared to Express.js, helping you write clean and maintainable code.
*   Key features include **dependency injection** and **clear separation of concerns**, which simplifies the development of complex APIs.
*   The course covers core concepts such as **modules, controllers, services, dependency injection, and inversion of control**.
*   It will also delve into **CRUD operations, database integration** (using TypeORM, Prisma, Drizzle ORM, MongoDB, and Mongoose), **user authentication and authorisation, data serialisation, GraphQL setup, testing strategies, and deployment**.

## 2. Prerequisites and NestJS CLI Installation

Before starting, ensure you have the **latest version of Node.js installed** on your machine.

### Step-by-step: Installing NestJS CLI

1.  Open your terminal.
2.  Execute the following command to **install the NestJS Command Line Interface (CLI) globally**:

    ```typescript
    npm i -g @nestjs/cli
    ```
    *   **Explanation**:
        *   `npm i` is shorthand for `npm install`.
        *   `-g` flag means the package will be installed **globally** on your machine, making the `nest` command available from any directory.
        *   `@nestjs/cli` is the name of the package containing the NestJS CLI.

## 3. Creating Your First NestJS Project

Once the CLI is installed, you can generate a new NestJS project.

### Step-by-step: Creating a new project

1.  Navigate to the directory where you want to create your project in the terminal.
2.  Use the `nest new` command:

    ```bash
    nest new .
    ```
    *   **Explanation**:
        *   `nest new` is the command to create a new NestJS project.
        *   `.` (a dot) indicates that the project should be created in the **current directory**. Alternatively, you could provide a project name (e.g., `nest new my-app`) to create it in a new sub-directory.
3.  When prompted, **choose your preferred package manager** (e.g., npm).
4.  The CLI will then **create the project structure and necessary files** in your chosen location.

## 4. Running the NestJS Project

After creating the project, you can start the development server.

### Step-by-step: Running the application

1.  Open your terminal in the project's root directory.
2.  Execute the following command:

    ```bash
    npm run start:dev
    ```
    *   **Explanation**:
        *   `npm run start:dev` starts the application in **watch mode**.
        *   In watch mode, the application automatically **recompiles every time you make changes** to your project files, providing a seamless development experience.
3.  Once the application starts, you should see a message indicating it's successfully running.
4.  Open your web browser and navigate to `http://localhost:3000`. You should see "Hello World!", confirming your NestJS project is up and running.

## 5. NestJS Application Structure

Understanding the project's directory structure is crucial for navigating and developing with NestJS.

*   **`src` directory**: This is the **most important directory** and serves as the **root location for your application's source code**. It houses all the code that defines the functionalities and behaviour of your NestJS application.
*   **`main.ts` file**: This is the **entry point of your application**.
    *   It contains a `bootstrap` function responsible for **creating a NestJS application object and starting the application**.
    *   By default, it starts on **port 3000**, but this can be easily changed within this file.

    ```typescript
    // src/main.ts
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';

    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      await app.listen(3000); // Application starts on port 3000. Change to 4000 for port 4000.
    }
    bootstrap();
    ```
*   **`app.module.ts` file**: This is the **root module of your application**.
    *   NestJS applications are built around **modules**, which are conceptual "Lego bricks" that encapsulate specific functionalities.
    *   Modules are classes decorated with the **`@Module` decorator**.
    *   They can contain **controllers, services, and test files**, helping to group functionalities as your application grows.

    ```typescript
    // src/app.module.ts
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { PropertyModule } from './property/property.module'; // Example of importing another module

    @Module({
      imports: [PropertyModule], // List of other modules imported into this module
      controllers: [AppController], // List of controllers defined in this module
      providers: [AppService], // List of services (providers) defined in this module
    })
    export class AppModule {}
    ```
*   **Controllers**: These files are where you **define your HTTP endpoints** (e.g., GET, POST, PATCH, PUT, DELETE).
*   **Services**: These files contain the **business logic** of your application.
*   **Test files**: These files (suffixed with `.spec.ts`) are used for **unit tests** of their associated controllers.

## 6. Controllers in Detail: Defining HTTP Endpoints and Routing

Controllers are containers where you define how your application handles incoming HTTP requests and returns responses.

### Decorators for Controllers and Endpoints

NestJS heavily uses **decorators** for defining controllers and their methods.

*   **`@Controller()`**: Decorator applied to a class to mark it as a controller.
*   **`@Get()`, `@Post()`, `@Patch()`, `@Put()`, `@Delete()`**: Decorators applied to methods within a controller to map them to specific HTTP request types.

### Step-by-step: Defining Routes

1.  **Controller-level prefixes**: You can define a base route (prefix) for all HTTP endpoints within a controller.

    ```typescript
    // app.controller.ts
    import { Controller, Get } from '@nestjs/common';
    import { AppService } from './app.service';

    @Controller('user') // All endpoints in this controller will start with '/user'
    export class AppController {
      constructor(private readonly appService: AppService) {}

      @Get('profile') // This endpoint maps to GET /user/profile
      getUserProfile(): string {
        return 'User Profile';
      }

      @Get() // This endpoint maps to GET /user
      getAllUsers(): string {
        return this.appService.getHello(); // For illustration, imagine it returns all users
      }
    }
    ```
    *   **Explanation**:
        *   `@Controller('user')` prefixes all routes defined in `AppController` with `/user`.
        *   `@Get('profile')` then adds `/profile` to the prefix, resulting in `GET /user/profile`.
        *   `@Get()` without any path specified maps to the controller's root path, which is `GET /user` in this case.

2.  **Alternative path definition in `@Controller`**: You can also pass an object to the `@Controller` decorator to set the path.

    ```typescript
    // app.controller.ts
    import { Controller, Get } from '@nestjs/common';

    @Controller({ path: 'user' }) // Same as @Controller('user')
    export class AppController {
      // ... methods
    }
    ```

## 7. Creating a New Module and Controller (Real-world Example: Property Module)

For better organisation and separation of concerns, it's recommended to create new modules and controllers for different functionalities.

### Step-by-step: Generating a Property Module

1.  Open a new terminal window in your project's root directory.
2.  Use the Nest CLI to generate a new module:

    ```bash
    nest g module property
    ```
    *   **Explanation**:
        *   `nest g` is shorthand for `nest generate`.
        *   `module` specifies that you're generating a module.
        *   `property` is the name of the module.
    *   This command will:
        *   Create a `property` directory.
        *   Inside it, create `property.module.ts`.
        *   **Update `app.module.ts`** to automatically import and register `PropertyModule`.

### Step-by-step: Generating a Property Controller

1.  In the same terminal, generate a controller for the `PropertyModule`:

    ```bash
    nest g controller property
    ```
    *   **Explanation**:
        *   `nest g controller` is the command to generate a controller. You can also use `nest g co` as a shorthand.
        *   `property` is the name of the controller.
    *   This command will:
        *   Create `property/property.controller.ts`.
        *   Create `property/property.controller.spec.ts` (a unit test file, which can be deleted for now as testing is covered later).
        *   **Update `property.module.ts`** to automatically add `PropertyController` to its `controllers` array.

### `property.controller.ts` initial structure

```typescript
// src/property/property.controller.ts
import { Controller } from '@nestjs/common';

@Controller('property') // All endpoints in this controller will be prefixed with '/property'
export class PropertyController {
  // Methods to handle property-related requests will go here
}
```
*   **Explanation**: The `@Controller('property')` decorator sets the base route for all endpoints within this controller to `/property`.

## 8. Defining GET and POST Endpoints in the Property Controller

Now, let's create the first few endpoints for our property functionality.

### Step-by-step: Creating `GET /property` and `POST /property`

1.  Open `src/property/property.controller.ts`.
2.  Add methods for a GET request to retrieve all properties and a POST request to create a new property:

    ```typescript
    // src/property/property.controller.ts
    import { Controller, Get, Post } from '@nestjs/common'; // Import Get and Post decorators

    @Controller('property')
    export class PropertyController {
      @Get() // Maps to GET /property
      findAll(): string {
        return 'All properties'; // Placeholder message
      }

      @Post() // Maps to POST /property
      create(): string {
        return 'This will create a property'; // Placeholder message
      }
    }
    ```
    *   **Explanation**:
        *   `@Get()` without a specific path means this method will handle GET requests to the controller's root path, which is `/property`.
        *   `@Post()` without a specific path means this method will handle POST requests to `/property`.
        *   Even though both have the same path segment (empty string), they are **distinguished by their HTTP method type** (GET vs. POST).

## 9. Defining Route Parameters

You can define dynamic segments in your routes to capture variable data, such as an item's ID.

### Step-by-step: Creating `GET /property/:id`

1.  Open `src/property/property.controller.ts`.
2.  Add a GET method that expects an `id` parameter:

    ```typescript
    // src/property/property.controller.ts
    import { Controller, Get, Param } from '@nestjs/common'; // Import Param decorator

    @Controller('property')
    export class PropertyController {
      // ... findAll() and create() methods

      @Get(':id') // Maps to GET /property/:id (e.g., /property/123)
      findOne(@Param('id') id: string): string {
        return `ID: ${id}`; // Returns the extracted ID
      }
    }
    ```
    *   **Explanation**:
        *   `@Get(':id')`: The colon (`:`) before `id` signifies that `id` is a **dynamic parameter**.
        *   **`@Param('id') id: string`**:
            *   `@Param()` is a decorator used to extract route parameters.
            *   `'id'` specifies the name of the parameter to extract (matching the `:id` in the route definition).
            *   `id: string` declares a function parameter `id` of type string, which will receive the extracted value.

### Step-by-step: Handling Multiple Route Parameters

1.  You can define multiple dynamic parameters in a single route:

    ```typescript
    // src/property/property.controller.ts
    import { Controller, Get, Param } from '@nestjs/common';

    @Controller('property')
    export class PropertyController {
      // ... other methods

      @Get(':id/:slug') // Maps to GET /property/:id/:slug (e.g., /property/12/my-house)
      findOneBySlug(
        @Param('id') id: string,
        @Param('slug') slug: string,
      ): string {
        return `ID equals to ${id} and slug equals to ${slug}`;
      }
    }
    ```
    *   **Explanation**: Similar to a single parameter, you use multiple `@Param()` decorators, each specifying the name of a distinct route parameter.

### Step-by-step: Accessing All Route Parameters as an Object

1.  If you don't specify a parameter name in `@Param()`, it will inject an **object containing all route parameters**:

    ```typescript
    // src/property/property.controller.ts
    import { Controller, Get, Param } from '@nestjs/common';

    @Controller('property')
    export class PropertyController {
      // ... other methods

      @Get(':id/:slug')
      findAllParams(@Param() params: any): any {
        // For /property/12/my-property, params will be { id: '12', slug: 'my-property' }
        return params;
      }
    }
    ```
    *   **Explanation**: `@Param()` without any argument will collect all dynamic route parameters into a single object, which is then passed to the `params` function parameter.

## 10. Accessing the Request Body

For requests like POST or PUT, you often send data in the request body. NestJS provides a decorator to easily access this data.

### Step-by-step: Accessing the Entire Request Body

1.  Open `src/property/property.controller.ts`.
2.  Modify the `create` method to accept and return the request body:

    ```typescript
    // src/property/property.controller.ts
    import { Controller, Post, Body } from '@nestjs/common'; // Import Body decorator

    @Controller('property')
    export class PropertyController {
      // ... other methods

      @Post() // Maps to POST /property
      createProperty(@Body() body: any): any {
        return body; // Returns the entire JSON body sent with the request
      }
    }
    ```
    *   **Explanation**:
        *   `@Body()` is a decorator that extracts the **entire request body**.
        *   `body: any` declares a function parameter `body` that will receive the parsed request body (typically a JSON object for POST requests).
    *   **Example request (using Insomnia/Postman)**:
        *   Method: `POST`
        *   URL: `http://localhost:3000/property`
        *   Body (JSON):
            ```json
            {
              "name": "Property One",
              "type": "Condo"
            }
            ```
        *   **Response**: The method will return the same JSON object: `{"name": "Property One", "type": "Condo"}`.

### Step-by-step: Accessing Specific Members from the Request Body

1.  You can also extract specific properties directly from the request body:

    ```typescript
    // src/property/property.controller.ts
    import { Controller, Post, Body } from '@nestjs/common';

    @Controller('property')
    export class PropertyController {
      // ... other methods

      @Post()
      createPropertyWithName(@Body('name') name: string): string {
        return name; // Returns only the value of the 'name' property
      }
    }
    ```
    *   **Explanation**: `@Body('name')` extracts only the value associated with the `name` key from the request body.

## 11. Customizing HTTP Status Codes

NestJS automatically assigns default HTTP status codes (e.g., `200 OK` for GET, `201 Created` for POST). You can override these defaults using the `@HttpCode()` decorator.

### Step-by-step: Setting a Custom Status Code for a POST Request

1.  Open `src/property/property.controller.ts`.
2.  Add the `@HttpCode()` decorator to the `create` method:

    ```typescript
    // src/property/property.controller.ts
    import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'; // Import HttpCode and HttpStatus

    @Controller('property')
    export class PropertyController {
      // ... other methods

      @Post()
      @HttpCode(HttpStatus.ACCEPTED) // Sets the HTTP status code to 202 (Accepted)
      // Alternatively, you can use a direct number: @HttpCode(202)
      create(): string {
        return 'This property create request was accepted.';
      }
    }
    ```
    *   **Explanation**:
        *   `@HttpCode(HttpStatus.ACCEPTED)`: This decorator sets the HTTP status code for this specific endpoint.
        *   `HttpStatus.ACCEPTED` is an enum value representing `202 Accepted`. You could also directly use `@HttpCode(202)`.
    *   Now, when you send a POST request to `/property`, the response will have a `202 Accepted` status code instead of the default `201 Created`.

---

## Overview of the validation techniques discussed in the video, complete with step-by-step explanations and example code in TypeScript, formatted for your notes:

***

## NestJS Validation: A Comprehensive Guide (ZOD Included)

This guide covers various aspects of validation in NestJS, from transforming request data to enforcing complex validation rules using both traditional methods (`class-validator` / `class-transformer`) and the newer Zod library. We'll explore how to apply validation at different levels: API endpoint, module, and globally.

### 1. **Transform Pipes**

Transform pipes automatically convert the type of incoming data (route parameters or query parameters) into the desired type.

#### **1.1. Transforming Route Parameters (e.g., ID to Number)**

By default, route parameters are strings. You can automatically transform them to a number using `ParseIntPipe`.

**Step 1: Apply `ParseIntPipe` to the Route Parameter**

In your controller, use `@Param()` decorator with `ParseIntPipe`.

```ts
// src/property/property.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): number {
    // The 'id' will automatically be a number here.
    console.log('Type of ID:', typeof id); // Output: Type of ID: number
    return id;
  }
}
```

**Explanation**:
*   The `@Param('id', ParseIntPipe)` decorator instructs NestJS to take the `id` from the URL, process it through `ParseIntPipe`, and then inject it into the `id` parameter as a `number`.
*   If you send a request to `/property/24`, the `id` will be `24` (number).

#### **1.2. Transforming Query Parameters (e.g., `sort` to Boolean)**

Similarly, query parameters are also strings by default. You can transform them to a boolean using `ParseBoolPipe`.

**Step 1: Apply `ParseBoolPipe` to the Query Parameter**

Use the `@Query()` decorator with `ParseBoolPipe`.

```ts
// src/property/property.controller.ts
import { Controller, Get, Param, ParseIntPipe, Query, ParseBoolPipe } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean, // 'sort' will be a boolean
  ): { id: number; sort: boolean } {
    console.log('Type of ID:', typeof id); // Output: Type of ID: number
    console.log('Type of Sort:', typeof sort); // Output: Type of Sort: boolean
    return { id, sort };
  }
}
```

**Explanation**:
*   `@Query('sort', ParseBoolPipe)` extracts the `sort` query parameter (e.g., `?sort=true`) and transforms its string value into a boolean.
*   Other built-in pipes available for transformation include `ParseArrayPipe`, `ParseFilePipe`, and `ParseFloatPipe`.

### 2. **Validation with Class Validator and Class Transformer (Traditional Method)**

This is the standard approach for validating request bodies in NestJS using decorators.

#### **2.1. Step 1: Create a Data Transfer Object (DTO)**

DTOs define the shape and expected types of your incoming request body.

**Step 1.1: Create `create-property.dto.ts`**

```ts
// src/property/dto/create-property.dto.ts
export class CreatePropertyDto {
  name: string;
  description: string;
  area: number;
}
```

**Explanation**:
*   This DTO specifies that the request body for creating a property should have a `name` (string), `description` (string), and `area` (number).

#### **2.2. Step 2: Install Validation Libraries**

NestJS relies on `class-validator` and `class-transformer` for this method.

**Step 2.1: Install the Packages**

```bash
npm install class-validator class-transformer
```

**Explanation**:
*   These libraries provide the decorators and underlying logic for validation and transformation.

#### **2.3. Step 3: Apply Decorators in DTO**

Use validation decorators from `class-validator` to define rules for each field in your DTO.

**Step 3.1: Update `create-property.dto.ts` with Decorators**

```ts
// src/property/dto/create-property.dto.ts
import { IsString, IsInt, Length, IsPositive, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(2, 10, { message: 'Name must be between 2 and 10 characters long' }) // Custom message example
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive({ message: 'Area must be a positive number' }) // Custom message example
  area: number;
}
```

**Explanation**:
*   `@IsString()`: Ensures the field is a string.
*   `@IsInt()`: Ensures the field is an integer.
*   `@IsPositive()`: Ensures the number is greater than zero.
*   `@Length(min, max)`: Specifies the minimum and maximum length for a string.
*   You can provide **custom error messages** using the `{ message: '...' }` option in the decorator.

#### **2.4. Step 4: Use `ValidationPipe`**

The `ValidationPipe` processes the incoming request body against your DTO's validation rules.

**Step 4.1: Apply `ValidationPipe` to an Endpoint**

You can apply `ValidationPipe` using `@UsePipes()` at the method level or directly within the `@Body()` decorator.

*   **Using `@UsePipes()` (Method Level)**:

    ```ts
    // src/property/property.controller.ts
    import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
    import { CreatePropertyDto } from './dto/create-property.dto';

    @Controller('property')
    export class PropertyController {
      @Post()
      @UsePipes(new ValidationPipe()) // Applies ValidationPipe to this endpoint
      create(@Body() createPropertyDto: CreatePropertyDto) {
        return createPropertyDto;
      }
    }
    ```

*   **Using `ValidationPipe` in `@Body()` (Parameter Level)**:

    ```ts
    // src/property/property.controller.ts
    import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
    import { CreatePropertyDto } from './dto/create-property.dto';

    @Controller('property')
    export class PropertyController {
      @Post()
      create(
        @Body(
          new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
          }),
        )
        createPropertyDto: CreatePropertyDto,
      ) {
        return createPropertyDto;
      }
    }
    ```

**Explanation**:
*   Once `ValidationPipe` is applied, NestJS will automatically validate the incoming `createPropertyDto` against the rules defined in `CreatePropertyDto`. If validation fails, it throws a `BadRequestException`.

#### **2.5. `ValidationPipe` Options**

The `ValidationPipe` can be configured with options for stricter validation.

*   **`whitelist: true`**: **Removes any extra fields** from the request body that are not defined in the DTO.

    ```ts
    // Example usage
    new ValidationPipe({ whitelist: true })
    ```

    *If request body has `{ name: "Villa", description: "Nice", area: 100, type: "residential" }` and `type` is not in `CreatePropertyDto`, `type` will be removed.*

*   **`forbidNonWhitelisted: true`**: **Throws an error** if the request body contains fields not defined in the DTO. This is stricter than `whitelist`.

    ```ts
    // Example usage
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    ```

    *If request body has an undeclared `type` field, it will throw an error like "property type should not exist".*

#### **2.6. Group Validation for Different Scenarios (e.g., Create vs. Update)**

You might need different validation rules for creating an entity versus updating it, using the same DTO.

**Step 2.6.1: Define Groups in DTO Decorators**

Use the `groups` option in validation decorators to specify when a rule should apply.

```ts
// src/property/dto/create-property.dto.ts
import { IsString, IsInt, Length, IsPositive, IsNotEmpty } from 'class-validator';

export class CreatePropertyDto {
  @IsString({ always: true }) // Always validate 'name'
  @Length(2, 10, { message: 'Name must be between 2 and 10 characters long', always: true })
  name: string;

  @IsString({ groups: ['create'] }) // Only validate description on create
  @Length(2, 10, { groups: ['create'] })
  @Length(1, 15, { groups: ['update'] }) // Different length for update
  description: string;

  @IsInt({ always: true }) // Always validate 'area'
  @IsPositive({ message: 'Area must be a positive number', always: true })
  area: number;
}
```

**Explanation**:
*   `groups: ['create']` or `groups: ['update']` applies the validation rule only when that group is active.
*   `always: true` ensures a rule is **always applied**, regardless of the active group. This is crucial for common fields that need validation in all scenarios.

**Step 2.6.2: Specify Active Group in `ValidationPipe`**

In your controller, pass the desired group to the `ValidationPipe` options.

```ts
// src/property/property.controller.ts
import { Controller, Post, Patch, Body, Param, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('property')
export class PropertyController {
  @Post()
  create(
    @Body(
      new ValidationPipe({
        groups: ['create'], // Activate 'create' group
        whitelist: true,
        forbidNonWhitelisted: true,
        // For fields without groups, 'always: true' is needed in the DTO
        // Alternatively, set 'always: true' here for global effect on ungrouped fields (See Section 2.6.3)
      }),
    )
    createPropertyDto: CreatePropertyDto,
  ) {
    return createPropertyDto;
  }

  @Patch(':id')
  update(
    @Param('id') id: string, // ID validation will be covered later
    @Body(
      new ValidationPipe({
        groups: ['update'], // Activate 'update' group
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updatePropertyDto: CreatePropertyDto,
  ) {
    return updatePropertyDto;
  }
}
```

**Step 2.6.3: Simplify `always: true` for Common Fields**

Instead of adding `always: true` to every common field in the DTO, you can set it once in the `ValidationPipe` options.

```ts
// src/property/property.controller.ts
// ... (imports)

@Controller('property')
export class PropertyController {
  @Post()
  create(
    @Body(
      new ValidationPipe({
        groups: ['create'],
        whitelist: true,
        forbidNonWhitelisted: true,
        always: true, // This will apply all decorators without a specific group
      }),
    )
    createPropertyDto: CreatePropertyDto,
  ) {
    return createPropertyDto;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        groups: ['update'],
        whitelist: true,
        forbidNonWhitelisted: true,
        always: true, // Applies all decorators without a specific group
      }),
    )
    updatePropertyDto: CreatePropertyDto,
  ) {
    return updatePropertyDto;
  }
}
```

**Explanation**:
*   The `always: true` option in `ValidationPipe` means that any validation decorators in your DTO that **do not specify a `groups` option** will be applied regardless of the active group. This avoids repetition in your DTO.

### 3. **Global and Module-Level Validation**

Instead of applying `ValidationPipe` to each endpoint, you can apply it globally or to a specific module.

#### **3.1. Global Validation (Application-Wide)**

**Step 3.1.1: Configure in `main.ts`**

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // Note: Group validation does not work with global pipes by default.
      // Only the first validation decorator on a field will be applied if groups are used.
    }),
  );
  await app.listen(3000);
}
bootstrap();
```

**Explanation**:
*   `app.useGlobalPipes()` registers the `ValidationPipe` to be applied to all incoming requests across the entire application.
*   **Important Note**: When using global pipes, group validation as defined with `groups` options in DTO decorators might not work as expected. Typically, only the first validation decorator for a field is applied, regardless of the specified group.

#### **3.2. Module-Level Validation (Specific Module)**

You can apply global validation specifically to a module by registering the `ValidationPipe` as a provider within that module.

**Step 3.2.1: Configure in `property.module.ts`**

```ts
// src/property/property.module.ts
import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core'; // Import APP_PIPE
import { ValidationPipe } from '@nestjs/common';

@Module({
  controllers: [PropertyController],
  providers: [
    {
      provide: APP_PIPE, // This token makes the pipe module-scoped
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        // Configuration for ValidationPipe
      }),
    },
    // ... other providers for this module
  ],
})
export class PropertyModule {}
```

**Explanation**:
*   By providing `APP_PIPE` within a module's `providers` array, the `ValidationPipe` becomes globally effective **only within that specific module**.
*   `useValue` is used to pass an instance of `ValidationPipe` with options. If no options are needed, `useClass: ValidationPipe` can be used.

### 4. **Validation on Route Parameters (ID)**

Route parameters (like `id`) can also be validated beyond just type transformation.

#### **4.1. Method 1: Using a DTO with `ValidationPipe`**

This method leverages `class-validator` decorators on a DTO for route parameters.

**Step 4.1.1: Create a DTO for Route Parameters**

```ts
// src/property/dto/id-param.dto.ts
import { IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer'; // Needed for implicit conversion

export class IdParamDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number) // Explicitly specify type for transformation
  id: number;
}
```

**Explanation**:
*   `@IsInt()` and `@IsPositive()` add validation rules for the ID.
*   `@Type(() => Number)` from `class-transformer` is important when `enableImplicitConversion` is true, as it guides the transformation of the string ID from the URL to a number before validation.

**Step 4.1.2: Apply DTO to `@Param()` and Enable Implicit Conversion**

In your controller, use the DTO with `@Param()` and ensure `ValidationPipe` has `transform: true` and `transformOptions: { enableImplicitConversion: true }` enabled (either globally or at endpoint level).

```ts
// src/main.ts (for global pipe)
// ...
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // Enables transformation of primitive types
    transformOptions: { enableImplicitConversion: true }, // Crucial for @Param DTOs
  }),
);
// ...

// src/property/property.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { IdParamDto } from './dto/id-param.dto';

@Controller('property')
export class PropertyController {
  @Get(':id')
  findPropertyById(@Param() params: IdParamDto) {
    // 'params.id' will be a validated number
    console.log('Validated ID:', params.id, typeof params.id);
    return params.id;
  }
}
```

**Explanation**:
*   When `transform: true` and `enableImplicitConversion: true` are active, the `ValidationPipe` will first attempt to convert the string `id` from the URL into a `number` based on the DTO's type (`id: number`) and then apply the `IsInt` and `IsPositive` decorators.
*   If `transformOptions: { enableImplicitConversion: true }` is not set, the `id` will remain a string, and `IsInt` will likely fail.
*   By simply using `@Param()`, you get the entire `params` object which will be an instance of `IdParamDto` after validation. You can also extract `id` directly: `@Param('id') id: number` but the DTO ensures validation.

#### **4.2. Method 2: Creating a Custom Transform Pipe**

For more control or specific logic, you can write a custom pipe.

**Step 4.2.1: Create a Custom Pipe**

```ts
// src/property/pipes/parse-id.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable() // Mark as injectable if used outside its defining module
export class ParseIdPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10); // Transform string to integer

    // Validation rules
    if (isNaN(val)) {
      throw new BadRequestException('ID must be a number');
    }
    if (val <= 0) {
      throw new BadRequestException('ID must be positive');
    }

    return val; // Return the transformed and validated value
  }
}
```

**Explanation**:
*   The pipe implements `PipeTransform<string, number>`, meaning it takes a `string` (`value`) and returns a `number`.
*   Inside `transform`, `parseInt()` converts the string ID.
*   `isNaN()` checks if the conversion resulted in "Not a Number".
*   It then checks if the number is positive.
*   If any validation fails, a `BadRequestException` is thrown with a custom message.
*   The `@Injectable()` decorator is crucial if this pipe needs to be used in other modules due to NestJS's dependency injection system.

**Step 4.2.2: Apply Custom Pipe to `@Param()`**

```ts
// src/property/property.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ParseIdPipe } from './pipes/parse-id.pipe';

@Controller('property')
export class PropertyController {
  @Get(':id')
  findPropertyById(@Param('id', ParseIdPipe) id: number) {
    // 'id' will be a validated number from the custom pipe
    console.log('Custom Validated ID:', id, typeof id);
    return id;
  }
}
```

**Explanation**:
*   By passing `ParseIdPipe` directly to `@Param('id', ParseIdPipe)`, NestJS uses your custom pipe to transform and validate the ID.

### 5. **Validation with Zod (New Option)**

Zod is a TypeScript-first schema declaration and validation library that provides an alternative to `class-validator`.

#### **5.1. Step 1: Install Zod**

```bash
npm install zod
```

#### **5.2. Step 2: Create Zod Schema and Infer DTO Type**

Instead of a class with decorators, you define a Zod schema for your DTO.

**Step 5.2.1: Create `create-property-zod.dto.ts`**

```ts
// src/property/dto/create-property-zod.dto.ts
import { z } from 'zod'; // Import Zod

// Define the Zod schema for validation
export const createPropertyZodSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(10, 'Name must be at most 10 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'), // Example: min length
  area: z.number().int().positive('Area must be a positive integer'), // Example: integer and positive
}).required(); // Mark all fields as required

// Infer the TypeScript type from the schema
export type CreatePropertyZodDto = z.infer<typeof createPropertyZodSchema>;
```

**Explanation**:
*   `z.object({...})` defines the structure.
*   `z.string()`, `z.number()` specify types.
*   Chaining methods like `.min()`, `.max()`, `.int()`, `.positive()` adds validation rules directly to the schema.
*   Custom error messages can be provided (e.g., `z.string().min(2, 'Custom error message')`).
*   `.required()` ensures all defined fields are present.
*   `z.infer<typeof createPropertyZodSchema>` automatically creates a TypeScript type from your Zod schema, allowing for strong typing.

#### **5.3. Step 3: Create Custom Zod Validation Pipe**

You need a custom NestJS pipe to integrate Zod schemas into the validation pipeline.

**Step 5.3.1: Create `zod-validation.pipe.ts`**

```ts
// src/property/pipes/zod-validation.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodObject, ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {} // Pipe takes a Zod schema in its constructor

  transform(value: any, metadata: ArgumentMetadata) {
    const parsedValue = this.schema.safeParse(value); // Use safeParse for detailed errors

    if (!parsedValue.success) {
      // Format Zod errors for a more readable BadRequestException
      throw new BadRequestException({
        message: 'Validation failed',
        errors: parsedValue.error.format(), // Provides specific field-level errors
      });
    }

    return parsedValue.data; // Return the validated data
  }
}
```

**Explanation**:
*   The `ZodValidationPipe`'s constructor takes a `ZodSchema` instance.
*   `this.schema.safeParse(value)` attempts to parse and validate the incoming `value`. `safeParse` returns an object indicating success or failure, along with data or errors.
*   If `parsedValue.success` is `false`, it throws a `BadRequestException` containing `parsedValue.error.format()`, which provides detailed, field-specific error messages from Zod.
*   If successful, `parsedValue.data` is returned.

#### **5.4. Step 4: Apply Zod Validation Pipe to an Endpoint**

Now, use your custom `ZodValidationPipe` in your controller.

```ts
// src/property/property.controller.ts
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreatePropertyZodDto, createPropertyZodSchema } from './dto/create-property-zod.dto';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';

@Controller('property')
export class PropertyController {
  @Post('/zod')
  @UsePipes(new ZodValidationPipe(createPropertyZodSchema)) // Pass the Zod schema instance
  createWithZod(@Body() createPropertyZodDto: CreatePropertyZodDto) {
    return createPropertyZodDto;
  }
}
```

**Explanation**:
*   `@UsePipes(new ZodValidationPipe(createPropertyZodSchema))` applies your custom Zod pipe to this endpoint, passing the `createPropertyZodSchema` to its constructor for validation.
*   The `@Body()` decorator is typed with `CreatePropertyZodDto` for type safety, which was inferred from the Zod schema.

***

This concludes a detailed breakdown of validation in NestJS, covering both traditional `class-validator` methods and the modern Zod approach, along with their application at various levels.


***

### 1. Introduction: Accessing and Validating Request Headers

This guide covers how to **access request headers** and, more importantly, how to **validate them** in a NestJS application. While accessing headers is straightforward, enforcing validation on them requires a custom approach.

### 2. Accessing Request Headers

You can easily access the request headers in a NestJS controller using the `@Headers` decorator.

#### Step-by-Step Explanation:

1.  **Import the decorator**: Ensure `@Headers` is imported from `@nestjs/common`.
2.  **Apply in controller method**: Use the `@Headers` decorator in the parameter list of your controller's function (e.g., a `PATCH` request mapped to an `update` function).

#### Example Code (TypeScript):

**`property.controller.ts`**

```typescript
import { Controller, Patch, Param, Headers } from '@nestjs/common';
import { Body } from '@nestjs/common'; // Assuming Body is also used

@Controller('property')
export class PropertyController {
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any, // Example: for request body
    @Headers() headers: any, // Access the entire headers object
  ) {
    console.log(headers);
    return { id, body, headers };
  }
}
```

*   **Accessing the entire object**: By default, `@Headers()` provides the **entire headers object** as an `any` type.
*   **Accessing a specific property**: You can also specify a particular header property you want to access, such as `'host'`.

**Example Code (Accessing a Specific Header):**

**`property.controller.ts`**

```typescript
import { Controller, Patch, Param, Headers } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Headers('host') host: string, // Access only the 'host' header
  ) {
    console.log(host);
    return { id, host };
  }
}
```

After running the project, if you send a request (e.g., via Insomnia), you can see the accessed headers (or specific properties) in the response.

### 3. The Challenge of Validating Request Headers

While NestJS provides global validation for request bodies (e.g., using `ValidationPipe` on a DTO), this **does not automatically apply to request headers**. Even if global validation is enabled at the module level, attempting to use a DTO directly with `@Headers()` will not trigger validation errors for missing or incorrect header values. This necessitates a custom solution.

### 4. Creating a DTO for Request Headers

The first step in validating headers is to define a Data Transfer Object (DTO) that describes the expected header structure and applies validation rules.

#### Step-by-Step Explanation:

1.  **Create a DTO file**: Inside your `dto` directory, create a new file, for example, `headers.dto.ts`.
2.  **Define the DTO class**: Export a class (e.g., `HeadersDto`).
3.  **Define header properties**: Add properties corresponding to the expected headers (e.g., `accessToken`).
4.  **Apply `class-validator` decorators**: Use decorators like `@IsString()` to enforce validation rules.
5.  **Use `@Expose` for case-insensitive mapping**: HTTP headers are case-insensitive, but DTO properties are case-sensitive. The `@Expose()` decorator from `class-transformer` allows you to **map a specific header key** (e.g., `'access-token'`) to your DTO property (e.g., `accessToken`).

#### Example Code (TypeScript):

**`dto/headers.dto.ts`**

```typescript
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer'; // Import Expose

export class HeadersDto {
  @IsString() // Ensures the access token is a string
  @Expose({ name: 'access-token' }) // Maps 'access-token' from headers to accessToken property
  accessToken: string;
}
```

*   **`@Expose({ name: 'access-token' })`**: This is crucial. If the incoming request header has a key like `Access-Token` or `access-token`, `class-transformer` will correctly map it to the `accessToken` property in your `HeadersDto` instance.

### 5. Creating a Custom Decorator for Request Headers

Since standard validation doesn't work, you need to create a **custom parameter decorator** that will handle fetching, transforming, and validating the request headers.

#### Step-by-Step Explanation:

1.  **Create a custom decorator file**: Inside your `pipes` or `decorators` directory, create a new file, for example, `request-header.ts`.
2.  **Use `createParamDecorator`**: Import `createParamDecorator` from `@nestjs/common`.
3.  **Define the callback function**: This function takes `value` (which will be your DTO type, set to `any` for flexibility) and `ctx` (an `ExecutionContext`).
    *   **`ExecutionContext`**: This class provides information about the current execution context within your application, allowing you to access the current request.
4.  **Access the HTTP request**: Use `ctx.switchToHttp().getRequest()` to get the current HTTP request object.
5.  **Extract headers**: The request object contains the `headers` property.
6.  **Transform headers to DTO instance**: Use `plainToInstance` from `class-transformer` to convert the raw headers object into an instance of your `HeadersDto`.
    *   **`excludeExtraneousValues: true`**: This configuration option ensures that only properties defined in your `targetDto` are included, effectively stripping out any other extraneous headers.
7.  **Validate the DTO**: Use `validateOrReject` from `class-validator` to perform the validation. This is an `async` function and will throw a `BadRequestException` if validation fails.
8.  **Return the validated DTO**: If validation passes, return the transformed DTO instance.

#### Example Code (TypeScript):

**`pipes/request-header.ts`**

```typescript
import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const RequestHeader = createParamDecorator(
  async (targetDto: any, ctx: ExecutionContext) => { // targetDto is your HeadersDto
    const request = ctx.switchToHttp().getRequest(); // Access the current HTTP request
    const headers = request.headers; // Extract the raw headers object

    // Convert raw headers to an instance of the target DTO
    const dto = plainToInstance(targetDto, headers, {
      excludeExtraneousValues: true, // Strips out headers not defined in the DTO
    });

    try {
      // Validate the DTO instance
      await validateOrReject(dto);
    } catch (errors) {
      // If validation fails, throw a BadRequestException
      throw new BadRequestException(errors);
    }

    return dto; // Return the validated DTO
  },
);
```

### 6. Using the Custom Decorator in the Controller

Now you can replace the standard `@Headers()` decorator with your custom `@RequestHeader` decorator in your controller. This also involves passing a `ValidationPipe` with a specific configuration.

#### Step-by-Step Explanation:

1.  **Import the custom decorator**: Import `RequestHeader` from your `request-header.ts` file.
2.  **Import `ValidationPipe`**: Import `ValidationPipe` from `@nestjs/common`.
3.  **Apply `RequestHeader`**: In your controller method, use `@RequestHeader` along with your `HeadersDto`.
4.  **Pass `ValidationPipe` instance**: Provide an instance of `ValidationPipe` as the second argument to your custom decorator.
5.  **Crucial `ValidationPipe` option**: Set **`validateCustomDecorators: true`** within the `ValidationPipe` configuration. This is essential for the `ValidationPipe` to process and validate parameters decorated with custom decorators.
    *   **`whitelist: true`**: (Optional but recommended) This option, when used in the `ValidationPipe`, will strip any properties from the incoming object that are not defined in the DTO. If `whitelist: false` or omitted, other headers not defined in the DTO will still be present.

#### Example Code (TypeScript):

**`property.controller.ts`**

```typescript
import { Controller, Patch, Param, ValidationPipe } from '@nestjs/common';
import { RequestHeader } from '../pipes/request-header.pipe'; // Adjust path as necessary
import { HeadersDto } from '../dto/headers.dto'; // Import your HeadersDto

@Controller('property')
export class PropertyController {
  @Patch(':id')
  update(
    @Param('id') id: string,
    // Use the custom RequestHeader decorator with HeadersDto and ValidationPipe
    @RequestHeader(
      HeadersDto, // The DTO class to validate against
      new ValidationPipe({
        whitelist: true, // Only allow properties defined in HeadersDto
        validateCustomDecorators: true, // CRITICAL: Enables validation for custom decorators
      }),
    )
    headers: HeadersDto, // The parameter will now be a validated HeadersDto instance
  ) {
    console.log(headers.accessToken); // Access specific validated header
    return { id, accessToken: headers.accessToken };
  }
}
```

Now, if you send a request without the `access-token` header, the validation will trigger, and you will receive an error message indicating that `access-token` must be a string. If you provide a valid `access-token`, the request will proceed, and you will receive the validated `HeadersDto` object.

### 7. Recap of Header Validation Process

To summarise the process of applying validation on request headers:

1.  **Create a DTO for your headers**:
    *   Define the expected header properties.
    *   Use `class-validator` decorators (e.g., `@IsString()`).
    *   **Crucially, use `@Expose({ name: 'your-header-key' })`** to map case-insensitive header keys from the request to your DTO properties.
2.  **Create a custom parameter decorator (e.g., `RequestHeader`)**:
    *   This decorator uses `createParamDecorator`.
    *   It accesses the `ExecutionContext` to get the raw request headers.
    *   It transforms the raw headers into an instance of your DTO using `plainToInstance` from `class-transformer`.
    *   It validates the DTO instance using `validateOrReject` from `class-validator`.
    *   If validation fails, it throws an error; otherwise, it returns the validated DTO.
3.  **Use the custom decorator in your controller**:
    *   Apply your custom decorator (e.g., `@RequestHeader`) to the parameter that will receive the headers.
    *   Pass an instance of `ValidationPipe` to the custom decorator.
    *   **The most important setting in `ValidationPipe` is `validateCustomDecorators: true`**; without it, the validation on your custom decorator will not be enforced.

By following these steps, you can effectively access and robustly validate request headers in your NestJS applications.

--- 

### Dependency Injection in NestJS: From Zero to Hero

This guide covers the crucial concept of **Dependency Injection (DI)** in NestJS, explaining why it's essential, how it works, and how to implement it correctly.

### 1. The Problem: Logic Directly in Controllers

Initially, it might seem straightforward to implement all request handling logic directly within your controller's methods.

#### Step-by-Step Explanation:

1.  A controller (e.g., `PropertyController`) has various HTTP endpoints (e.g., `findAll`, `findOne`, `create`, `update`).
2.  Without services, the entire logic for these operations would reside inside these controller methods.

#### Why This is Problematic:

*   **Separation of Concerns**: Controllers in NestJS are designed to **handle incoming requests** and **route them**. Business logic, validation, and data access should reside in separate services. Keeping controllers clean and focused improves readability and maintainability.
*   **Maintainability**: When business logic is spread across controllers, it becomes harder to find, reuse, and test. Centralising logic in services allows changes to be made in one place and applied throughout the application.

### 2. Introducing Services: Extracting Business Logic

To address the problems above, the business logic should be moved into a separate class, commonly known as a **Service**.

#### Step-by-Step Explanation:

1.  **Create a Service Class**: Define a new class (e.g., `PropertyService`) that will encapsulate the business logic.
2.  **Define Methods**: Move the logic from the controller's functions into corresponding methods within this service (e.g., `findAll`, `findOne`, `create`, `update`).
3.  **Controller Calls Service**: The controller's methods will then simply call the corresponding methods on an instance of the `PropertyService`.

#### Example Code (TypeScript - Initial Service Structure):

**`property.service.ts`**
```typescript
// property.service.ts
export class PropertyService {
  findAll() {
    // Logic to find all properties
    console.log('Finding all properties from service...');
    return [];
  }

  findOne(id: string) {
    // Logic to find a single property by ID
    console.log(`Finding property with ID: ${id} from service...`);
    return null;
  }

  create(data: any) {
    // Logic to create a new property
    console.log('Creating property from service...', data);
    return data;
  }

  update(id: string, data: any) {
    // Logic to update a property by ID
    console.log(`Updating property with ID: ${id} from service...`, data);
    return { id, ...data };
  }
}
```

#### Example Code (TypeScript - Controller Calling Service, **The Wrong Way**):

Initially, you might try to create an instance of the service directly in the controller.

**`property.controller.ts` (Demonstrates the "Wrong Way" for dependencies)**
```typescript
// property.controller.ts - DO NOT DO THIS IN NESTJS
import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { PropertyService } from './property.service'; // Assuming same directory for simplicity

@Controller('property')
export class PropertyController {
  private propertyService: PropertyService; // Declare the dependency

  constructor() {
    // THE WRONG WAY: Controller creates its own dependency
    this.propertyService = new PropertyService();
    console.log('PropertyService instantiated by PropertyController (wrong way)');
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.propertyService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.propertyService.update(id, body);
  }
}
```
*   In this "wrong way", the `PropertyController` directly creates an instance of `PropertyService` using `new PropertyService()`. This makes the controller **dependent** on the service.

### 3. Inversion of Control (IoC)

The issue with a class creating its own dependencies (`new PropertyService()`) is that it violates the principle of **Inversion of Control (IoC)**.

#### What is Inversion of Control?

*   **Normal Control Flow**: A class typically creates and manages its own dependencies.
*   **Inverted Control Flow**: With IoC, an **external entity** (like a framework) takes control and creates the dependencies for the classes, then provides them.

#### Implementing IoC: Constructor Injection (Manual)

Instead of a class creating its own dependencies, it should **receive them through its constructor**.

#### Step-by-Step Explanation:

1.  **Remove Manual Instantiation**: Remove `this.propertyService = new PropertyService()` from the constructor.
2.  **Receive Dependency as Parameter**: Add `propertyService: PropertyService` as a parameter to the constructor.
3.  **Assign Parameter**: Assign the received parameter to the class member (`this.propertyService = propertyService`).

#### Example Code (TypeScript - Controller with Manual IoC via Constructor Injection):

**`property.controller.ts` (Demonstrates Manual IoC)**
```typescript
// property.controller.ts - Demonstrates Manual IoC
import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  private propertyService: PropertyService;

  constructor(propertyService: PropertyService) { // IoC: Dependency received from outside
    this.propertyService = propertyService;
    console.log('PropertyService received via constructor (manual IoC)');
  }

  // ... (findAll, findOne, create, update methods remain the same)
  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.propertyService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.propertyService.update(id, body);
  }
}
```

#### Benefits of IoC with Interfaces:

*   **Loose Coupling**: The controller doesn't depend on a concrete `PropertyService` class directly, but rather on an abstraction.
*   **Easier Testing**: You can define an **interface** (e.g., `IService`) and have different service implementations (e.g., `ProductionPropertyService`, `TestingPropertyService`) adhere to it.
    *   For testing, you can inject a `TestingPropertyService` that uses fake data, without modifying the controller's code.

#### Example Code (TypeScript - IoC with Interface for Testing):

**`service.interface.ts`**
```typescript
// service.interface.ts
export interface IService {
  findAll(): any[];
  findOne(id: string): any;
  create(data: any): any;
  update(id: string, data: any): any;
}
```

**`property.service.ts` (Production Implementation)**
```typescript
// property.service.ts (Production)
import { IService } from './service.interface';

export class PropertyService implements IService {
  findAll() {
    console.log('Finding all properties from PRODUCTION service...');
    return [{ id: 'prod1', name: 'Production House' }];
  }
  // ... other methods
  findOne(id: string) { return { id, name: 'Prod House' }; }
  create(data: any) { return data; }
  update(id: string, data: any) { return { id, ...data }; }
}
```

**`testing.property.service.ts` (Testing Implementation)**
```typescript
// testing.property.service.ts
import { IService } from './service.interface';

export class TestingPropertyService implements IService {
  findAll() {
    console.log('Finding all properties from TESTING service...');
    return [{ id: 'test1', name: 'Test Apartment' }];
  }
  // ... other methods
  findOne(id: string) { return { id, name: 'Test Apartment' }; }
  create(data: any) { return data; }
  update(id: string, data: any) { return { id, ...data }; }
}
```

**`property.controller.ts` (With Interface Type)**
```typescript
// property.controller.ts - With Interface Type
import { Controller, Get } from '@nestjs/common';
import { IService } from './service.interface';
// import { PropertyService } from './property.service'; // Would instantiate this for prod
// import { TestingPropertyService } from './testing.property.service'; // Would instantiate this for test

@Controller('property')
export class PropertyController {
  private propertyService: IService; // Dependency is of interface type

  constructor(propertyService: IService) {
    // We can pass either PropertyService or TestingPropertyService here
    this.propertyService = propertyService;
    console.log('PropertyService (interface type) received via constructor');
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }
  // ... other methods
}
```
*   This approach, while beneficial, makes **manual dependency management challenging** as dependency chains grow (e.g., `PropertyService` depends on `PropertyRepository`, `PropertyRepository` depends on `DatabaseService`, etc.). You would have to manually create each dependency in the correct order.

### 4. NestJS Dependency Injection System: The Solution

NestJS provides a powerful **Dependency Injection system** that automatically handles the creation and injection of dependencies, removing the burden of manual management.

#### How NestJS DI Works:

1.  **Declaration, Not Creation**: You only **declare** the dependencies a class needs in its constructor. NestJS takes care of creating and providing them.
2.  **`private` Keyword**: By adding `private` (or `public`, `protected`) to a constructor parameter, TypeScript automatically creates and assigns a class member with that name and type.
3.  **DI Container**: NestJS has a **Dependency Injection container** that manages all injectable classes (services, repositories, etc.).
    *   When the application starts, it scans all classes (except controllers, which are special entry points) and builds a table of dependencies.
    *   When a class (e.g., `PropertyController`) needs a dependency (e.g., `PropertyService`), the DI container:
        *   Checks if an instance of `PropertyService` already exists.
        *   If not, it creates one.
        *   If `PropertyService` itself has dependencies (e.g., `PropertyRepository`), the container creates those first.
        *   It then injects the `PropertyRepository` into `PropertyService`, creates `PropertyService`, and finally injects `PropertyService` into `PropertyController`.
    *   **Singleton Behaviour**: The DI container avoids creating duplicate instances. If `PropertyService` is already in the container and another class needs it, the existing instance is reused, which conserves server resources.

### 5. Creating a Service with Nest CLI (The NestJS Way)

The recommended way to create services in NestJS is using the Nest CLI.

#### Step-by-Step Explanation:

1.  **Generate Service**: Use the Nest CLI command to generate a service.
    ```bash
    nest g service property --no-spec
    ```
    *   `nest g` is shorthand for `nest generate`.
    *   `service` specifies that you're generating a service.
    *   `property` is the name of the service.
    *   `--no-spec` tells Nest CLI not to generate a test file (optional).
2.  **CLI Actions**: The CLI will:
    *   Create `property.service.ts`.
    *   Update the corresponding module file (e.g., `property.module.ts`) to register the service.
3.  **`@Injectable()` Decorator**: The generated service class will be decorated with `@Injectable()`.
    *   This decorator marks the class as one that can be managed by the NestJS DI container and can be injected into other classes.
4.  **Registering in Module**: The service is automatically added to the `providers` array of its parent module. This tells NestJS that this service is available for dependency injection within this module's scope.

#### Example Code (TypeScript - Generated Service and Module):

**`property.service.ts` (Generated by Nest CLI)**
```typescript
// property.service.ts
import { Injectable } from '@nestjs/common';

@Injectable() // Marks this class for DI
export class PropertyService {
  // Define your methods here
  async findAll() {
    console.log('Finding all properties...');
    return [];
  }

  async findOne(id: string) {
    console.log(`Finding property with ID: ${id}...`);
    return null;
  }

  async create(data: any) {
    console.log('Creating property...', data);
    return data;
  }

  async update(id: string, data: any) {
    console.log(`Updating property with ID: ${id}...`, data);
    return { id, ...data };
  }
}
```

**`property.module.ts` (Updated by Nest CLI)**
```typescript
// property.module.ts
import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service'; // Import the service

@Module({
  controllers: [PropertyController],
  providers: [PropertyService], // Register PropertyService as a provider
})
export class PropertyModule {}
```

### 6. Integrating the Service into the Controller (The NestJS DI Way)

With the service generated and registered, you can now simply declare it in your controller's constructor.

#### Step-by-Step Explanation:

1.  **Import Service**: Import `PropertyService` into your controller.
2.  **Constructor Injection**: Add a constructor parameter with the `private` keyword, the service's name, and its type.
    *   `private propertyService: PropertyService` will automatically:
        *   Declare `propertyService` as a private class member.
        *   Receive an instance of `PropertyService` from the NestJS DI container.
        *   Assign that instance to `this.propertyService`.
3.  **Call Service Methods**: Use `this.propertyService.methodName()` in your controller's endpoint functions.

#### Example Code (TypeScript - Controller with NestJS DI):

**`property.controller.ts` (The Correct NestJS DI Way)**
```typescript
// property.controller.ts
import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { PropertyService } from './property.service'; // Import the service

@Controller('property')
export class PropertyController {
  // NestJS DI: Declare the dependency in the constructor
  constructor(private readonly propertyService: PropertyService) {
    console.log('PropertyService automatically injected by NestJS DI');
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.propertyService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.propertyService.update(id, body);
  }
}
```
*   Now, the `PropertyController` correctly uses **Dependency Injection** provided by NestJS. It does not create its own dependencies, ensuring **loose coupling**, **easier testing**, and better **maintainability**.

***

---

Setting up **TypeORM with a PostgreSQL database** in a NestJS application, covering everything from database creation to defining entities and automatically syncing them with the database schema.

### Step 1: Create Your PostgreSQL Database

Before configuring TypeORM, you need a PostgreSQL database. The video presents two options:
*   Setting up a PostgreSQL database inside a **Docker container**.
*   Using a **serverless platform**.

For this course, the second option using a serverless platform is chosen, specifically **Neon**.

1.  **Log in to Neon**: Go to the Neon platform and log in, for example, using a Google account.
2.  **Create a New Project**:
    *   Specify a project name (e.g., `nestjs-course`).
    *   Specify a database name (e.g., `real_estate_DB`).
    *   Click "Create Project".
3.  **Obtain Database URL**: Neon will provide a **PostgreSQL database URL**. This URL is crucial for your TypeORM configuration.

### Step 2: Install TypeORM Dependencies

Navigate to your NestJS project's terminal and install the necessary packages:

```bash
npm install @nestjs/typeorm typeorm pg
```

*   `@nestjs/typeorm`: The **NestJS integration package** for TypeORM.
*   `typeorm`: The **core TypeORM library**.
*   `pg`: The **PostgreSQL driver** for TypeORM. (Note: The video initially shows `mysql` but explicitly states to replace it with `pg` for PostgreSQL).

### Step 3: Configure TypeORM in Your NestJS Application

This involves creating a configuration file and integrating it into your main application module.

#### 3.1 Create a Database Configuration File (`db.config.ts`)

Create a file named `db.config.ts` in the root path of your application to hold the TypeORM configuration object.

1.  **Export Configuration Object**: Define and export an object, for example, `PGConfig`, typed as `PostgresConnectionOptions`. This type comes from `typeorm/driver/postgres/PostgresConnectionOptions`.

2.  **Define Configuration Properties**:
    *   **`url`**: Set this to the **database URL obtained from Neon**. The video notes that this should ideally be placed in an `.env` file for security, but for demonstration purposes, it's directly placed in `db.config.ts`.
    *   **`type`**: Set to `'postgres'`.
    *   **`port`**: Set to `3306` (the default port for PostgreSQL).
    *   **`entities`**: An array to list your entity classes. Initially, you can leave it empty.
    *   **`synchronize`**: Set to `true` for **development mode**. This option **automatically updates your database schema based on your entity definitions**.
        *   **Warning**: It is **highly discouraged to set `synchronize` to `true` in production** as accidental changes to entities (e.g., removing a column) could lead to **permanent data loss** by dropping that column from your database. In production, `synchronize` should be `false`.

```typescript
// src/db.config.ts
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const PGConfig: PostgresConnectionOptions = {
  url: 'YOUR_NEON_POSTGRES_DATABASE_URL', // **IMPORTANT: In production, store this in an .env file.**
  type: 'postgres',
  port: 3306,
  entities: [], // Will be populated with entities
  synchronize: true, // **IMPORTANT: Set to false in production to prevent data loss.**
};
```
(Note: The original source mentions port 3306 for Postgres, which is commonly associated with MySQL. The standard PostgreSQL port is 5432. However, following the source directly, 3306 is used here. You may want to verify this for your specific setup.)

#### 3.2 Configure in Root Module (`app.module.ts`)

Open your `app.module.ts` (the root module of your application) and integrate the TypeORM module.

1.  **Import `TypeOrmModule`**: This module comes from `@nestjs/typeorm`.
2.  **Import `PGConfig`**: Import the configuration object you just created from `db.config.ts`.
3.  **Add to `imports`**: In the `imports` array of your `AppModule`, add `TypeOrmModule.forRoot()` and pass your `PGConfig` object to it.

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PGConfig } from './db.config'; // Import your database configuration

@Module({
  imports: [
    // Configure TypeORM using the PGConfig object
    TypeOrmModule.forRoot(PGConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Step 4: Create Your First Entity

An entity is a class that **maps directly to a table in your database**. TypeORM uses these entity classes to automatically create your database schema.

1.  **Create an `entities` directory**: Inside your `src` directory, create a new directory named `entities`.
2.  **Create an entity file**: Inside `src/entities`, create `property.entity.ts`. It's good practice to include `.entity` in the file name (e.g., `property.entity.ts`).
3.  **Define the class**:
    *   Export a class (e.g., `Property`).
    *   Mark the class with the **`@Entity()` decorator** from TypeORM. This tells TypeORM that this class represents a database table.
    *   Define properties (fields) for your entity.
    *   Mark each property with appropriate TypeORM decorators:
        *   **`@PrimaryGeneratedColumn()`**: For an **auto-incrementing primary key**. The database will automatically generate ID values for new records.
        *   **`@Column()`**: For regular fields.
        *   You can pass a configuration object to `@Column()` to set properties like `default` values.

```typescript
// src/entities/property.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Marks this class as a TypeORM entity, mapping to a 'property' table
export class Property {
  @PrimaryGeneratedColumn() // Defines an auto-incrementing primary key column named 'id'
  id: number;

  @Column() // Defines a regular column named 'name'
  name: string;

  @Column() // Defines a regular column named 'description'
  description: string;

  @Column({ default: 0 }) // Defines a regular column named 'price' with a default value of 0
  price: number;
}
```

### Step 5: Link Entity to Configuration

After creating your entity, you need to inform TypeORM about it.

#### 5.1 Manual Entity Inclusion (Initial Method)

Initially, you would manually import and add your `Property` entity class to the `entities` array in your `db.config.ts` file.

```typescript
// src/db.config.ts (updated for manual entity inclusion)
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Property } from './entities/property.entity'; // Import your entity

export const PGConfig: PostgresConnectionOptions = {
  url: 'YOUR_NEON_POSTGRES_DATABASE_URL',
  type: 'postgres',
  port: 3306,
  entities: [Property], // Add your entity here
  synchronize: true,
};
```

### Step 6: Run Server and Verify

Now, start your NestJS application and observe the automatic schema creation.

```bash
npm run start:dev
```

*   With `synchronize: true`, TypeORM will automatically detect your `Property` entity and **create a `property` table in your PostgreSQL database** with `id`, `name`, `description`, and `price` columns.
*   You can verify this by going back to your Neon project dashboard and checking the "Tables" section, where you should see the new `property` table.

### Step 7: Automate Entity Discovery (Recommended Method)

Manually adding each entity to the `entities` array in `db.config.ts` becomes cumbersome with many entities (e.g., 20+ entities). TypeORM provides a way to **automatically discover entities** based on a file pattern.

1.  **Update `entities` array**: Modify the `entities` property in `db.config.ts` to use a glob pattern.
    *   `__dirname`: A global variable representing the **absolute directory path of the currently executing file** (i.e., `db.config.ts`).
    *   `'**/*.entity.ts'` (or `'**/*.entity.js'`): This pattern tells TypeORM to look in **any subdirectory** (`**`) for files ending with `.entity.ts` (or `.entity.js` if compiled). This is why it's recommended to name entity files like `property.entity.ts`.

```typescript
// src/db.config.ts (updated for automatic entity discovery)
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const PGConfig: PostgresConnectionOptions = {
  url: 'YOUR_NEON_POSTGRES_DATABASE_URL',
  type: 'postgres',
  port: 3306,
  // Automatically add any file ending with .entity.ts or .entity.js
  // within any subdirectory of the current directory (__dirname)
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
```

2.  **Test automatic discovery**:
    *   Stop your server (`Ctrl+C` in the terminal).
    *   (Optional) In Neon, manually drop the `property` table to see it recreated.
    *   Start your server again (`npm run start:dev`).
    *   Refresh your Neon dashboard; the `property` table will be recreated automatically, demonstrating the effectiveness of the glob pattern.

### Recap

The complete process involves:
*   **Creating a PostgreSQL database** and obtaining its URL.
*   **Installing TypeORM dependencies** (`@nestjs/typeorm`, `typeorm`, `pg`).
*   **Creating a configuration file (`db.config.ts`)**:
    *   Setting `url`, `type`, `port`.
    *   **Crucially, defining `entities`** (initially empty, then manually, then automatically with a pattern).
    *   Setting `synchronize: true` for development (and **`false` for production**).
*   **Configuring the root module (`app.module.ts`)**: Adding `TypeOrmModule.forRoot(PGConfig)` to `imports`.
*   **Creating entities**: Defining classes with `@Entity()`, `@PrimaryGeneratedColumn()`, and `@Column()` decorators.

### What's Next?

The course will continue to explore:
*   **CRUD operations** (Create, Read, Update, Delete) with TypeORM.
*   Creating a **real-world database schema with complex relationships** (one-to-one, one-to-many, many-to-many) using TypeORM.
*   Exploring other ORMs like **Prisma** and **Drizzle ORM**.
*   Working with **MongoDB and Mongoose** in a NestJS application.


---


Implementing **CRUD (Create, Read, Update, Delete) operations** using **TypeORM's repository pattern** in a NestJS application. It builds upon the previous episode where TypeORM was integrated and a `Property` entity was created.

### TypeORM CRUD Approaches

TypeORM offers two primary ways to perform CRUD operations:
*   **Query Builder**: For constructing more complex, raw-like queries.
*   **Repository Pattern**: This video focuses on this pattern, which provides a higher-level abstraction for interacting with entities.

### Core Concept: Repository Pattern

With the repository pattern, TypeORM automatically creates a **repository class for each entity** defined in your database schema (e.g., `Property` entity). This repository class provides a powerful API for both simple and complex CRUD operations.

### Step 1: Injecting the Repository into the Service

To perform CRUD operations, you need to access the entity's repository within your service class. This is achieved using NestJS's dependency injection system.

1.  **Go to the Service File**: Navigate to `src/property/property.service.ts` (or equivalent).
2.  **Use Constructor Injection**: Inject the `Property` entity's repository into the `PropertyService` constructor.
    *   Declare a private, read-only property (e.g., `propertyRepo`) in the constructor.
    *   Set its type to `Repository<Property>`, where `Repository` comes from `typeorm` and `Property` is your entity class.
    *   Use the **`@InjectRepository()` decorator** from `@nestjs/typeorm` above the constructor parameter, passing the `Property` entity as an argument.

**Example Code: `src/property/property.service.ts`**

```typescript
// src/property/property.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Import decorator
import { Repository } from 'typeorm'; // Import Repository class
import { Property } from '../entities/property.entity'; // Import your entity

@Injectable()
export class PropertyService {
  constructor(
    // Inject the Property repository
    @InjectRepository(Property) // Decorator specifies which entity's repository to inject
    private readonly propertyRepo: Repository<Property>, // Type the repository with your entity
  ) {}

  // Other CRUD methods will go here
}
```

### Step 2: Registering the Repository in the Module

If you use a repository class within a module, you **must register that repository** within that specific module. Failing to do so will result in an error.

1.  **Go to the Module File**: Navigate to `src/property/property.module.ts` (or equivalent).
2.  **Use `TypeOrmModule.forFeature()`**: In the `imports` array of your module, call `TypeOrmModule.forFeature()`.
3.  **Pass Entities**: Pass an array of entity classes whose repositories you intend to use in this module (e.g., `[Property]`).

**Example Code: `src/property/property.module.ts`**

```typescript
// src/property/property.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { Property } from '../entities/property.entity'; // Import your entity

@Module({
  imports: [
    // Register the Property repository for this module
    TypeOrmModule.forFeature([Property]),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
})
export class PropertyModule {}
```

**Verification**: After this step, if you run `npm run start:dev`, the previous error regarding the property repository should be resolved.

### Step 3: Implementing Create Operation (C)

To create a new record in the database, you'll define a method in your service and an endpoint in your controller.

#### 3.1 Service Method (`create`)

1.  **Input DTO**: The `create` method should accept a Data Transfer Object (DTO) that defines the properties for creating a new entity (e.g., `CreatePropertyDto`).
    *   The DTO (e.g., `CreatePropertyDto`) would typically have fields like `name`, `description`, and `price`.
2.  **Use `repository.save()`**: Call the `save()` method on your injected `propertyRepo` and pass the DTO object. This method will insert a new record into the database.
    *   **Important Note**: The `repository.create()` method only creates an **instance** of the entity class but **does not insert it** into the database. Always use `repository.save()` for insertion.
3.  **`async/await`**: The `save()` method is asynchronous, so use `await` and mark the service method as `async`.

**Example Code: `src/property/property.service.ts`**

```typescript
// src/property/property.service.ts (continued)
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto'; // Assume this DTO exists

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  // Create a new property
  async create(dto: CreatePropertyDto): Promise<Property> {
    const newProperty = await this.propertyRepo.save(dto); // Inserts the DTO into the database
    return newProperty;
  }
}
```

#### 3.2 Controller Endpoint (`POST /property`)

1.  **Handle `POST` Request**: Define a `POST` endpoint using the `@Post()` decorator.
2.  **Get Request Body**: Use the `@Body()` decorator to extract the request body and type it as `CreatePropertyDto`.
3.  **Call Service**: Pass the DTO to the `propertyService.create()` method.

**Example Code: `src/property/property.controller.ts`**

```typescript
// src/property/property.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto'; // Assume this DTO exists

@Controller('property') // Base route for property endpoints
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // Handle POST requests to create a new property
  @Post()
  create(@Body() dto: CreatePropertyDto): Promise<Property> {
    return this.propertyService.create(dto);
  }
}
```

#### 3.3 Verification (using Insomnia/PostgreSQL Database)

1.  **Run Application**: Ensure your NestJS application is running (`npm run start:dev`).
2.  **Send POST Request**: Use a tool like Insomnia to send a `POST` request to `http://localhost:3000/property` with a JSON body like:
    ```json
    {
      "name": "Property One",
      "description": "A beautiful property with a garden.",
      "price": 250000
    }
    ```
3.  **Expected Response**: You should receive an object similar to your input, but now including an `id` generated by the database (e.g., `id: 1`).
4.  **Database Verification**: Check your PostgreSQL database (e.g., via Neon dashboard). You should see a new record in the `property` table with the details you provided and an auto-generated ID.

### Step 4: Implementing Read Operations (R)

There are two common read operations: fetching a single record by ID and fetching all records.

#### 4.1 Find One (`findOne`)

1.  **Service Method (`findOne`)**:
    *   **Input**: Takes an `id` (number) parameter.
    *   **Use `repository.findOne()`**: Call `this.propertyRepo.findOne()`.
    *   **Configuration Object**: Pass an object with a `where` clause to specify the search criteria, e.g., `{ where: { id: id } }`.
    *   **Error Handling**: It's good practice to check if a property was found. If not, throw a `NotFoundException` (from `@nestjs/common`).
    *   **`async/await`**: Use `await` and mark the method as `async`.

**Example Code: `src/property/property.service.ts`**

```typescript
// src/property/property.service.ts (continued)
import { Injectable, NotFoundException } from '@nestjs/common'; // Import NotFoundException
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  // ... create method ...

  // Find a single property by ID
  async findOne(id: number): Promise<Property> {
    const property = await this.propertyRepo.findOne({ where: { id } }); // Search by ID

    // If property not found, throw an exception
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found.`);
    }

    return property;
  }
}
```

2.  **Controller Endpoint (`GET /property/:id`)**:
    *   **Handle `GET` Request**: Define a `GET` endpoint with an ID parameter (e.g., `/:id`) using the `@Get(':id')` decorator.
    *   **Extract ID**: Use `@Param('id')` to extract the ID from the URL. It's recommended to use a pipe like `ParseIntPipe` (from `@nestjs/common`) to ensure the ID is a number.
    *   **Call Service**: Pass the parsed ID to `propertyService.findOne()`.

**Example Code: `src/property/property.controller.ts`**

```typescript
// src/property/property.controller.ts (continued)
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common'; // Import Param and ParseIntPipe
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // ... create method ...

  // Find a property by its ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Property> { // Parse ID to number
    return this.propertyService.findOne(id);
  }
}
```

#### 4.2 Find All (`findAll`)

1.  **Service Method (`findAll`)**:
    *   Simply call `this.propertyRepo.find()` without any arguments to retrieve all records.
    *   Use `await` and mark as `async`.

**Example Code: `src/property/property.service.ts`**

```typescript
// src/property/property.service.ts (continued)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  // ... create and findOne methods ...

  // Find all properties
  async findAll(): Promise<Property[]> {
    return this.propertyRepo.find(); // Returns all properties
  }
}
```

2.  **Controller Endpoint (`GET /property`)**:
    *   Define a `GET` endpoint without any parameters.
    *   Call `propertyService.findAll()`.

**Example Code: `src/property/property.controller.ts`**

```typescript
// src/property/property.controller.ts (continued)
import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // ... create and findOne methods ...

  // Find all properties
  @Get()
  findAll(): Promise<Property[]> {
    return this.propertyService.findAll();
  }
}
```

#### 4.3 Verification (using Insomnia)

1.  **Test `GET /property/1`**: Send a `GET` request to `http://localhost:3000/property/1`. You should receive the property object with ID 1.
2.  **Test `GET /property/999`**: Send a `GET` request to `http://localhost:3000/property/999` (or any non-existent ID). You should receive a `404 Not Found` error with the message "Property with ID 999 not found.".
3.  **Test `GET /property`**: Send a `GET` request to `http://localhost:3000/property`. You should receive a list (array) containing all property objects in your database.

**Note on Pagination**: The video highlights the critical importance of implementing pagination for `findAll` functions, especially with large datasets (e.g., millions of records), to prevent server crashes. This topic will be covered in later sections.

### Step 5: Implementing Update Operation (U)

Updating a record typically involves finding it by ID and then applying partial changes.

#### 5.1 Create `UpdatePropertyDto`

For partial updates, NestJS provides `PartialType` to automatically make all fields of an existing DTO optional.

1.  **Install `@nestjs/mapped-types`**: If not already installed, run:
    ```bash
    npm install @nestjs/mapped-types
    ```
   
2.  **Create DTO File**: Create `src/property/dto/update-property.dto.ts`.
3.  **Extend `CreatePropertyDto` with `PartialType`**: Import `PartialType` from `@nestjs/mapped-types` and extend your `CreatePropertyDto` with it.

**Example Code: `src/property/dto/update-property.dto.ts`**

```typescript
// src/property/dto/update-property.dto.ts
import { PartialType } from '@nestjs/mapped-types'; // Import PartialType
import { CreatePropertyDto } from './create-property.dto'; // Import your base DTO

// UpdatePropertyDto inherits all fields from CreatePropertyDto, but makes them optional
export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {}
```

#### 5.2 Service Method (`update`)

1.  **Inputs**: The `update` method takes the `id` of the property to update (number) and an `UpdatePropertyDto` object containing the partial data.
2.  **Use `repository.update()`**: Call `this.propertyRepo.update()`. This method takes two arguments:
    *   **Search Criteria**: An object to identify the record(s) to update (e.g., `{ id }`).
    *   **Data to Update**: The DTO object containing the new values.
3.  **`async/await`**: Use `await` and mark the method as `async`.

**Example Code: `src/property/property.service.ts`**

```typescript
// src/property/property.service.ts (continued)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto'; // Import UpdatePropertyDto

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  // ... create, findOne, findAll methods ...

  // Update an existing property
  async update(id: number, dto: UpdatePropertyDto) {
    // The update method returns an UpdateResult object, including 'affected' count
    return this.propertyRepo.update({ id }, dto); // Update property by ID with provided DTO
  }
}
```

#### 5.3 Controller Endpoint (`PATCH /property/:id`)

1.  **Handle `PATCH` Request**: Define a `PATCH` endpoint with an ID parameter using the `@Patch(':id')` decorator.
2.  **Extract ID and Body**: Use `@Param('id', ParseIntPipe)` for the ID and `@Body()` for the request body, typed as `UpdatePropertyDto`.
3.  **Call Service**: Pass the ID and DTO to `propertyService.update()`.

**Example Code: `src/property/property.controller.ts`**

```typescript
// src/property/property.controller.ts (continued)
import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch } from '@nestjs/common'; // Import Patch decorator
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto'; // Import UpdatePropertyDto

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // ... create, findOne, findAll methods ...

  // Update a property by ID
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePropertyDto, // Use UpdatePropertyDto for partial updates
  ) {
    return this.propertyService.update(id, dto);
  }
}
```

#### 5.4 Verification (using Insomnia)

1.  **Send PATCH Request**: Send a `PATCH` request to `http://localhost:3000/property/1` with a JSON body like:
    ```json
    {
      "price": 300000
    }
    ```
   
2.  **Expected Response**: You should receive an object indicating the number of affected records, e.g., `{ affected: 1 }`.
3.  **Verify Update**: Send a `GET` request to `http://localhost:3000/property/1`. The response should show the property with the updated price (e.g., `price: 300000`). You can update any other fields with the same approach.

### Step 6: Implementing Delete Operation (D)

Deleting a record involves identifying it by its ID and removing it from the database.

#### 6.1 Service Method (`delete`)

1.  **Input**: The `delete` method takes an `id` (number) parameter.
2.  **Use `repository.delete()`**: Call `this.propertyRepo.delete()`. This method can take either a simple ID or an object with search criteria (e.g., `{ id }`).
3.  **`async/await`**: Use `await` and mark the method as `async`.

**Example Code: `src/property/property.service.ts`**

```typescript
// src/property/property.service.ts (continued)
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  // ... create, findOne, findAll, update methods ...

  // Delete a property by ID
  async delete(id: number) {
    // The delete method returns a DeleteResult object, including 'affected' count
    return this.propertyRepo.delete(id); // Delete property by ID
    // Alternatively: return this.propertyRepo.delete({ id });
  }
}
```

#### 6.2 Controller Endpoint (`DELETE /property/:id`)

1.  **Handle `DELETE` Request**: Define a `DELETE` endpoint with an ID parameter using the `@Delete(':id')` decorator.
2.  **Extract ID**: Use `@Param('id', ParseIntPipe)` to extract the ID.
3.  **Call Service**: Pass the ID to `propertyService.delete()`.

**Example Code: `src/property/property.controller.ts`**

```typescript
// src/property/property.controller.ts (continued)
import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common'; // Import Delete decorator
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  // ... create, findOne, findAll, update methods ...

  // Delete a property by ID
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.propertyService.delete(id);
  }
}
```

#### 6.3 Verification (using Insomnia/PostgreSQL Database)

1.  **Send DELETE Request**: Send a `DELETE` request to `http://localhost:3000/property/1`.
2.  **Expected Response**: You should receive an object indicating the number of affected records, e.g., `{ affected: 1 }`.
3.  **Verify Deletion**:
    *   Send a `GET` request to `http://localhost:3000/property/1`. You should receive a `404 Not Found` error, indicating the property has been deleted.
    *   Check your PostgreSQL database (e.g., Neon dashboard). The record with ID 1 should no longer be present in the `property` table.

### Summary and Next Steps

This video demonstrated how to perform **simple CRUD operations using TypeORM's repository pattern**.

The next episodes in the course will cover more complex topics, including:
*   Creating **relationships between database tables** (one-to-one, one-to-many, many-to-many).
*   Implementing **complex CRUD operations** once relationships are established.
*   Implementing **pagination** for `findAll` functions to handle large datasets efficiently.
*   Exploring other ORMs like **Prisma** and **Drizzle ORM** [7 (implied by previous general outline, not directly mentioned in this transcript's next steps)].
*   Working with **MongoDB and Mongoose** in a NestJS application [7 (implied by previous general outline, not directly mentioned in this transcript's next steps)].

---

### NestJS One-to-One Relationships with TypeORM

This video focuses on implementing one-to-one relationships between database tables using TypeORM in a NestJS application.

#### 1. Understanding One-to-One Relationships

A one-to-one relationship between two entities means that **one instance of the first entity is associated with exactly one instance of the second entity, and vice versa**.

**Examples**:
*   **Property and PropertyFeature**: Each `Property` entity has one `PropertyFeature` describing its attributes (e.g., number of bedrooms, bathrooms, area), and each `PropertyFeature` instance belongs to only one `Property`.
*   **User and UserProfile**: Each `User` has only one `UserProfile`, and each `UserProfile` belongs to only one `User`.

#### 2. Creating the Property Feature Entity

The first step is to create the `PropertyFeature` entity, which will represent the features of a property.

**Step-by-step Explanation**:
1.  **Create a new file**: Inside the `entities` directory, create `property-feature.entity.ts`.
2.  **Define the class and decorator**: Export a class `PropertyFeature` and mark it with the `@Entity()` decorator from TypeORM to designate it as a database table.
3.  **Define primary key**: Add an `id` field of type `number` and mark it with `@PrimaryGeneratedColumn()` to make it an auto-incrementing primary key.
4.  **Define feature columns**: Add fields for `bedrooms`, `bathrooms`, `parkingSpots`, `area` (all `number` type), `hasBalcony`, `hasGardenOrYard`, and `hasSwimmingPool` (all `boolean` type), marking each with the `@Column()` decorator.

**Example Code (`property-feature.entity.ts`)**:

```typescript
// src/entities/property-feature.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Property } from './property.entity'; // Assume property.entity.ts exists

@Entity()
export class PropertyFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  parkingSpots: number;

  @Column()
  area: number;

  @Column()
  hasBalcony: boolean;

  @Column()
  hasGardenOrYard: boolean;

  @Column()
  hasSwimmingPool: boolean;

  // Relationship field (will be explained in section 4)
  // @OneToOne(() => Property, (property) => property.propertyFeature)
  // @JoinColumn()
  // property: Property;
}
```

#### 3. Automatic Entity Registration (TypeORM Configuration)

TypeORM can be configured to **automatically discover and register entities** in your database connection.

**Explanation**:
*   The `entities` list in your `DB config` file can use a regular expression (e.g., `*.entity.ts` or `*.entity.js`).
*   This pattern ensures that any file within your database directory that matches this naming convention (e.g., `property-feature.entity.ts`) is automatically considered an entity, removing the need to manually register each new entity.

#### 4. Defining the One-to-One Relationship

To define the one-to-one relationship between `Property` and `PropertyFeature` entities, you use the `@OneToOne()` decorator from TypeORM.

**Step-by-step Explanation**:

*   **In the `Property` Entity**:
    1.  Add a field, e.g., `propertyFeature`, with the type `PropertyFeature`.
    2.  Mark it with the `@OneToOne()` decorator.
    3.  The first parameter of `@OneToOne()` is a callback function that returns the target entity's type, which is `PropertyFeature` in this case.

    **Example Code (`property.entity.ts` - initial relationship)**:
    ```typescript
    // src/entities/property.entity.ts (partial)
    import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
    import { PropertyFeature } from './property-feature.entity';

    @Entity()
    export class Property {
      @PrimaryGeneratedColumn()
      id: number;
      // ... other property fields

      @OneToOne(() => PropertyFeature) // Target side definition
      propertyFeature: PropertyFeature;
    }
    ```

*   **In the `PropertyFeature` Entity**:
    1.  Add a field, e.g., `property`, with the type `Property`.
    2.  Mark it with the `@OneToOne()` decorator.
    3.  The first parameter is a callback function that returns the target entity's type, which is `Property` in this case.

    **Example Code (`property-feature.entity.ts` - initial relationship)**:
    ```typescript
    // src/entities/property-feature.entity.ts (partial)
    import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
    import { Property } from './property.entity';

    @Entity()
    export class PropertyFeature {
      @PrimaryGeneratedColumn()
      id: number;
      // ... other feature fields

      @OneToOne(() => Property) // Target side definition
      property: Property;
    }
    ```

*   **Defining the Foreign Key with `@JoinColumn()`**:
    *   To determine which side of the relationship holds the foreign key, you use the **`@JoinColumn()`** decorator.
    *   Placing `@JoinColumn()` on a relationship field specifies that this entity's table will contain the foreign key column that refers to the other entity's primary key.
    *   In the example, `@JoinColumn()` is added to the `property` field within the `PropertyFeature` entity. This creates a `propertyId` foreign key column in the `property_feature` table, referencing the `id` column of the `property` table.

    **Example Code (`property-feature.entity.ts` - with `@JoinColumn()`)**:
    ```typescript
    // src/entities/property-feature.entity.ts (partial)
    import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
    import { Property } from './property.entity';

    @Entity()
    export class PropertyFeature {
      @PrimaryGeneratedColumn()
      id: number;
      // ... other feature fields

      @OneToOne(() => Property)
      @JoinColumn() // This side (PropertyFeature) will contain the foreign key (propertyId)
      property: Property;
    }
    ```

#### 5. Ensuring Data Consistency with Foreign Keys

Foreign keys play a crucial role in maintaining **data consistency** within your database.

**Explanation**:
*   A foreign key constraint ensures that a value entered into the foreign key column of one table **must exist as a primary key** in the referenced table.
*   For instance, if `propertyId` in `PropertyFeature` is set to `2`, there *must* be a `Property` record with `id: 2` in the `Property` table.
*   Attempting to insert a `propertyId` that does not exist in the `Property` table will result in a **foreign key constraint violation error**, preventing inconsistent data from being saved.

**Example**:
If a `PropertyFeature` record attempts to link to a `Property` with `id: 3`, but no `Property` with `id: 3` exists, the database will return an error.

#### 6. Bidirectional Navigation (Reverse Side Callback)

While not strictly necessary for the relationship to work, defining the **reverse side callback** in the `@OneToOne()` decorator enables **bidirectional navigation**.

**Explanation**:
*   The `@OneToOne()` decorator can take a second parameter, which is a callback function that defines the "reverse" relationship.
*   This allows you to easily **access the associated entity from either side**.
    *   If you have a `Property` instance, you can access its `PropertyFeature` via `property.propertyFeature`.
    *   If you have a `PropertyFeature` instance, you can access its `Property` via `propertyFeature.property`.

**Step-by-step Explanation**:
*   **In `Property` Entity**: The second callback takes an instance of `PropertyFeature` and returns the `property` field from it.
*   **In `PropertyFeature` Entity**: The second callback takes an instance of `Property` and returns the `propertyFeature` field from it.

**Example Code (Full Bidirectional Relationship)**:

```typescript
// src/entities/property.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PropertyFeature } from './property-feature.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  // ... other property fields

  @OneToOne(() => PropertyFeature, (propertyFeature) => propertyFeature.property) // Bidirectional navigation
  propertyFeature: PropertyFeature;
}
```

```typescript
// src/entities/property-feature.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class PropertyFeature {
  @PrimaryGeneratedColumn()
  id: number;
  // ... other feature fields

  @OneToOne(() => Property, (property) => property.propertyFeature) // Bidirectional navigation
  @JoinColumn() // Foreign key is here
  property: Property;
}
```

#### 7. Cascade Operations

**Cascade operations** define what happens to the related entity when an operation (like deletion or update) occurs on the primary entity.

**Explanation**:
*   You can pass a configuration object to the `@OneToOne()` decorator to enable cascading.
*   Setting `cascade: true` means that if the primary entity (e.g., `Property`) is removed or updated, the associated `PropertyFeature` will also be automatically removed or updated by the database.

**Types of Cascade Options**:
*   **`cascade: true`**: Enables cascading for all operations (update, remove).
    *   **Example**: If a `Property` instance is deleted, its associated `PropertyFeature` instance will also be automatically deleted.
    *   **Example**: If the `ID` of a `Property` is updated, the foreign key value in the `PropertyFeature` will automatically update.
*   **`cascade: ["update"]`**: Applies cascading only to update operations. If the `Property` is deleted, the associated `PropertyFeature` will *remain* in the database.
*   **`cascade: ["remove"]`**: Applies cascading only to remove/delete operations.
*   You can specify a list of specific operations (e.g., `["update", "remove"]`) for which to apply the cascade feature.

**Example Code (with Cascade Operations)**:

```typescript
// src/entities/property.entity.ts (partial)
import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { PropertyFeature } from './property-feature.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;
  // ... other property fields

  @OneToOne(() => PropertyFeature, (propertyFeature) => propertyFeature.property, { cascade: true })
  // Or: { cascade: ["update", "remove"] } for specific operations
  propertyFeature: PropertyFeature;
}
```

---

### NestJS One-to-Many Relationships with TypeORM

This video focuses on implementing one-to-many relationships between database tables using TypeORM in a NestJS application.

#### 1. Understanding One-to-Many Relationships

A **one-to-many relationship** defines a scenario where **one instance of a "parent" entity can be associated with multiple instances of a "child" entity, but each child entity can belong to only one parent entity**.

**Example**:
*   **User and Property**: Each `User` (parent) can have multiple `Property` (child) entities, but each `Property` can belong to only one `User`.

#### 2. Creating the User Entity

The first step is to create the `User` entity, which will serve as the "parent" in our one-to-many relationship with `Property`.

**Step-by-step Explanation**:
1.  **Create a new file**: Inside the `entities` directory (e.g., `src/entities/`), create `user.entity.ts`.
2.  **Define the class and decorator**: Export a class `User` and mark it with the `@Entity()` decorator from TypeORM. This tells TypeORM to create a `user` table in the database.
3.  **Define primary key**: Add an `id` field of type `number` and mark it with `@PrimaryGeneratedColumn()`. This makes `id` an auto-incrementing primary key.
4.  **Define standard columns**: Add fields for `firstName`, `lastName`, `email`, and `avatarURL` (all `string` type), marking each with the `@Column()` decorator. The `@Column()` decorator instructs TypeORM to create a corresponding field in the database table with the specified type (e.g., `varchar` for strings in PostgreSQL).
5.  **Define date columns**:
    *   Add a `createdAt` field of type `Date` and mark it with `@CreateDateColumn()`. This decorator automatically sets the column's value to the entity's insertion timestamp when a new record is created. You don't need to manually set this value.
    *   Optionally, you can also use `@UpdateDateColumn()` to automatically update a column with the entity's update timestamp whenever the entity is modified, and `@DeleteDateColumn()` for **soft deletion**, which marks an entity as deleted by setting a timestamp instead of physically removing the record from the database.

**Example Code (`user.entity.ts`)**:

```typescript
// src/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Property } from './property.entity'; // Assume property.entity.ts exists

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  avatarURL: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relationship field (will be explained in section 3)
  // @OneToMany(() => Property, (property) => property.user)
  // properties: Property[];
}
```

#### 3. Defining the One-to-Many Relationship (Parent Entity Side)

To establish the one-to-many relationship from the parent side, you use the `@OneToMany()` decorator in the `User` entity.

**Step-by-step Explanation**:
1.  **In the `User` Entity (Parent)**:
    *   Add a field (e.g., `properties`) whose type is an **array of the child entity** (`Property[]`). This field will represent the list of properties belonging to this user.
    *   Mark this field with the `@OneToMany()` decorator from TypeORM.
    *   The first parameter of `@OneToMany()` is a **target callback function** that returns the type of the target (child) entity, which is `Property` in this case (`() => Property`).
    *   The second parameter is a **reverse callback function**. This function takes an instance of the target entity (e.g., `property`) and returns the field within that child entity that refers back to the parent (`(property) => property.user`). This enables **bidirectional navigation**.

**Example Code (`user.entity.ts` - with One-to-Many)**:

```typescript
// src/entities/user.entity.ts (partial)
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  avatarURL: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Property, (property) => property.user) // User (parent) can have many Properties (children)
  properties: Property[]; // This will be a list of Property entities
}
```

#### 4. Defining the Many-to-One Relationship (Child Entity Side)

On the child side of a one-to-many relationship, you use the `@ManyToOne()` decorator. This is where the foreign key is typically established.

**Step-by-step Explanation**:
1.  **In the `Property` Entity (Child)**:
    *   Add a field (e.g., `user`) whose type is the **parent entity** (`User`). This field will represent the single user to whom this property belongs.
    *   Mark this field with the `@ManyToOne()` decorator from TypeORM.
    *   The first parameter of `@ManyToOne()` is the **target callback function** returning the type of the parent entity (`() => User`).
    *   The second parameter (optional) is the **reverse callback function**. It takes an instance of the parent entity (e.g., `user`) and returns the field within that parent entity that refers back to its children (`(user) => user.properties`). This completes the bidirectional navigation.
    *   TypeORM will automatically create a foreign key column in the `property` table (by default named `userId`) that references the primary key (`id`) of the `user` table.

**Example Code (`property.entity.ts`)**:

```typescript
// src/entities/property.entity.ts (You might need to create this file)
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity'; // Import the User entity

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string; // Example property field
  // ... other property fields

  @ManyToOne(() => User, (user) => user.properties) // Many Properties (children) belong to one User (parent)
  user: User; // This will hold the associated User entity
}
```

#### 5. Data Consistency with Foreign Keys

The foreign key plays a critical role in maintaining data integrity in a one-to-many relationship.

**Explanation**:
*   TypeORM automatically creates a foreign key column (e.g., `userId`) in the child table (`property`) when you define a `@ManyToOne` relationship.
*   This foreign key links each record in the `property` table to a specific record in the `user` table by referencing the `user` table's primary key (`id`).
*   **Foreign key constraints** ensure that you **cannot create a `Property` record that references a `User` ID that does not exist** in the `user` table. Attempting to do so will result in a foreign key constraint violation error.
*   This mechanism prevents orphaned records and ensures data consistency.

**Example**: If you try to create a property with `userId: 4`, but there is no `User` with `id: 4` in the database, the operation will fail.

#### 6. Customising the Foreign Key Column Name with `@JoinColumn()`

While TypeORM provides a default foreign key column name (e.g., `userId`), you can **customise this name** using the `@JoinColumn()` decorator.

**Step-by-step Explanation**:
1.  **Add `@JoinColumn()`**: Place the `@JoinColumn()` decorator on the `@ManyToOne()` relationship field in the **child entity** (e.g., `user` field in `Property` entity).
2.  **Specify `name` property**: Pass a configuration object to `@JoinColumn()` and set the `name` property to your desired column name (e.g., `ownerId`).
3.  **Database Effect**: After applying this change and running migrations/sync, the physical foreign key column in the `property` table will be renamed from `userId` to `ownerId`.

**Example Code (`property.entity.ts` - with Custom Foreign Key Name)**:

```typescript
// src/entities/property.entity.ts (partial)
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'ownerId' }) // Customize the foreign key column name to 'ownerId'
  user: User;
}
```

#### 7. Server Execution and Verification

After defining the entities and relationships, you can run the NestJS application to allow TypeORM to create or update the database tables.

**Verification Steps**:
1.  **Run the server**: Execute `npm run start:dev` (or similar command) to start the NestJS application.
2.  **Inspect database**: Use a database console tool (like Neon, as mentioned in the video) to view the generated tables.
    *   You will see the `user` table with columns like `id`, `firstName`, `lastName`, `email`, `avatarURL`, and `createdAt`.
    *   You will see the `property` table with its own fields and the **foreign key column** (e.g., `userId` or `ownerId`) linking to the `user` table.
3.  **Test data insertion**:
    *   Insert a new `User` record. Observe that `createdAt` is automatically populated.
    *   Insert `Property` records, associating them with the created `User` by setting the foreign key (e.g., `ownerId`) to the `User`'s ID.
    *   Verify that a single `User` can be linked to multiple `Property` records, while each `Property` is linked to only one `User`.
    *   Confirm that attempting to link a `Property` to a non-existent `User` ID results in a foreign key constraint violation error.


---

### NestJS Many-to-Many Relationships with TypeORM

This video explains how to implement many-to-many relationships between database tables using TypeORM in a NestJS application, highlighting that while they might sound complex, TypeORM makes them easier to manage.

#### 1. Understanding Many-to-Many Relationships

A **many-to-many relationship** describes a scenario where **records in one table can be associated with multiple records in another table, and vice-versa**.

**Example**:
*   **Student and Course**: Each `Student` can enroll in multiple `Course`s, and each `Course` can have multiple `Student`s enrolled in it.
*   **User and Property (Real Estate App)**: Each `User` can like multiple `Property` entities, and each `Property` can be liked by multiple `User` entities.

#### 2. Implementing Many-to-Many in Relational Databases (Conceptual)

Relational databases **cannot directly implement a many-to-many relationship between two tables**. Instead, they require an intermediary table known as a **joint table** (or junction table).

**Conceptual Steps**:
1.  **Create a Joint Table**: This new table sits between the two main tables (e.g., `Student` and `Course`, or `User` and `Property`).
2.  **Establish One-to-Many Relationships**: Each of the two main tables (e.g., `Student` and `Course`) will then have a **one-to-many relationship** to this joint table.
    *   `Student` (one) -> `StudentCourseJoinTable` (many)
    *   `Course` (one) -> `StudentCourseJoinTable` (many)
    *   This joint table typically contains foreign keys from both main tables, effectively linking specific records from each.

**Example Schema for User and Property**:
*   `User` table
*   `Property` table
*   `UserLikedProperty` (joint table) which links `User` and `Property`.
    *   `User` has a one-to-many relationship with `UserLikedProperty`.
    *   `Property` has a one-to-many relationship with `UserLikedProperty`.

#### 3. TypeORM's Simplification for Many-to-Many

The good news with TypeORM is that **you do not need to explicitly define this joint table in your database schema**. TypeORM allows you to directly define a many-to-many relationship between two entities, and **it will automatically create the joint table under the hood** in your database.

#### 4. Implementing Many-to-Many with TypeORM (Step-by-Step)

We will use the existing `User` and `Property` entities from the previous discussions. For this scenario, we assume a `User` can like multiple `Property` entities, and a `Property` can be liked by multiple `User` entities.

**Step 1: Define the Many-to-Many Relationship in the `User` Entity (Owning Side)**

1.  **Navigate to `user.entity.ts`**: Open your `User` entity file.
2.  **Add a new field**: Create a new field, for example, `likedProperties`, whose type is an **array of the related entity** (`Property[]`).
3.  **Apply `@ManyToMany()` decorator**: Mark this field with the `@ManyToMany()` decorator from TypeORM.
    *   **Target Callback**: The first parameter is a callback function that returns the type of the target (related) entity (`() => Property`).
    *   **Reverse Callback**: The second parameter is a callback function that takes an instance of the target entity (`property`) and returns the field within that target entity that refers back to the current entity (`(property) => property.likedBy`). This field (`likedBy`) will be defined in the `Property` entity.
4.  **Apply `@JoinTable()` decorator**: Crucially, on **one side of the many-to-many relationship**, you must use the `@JoinTable()` decorator. This decorator tells TypeORM to create the joint table for this relationship.
    *   **Owning Side**: The side with `@JoinTable()` is considered the **owning side** of the relationship. While it's flexible, placing it on the `User` entity (e.g., `user` has `likedProperties`) often makes more logical sense.
    *   **Customise Joint Table Name (Optional)**: You can pass a configuration object to `@JoinTable()` with a `name` property to specify a custom name for the joint table (e.g., `{ name: 'user_liked_properties' }`). If not specified, TypeORM will generate a default name (e.g., `user_properties`).

**Example Code (`user.entity.ts`)**:

```typescript
// src/entities/user.entity.ts (updated)
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  avatarURL: string;

  @CreateDateColumn()
  createdAt: Date;

  // Existing One-to-Many relationship (User can own many Properties)
  @OneToMany(() => Property, (property) => property.user)
  properties: Property[];

  // New Many-to-Many relationship (User can like many Properties)
  @ManyToMany(() => Property, (property) => property.likedBy)
  @JoinTable({ name: 'user_liked_properties' }) // This creates the join table
  likedProperties: Property[]; // List of properties this user likes
}
```

**Step 2: Define the Many-to-Many Relationship in the `Property` Entity (Inverse Side)**

1.  **Navigate to `property.entity.ts`**: Open your `Property` entity file.
2.  **Add a new field**: Create a new field, for example, `likedBy`, whose type is an **array of the related entity** (`User[]`).
3.  **Apply `@ManyToMany()` decorator**: Mark this field with the `@ManyToMany()` decorator.
    *   **Target Callback**: The first parameter is a callback function returning the type of the target (related) entity (`() => User`).
    *   **Reverse Callback**: The second parameter is a callback function that takes an instance of the target entity (`user`) and returns the field within that target entity that refers back to the current entity (`(user) => user.likedProperties`).
    *   **No `@JoinTable()`**: **Do not** add `@JoinTable()` here, as it's already defined on the `User` entity, which is the owning side.

**Example Code (`property.entity.ts`)**:

```typescript
// src/entities/property.entity.ts (updated)
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;
  // ... other property fields

  // Existing Many-to-One relationship (Property belongs to one User)
  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'ownerId' })
  user: User;

  // New Many-to-Many relationship (Property can be liked by many Users)
  @ManyToMany(() => User, (user) => user.likedProperties)
  likedBy: User[]; // List of users who like this property
}
```

#### 5. Server Execution and Verification

After defining the entities and relationships, run your NestJS application to allow TypeORM to create or update the database tables.

**Verification Steps**:
1.  **Run the server**: Execute `npm run start:dev` (or your equivalent command). TypeORM will detect the new relationship and create the necessary tables.
2.  **Inspect Database**: Use a database console tool (e.g., Neon Console mentioned in the video).
    *   You will see the `user` table and `property` table as before.
    *   **Crucially, you will now see a new table named `user_liked_properties`** (or whatever custom name you provided).
    *   **Joint Table Structure**: This `user_liked_properties` table will have two columns: `userId` and `propertyId`, both acting as foreign keys referencing the respective `id` columns in the `user` and `property` tables. These are not "physical fields" in the sense of entity properties, but represent the association.
3.  **Test Data Insertion**:
    *   Insert a `User` (e.g., `user 2`).
    *   Insert a `Property` (e.g., `property 2`).
    *   To establish a like, you would insert records into the `user_liked_properties` table. For example, `userId: 2, propertyId: 2` would mean `user 2` likes `property 2`.
    *   **Demonstrate Many-to-Many**:
        *   Insert `userId: 2, propertyId: 3`. Now `user 2` likes multiple properties (`2` and `3`).
        *   Insert a new `User` (e.g., `user 3`). Then insert `userId: 3, propertyId: 3`. Now `property 3` is liked by multiple users (`user 2` and `user 3`).
    *   This demonstrates the perfect many-to-many relationship using the joint table.

---


### NestJS TypeORM Seeding

This video explains how to **seed a database with fake or testing data** using TypeORM in a NestJS project, allowing you to populate your tables by running a single command.

#### 1. What is Database Seeding?

Database seeding is the process of **populating your database tables with initial data**. This data is typically **testing or fake data**, which is essential for developing and testing your application without manually inserting records.

**Goal**: To run a command like `npm run seed`, which then automatically creates testing data in your database tables.

#### 2. Installation of Dependencies

The first step is to install the necessary packages:
*   `typeorm-extension`: Provides utilities for database seeding.
*   `@faker-js/faker`: A library for generating various types of fake data.

**Command**:
```bash
npm i typeorm-extension @faker-js/faker
```


#### 3. Creating Factories

A **factory** is responsible for **creating and initialising an instance of an entity with some values**. For each entity that needs seeding, you will create a corresponding factory.

**Location**: Create a new directory `seeding` inside `src` (e.g., `src/seeding`) to house your factories and seeders.

##### A. User Factory (`user.factory.ts`)

This factory will create fake `User` instances.

**Steps**:
1.  Create `user.factory.ts` inside `src/seeding`.
2.  Import `setSeederFactory` from `typeorm-extension` and your `User` entity.
3.  Export a constant `userFactory` using `setSeederFactory`.
    *   The first parameter is the **entity type** (`User`).
    *   The second parameter is a **callback function** that receives a `faker` instance.
4.  Inside the callback, create a new `User` instance.
5.  **Initialize its properties** using the `faker` instance.
    *   `firstName`: `faker.person.firstName()`
    *   `lastName`: `faker.person.lastName()`
    *   `email`: `faker.internet.email()`
    *   `avatarURL`: `faker.image.avatar()`
6.  Return the initialized `User` instance.

**Example Code (`src/seeding/user.factory.ts`)**:

```typescript
// src/seeding/user.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/user.entity'; // Adjust path if necessary
import { Faker } from '@faker-js/faker'; // Import Faker type

export const userFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.firstName = faker.person.firstName();
  user.lastName = faker.person.lastName();
  user.email = faker.internet.email();
  user.avatarURL = faker.image.avatar();
  return user;
});
```


##### B. Property Factory (`property.factory.ts`)

This factory will create fake `Property` instances.

**Steps**:
1.  Create `property.factory.ts` inside `src/seeding`.
2.  Copy the structure from `user.factory.ts` and modify it for the `Property` entity.
3.  Import `Property` entity and `Faker`.
4.  Rename `userFactory` to `propertyFactory`.
5.  Set the entity type to `Property`.
6.  Initialize `Property` specific fields:
    *   `name`: `faker.location.streetAddress()` (or similar location data)
    *   `price`: `+faker.commerce.price({ min: 10000, max: 10000000 })` (use `+` to convert string price to number)
    *   `description`: `faker.lorem.sentence()`
7.  Return the initialized `Property` instance.

**Example Code (`src/seeding/property.factory.ts`)**:

```typescript
// src/seeding/property.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { Property } from '../entities/property.entity'; // Adjust path if necessary
import { Faker } from '@faker-js/faker';

export const propertyFactory = setSeederFactory(Property, (faker: Faker) => {
  const property = new Property();
  property.name = faker.location.streetAddress(); // Example for property name/address
  property.price = +faker.commerce.price({ min: 10000, max: 10000000 }); // Price between 10k and 10M, converted to number
  property.description = faker.lorem.sentence();
  // Note: Complex relations like user, propertyFeature, propertyType are not initialized here.
  // They will be handled in the main seeder using the 'make' function.
  return property;
});
```


##### C. Property Feature Factory (`propertyfeature.factory.ts`)

This factory will create fake `PropertyFeature` instances.

**Steps**:
1.  Create `propertyfeature.factory.ts` inside `src/seeding`.
2.  Copy the structure and modify for `PropertyFeature`.
3.  Import `PropertyFeature` entity and `Faker`.
4.  Rename `propertyFactory` to `propertyFeatureFactory`.
5.  Set the entity type to `PropertyFeature`.
6.  Initialize `PropertyFeature` specific fields:
    *   `area`: `faker.number.int({ min: 25, max: 2500 })`
    *   `baths`: `faker.number.int({ min: 1, max: 3 })`
    *   `bedrooms`: `faker.number.int({ min: 1, max: 5 })` (example)
    *   `parkingSpot`: `faker.number.int({ min: 0, max: 2 })` (example)
    *   `hasBalcony`: `faker.datatype.boolean()`
    *   `hasGardenYard`: `faker.datatype.boolean()`
    *   `hasSwimmingPool`: `faker.datatype.boolean()`
7.  Return the initialized `PropertyFeature` instance.

**Example Code (`src/seeding/propertyfeature.factory.ts`)**:

```typescript
// src/seeding/propertyfeature.factory.ts
import { setSeederFactory } from 'typeorm-extension';
import { PropertyFeature } from '../entities/property-feature.entity'; // Adjust path
import { Faker } from '@faker-js/faker';

export const propertyFeatureFactory = setSeederFactory(PropertyFeature, (faker: Faker) => {
  const feature = new PropertyFeature();
  feature.area = faker.number.int({ min: 25, max: 2500 });
  feature.baths = faker.number.int({ min: 1, max: 3 });
  feature.bedrooms = faker.number.int({ min: 1, max: 5 });
  feature.parkingSpot = faker.number.int({ min: 0, max: 2 });
  feature.hasBalcony = faker.datatype.boolean();
  feature.hasGardenYard = faker.datatype.boolean();
  feature.hasSwimmingPool = faker.datatype.boolean();
  return feature;
});
```


##### D. Why No Factory for `PropertyType`?

For entities like `PropertyType`, where you only need a **few predefined values** (e.g., "condo" and "apartment"), you **do not need a factory**. These will be hardcoded and inserted directly using the repository in the main seeder.

#### 4. Creating the Main Seeder (`main.seeder.ts`)

The main seeder is the central file where you will **orchestrate the creation and insertion of all your testing data** using the factories and direct repository access.

**Steps**:
1.  Create `main.seeder.ts` inside `src/seeding`.
2.  Export a class named `MainSeeder` that `implements Seeder` from `typeorm-extension`.
3.  Implement the `public async run()` method, which takes `DataSource` and `FactoryManager` as parameters.
    *   `DataSource`: Used to **access entity repositories**.
    *   `FactoryManager`: Used to **access your defined factories**.
    *   **Note**: Seeding files run outside the NestJS application context, so **dependency injection cannot be used** to get repositories; they must be accessed via the `DataSource` parameter.

##### A. Seeding Property Types (Direct Insertion)

Since `PropertyType` has predefined values, we'll insert them directly using its repository.

**Steps**:
1.  Get the `PropertyType` repository using `dataSource.getRepository(PropertyType)`.
2.  Use `typeRepo.save()` to insert an array of `PropertyType` objects with their `value`.

**Example Code (part of `main.seeder.ts`)**:

```typescript
// Inside MainSeeder's run method
console.log('Seeding property types...'); //
const typeRepo = dataSource.getRepository(PropertyType); //
const propertyTypes = await typeRepo.save([ //
  { value: 'condo' },
  { value: 'apartment' },
]);
// propertyTypes now contains the inserted entities with their IDs
```


##### B. Seeding Users

Use the `UserFactory` to create and save multiple `User` instances.

**Steps**:
1.  Get the `UserFactory` using `factoryManager.get(User)`.
2.  Call `userFactory.saveMany(number)` to create and save the desired number of users (e.g., 10 users).

**Example Code (part of `main.seeder.ts`)**:

```typescript
// Inside MainSeeder's run method, after seeding property types
console.log('Seeding users...'); //
const userFactory = factoryManager.get(User); //
const users = await userFactory.saveMany(10); // Create and save 10 users
// users now contains the inserted entities
```


##### C. Seeding Properties (Complex Entity)

The `Property` entity is complex as it has relationships to `User`, `PropertyFeature`, and `PropertyType`. You need to initialize these relationships when creating `Property` instances.

**Steps**:
1.  **Prepare for multiple properties**: Use `Promise.all` with `Array(number).fill('').map(async () => ...)` to create multiple properties (e.g., 50) simultaneously.
2.  **Inside the map callback**:
    *   Get `PropertyFactory` and `PropertyFeatureFactory` using `factoryManager.get()`.
    *   Use `propertyFactory.make()` to create a `Property` instance **without saving it yet**.
    *   **Initialize related entities within the `make` function's configuration object**:
        *   `user`: Randomly select a user from the `users` list (created earlier) using `faker.helpers.arrayElement(users)`.
        *   `propertyType`: Randomly select a property type from the `propertyTypes` list using `faker.helpers.arrayElement(propertyTypes)`.
        *   `propertyFeature`: Use `propertyFeatureFactory.save()` to **create and immediately save a `PropertyFeature`** instance. This returned feature will then be assigned to the `propertyFeature` of the `Property`.
    *   Return the created (but unsaved) `Property` instance.
3.  **Save all properties**: After `Promise.all` completes, get the `Property` repository using `dataSource.getRepository(Property)`.
4.  Use `propertyRepo.save()` to save the entire list of created `Property` instances.

**Example Code (`src/seeding/main.seeder.ts`)**:

```typescript
// src/seeding/main.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder, FactoryManager } from 'typeorm-extension';
import { PropertyType } from '../entities/property-type.entity'; // Adjust path
import { User } from '../entities/user.entity'; // Adjust path
import { Property } from '../entities/property.entity'; // Adjust path
import { PropertyFeature } from '../entities/property-feature.entity'; // Adjust path
import { userFactory } from './user.factory'; // Adjust path
import { propertyFactory } from './property.factory'; // Adjust path
import { propertyFeatureFactory } from './property-feature.factory'; // Adjust path
import { Faker } from '@faker-js/faker'; // Import Faker type if needed within seeder for random choices

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: FactoryManager): Promise<any> {
    const faker = factoryManager.getFaker(); // Get faker instance from factoryManager if not imported directly

    // Seeding Property Types
    console.log('Seeding property types...');
    const typeRepo = dataSource.getRepository(PropertyType);
    const propertyTypes = await typeRepo.save([
      { value: 'condo' },
      { value: 'apartment' },
    ]);

    // Seeding Users
    console.log('Seeding users...');
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10); // Create and save 10 users

    // Seeding Properties (complex entity with relationships)
    console.log('Seeding properties...');
    const propertiesToCreate = 50; // Number of properties to create
    const properties = await Promise.all(
      Array(propertiesToCreate)
        .fill('')
        .map(async () => {
          const propertyFactory = factoryManager.get(Property); // Get factory inside map if not global
          const propertyFeatureFactory = factoryManager.get(PropertyFeature);

          const property = await propertyFactory.make({ // Make (create without saving) property instance
            user: faker.helpers.arrayElement(users), // Assign a random user from existing users
            propertyType: faker.helpers.arrayElement(propertyTypes), // Assign a random property type
            propertyFeature: await propertyFeatureFactory.save(), // Create and SAVE a property feature
          });
          return property;
        })
    );

    const propertyRepo = dataSource.getRepository(Property); // Get Property repository
    await propertyRepo.save(properties); // Save all properties
  }
}
```


#### 5. Creating the Entry Point (`seed.ts`)

This file acts as the **entry point for your seeding process**. It sets up the TypeORM `DataSource`, initializes it, synchronizes the schema, and then runs the seeders.

**Steps**:
1.  Create `seed.ts` inside `src/seeding`.
2.  Import `DataSourceOptions` from `typeorm` and `TypeOrmDataSource`, `SeederOptions`, `runSeeders` from `typeorm-extension`.
3.  Import your `DB_CONFIG` (assuming it's a configuration object for your database connection, e.g., PostgreSQL config).
4.  Import all your factories and your `MainSeeder`.
5.  Define `options` as `DataSourceOptions & SeederOptions`.
    *   **Spread your `DB_CONFIG`** (database connection settings).
    *   Set `factories` to an array containing all your factory exports (e.g., `[propertyFactory, userFactory, propertyFeatureFactory]`).
    *   Set `seeds` to an array containing your main seeder class (e.g., `[MainSeeder]`).
6.  Create a new `TypeOrmDataSource` instance with these `options`.
7.  Call `dataSource.initialize()`.
8.  In the `.then()` callback after initialization:
    *   Call `await dataSource.synchronize(true)` to ensure your database schema is up-to-date with your entities.
    *   Call `await runSeeders(dataSource)` to execute your `MainSeeder`.
    *   Finally, call `process.exit()` to terminate the seeding process.

**Example Code (`src/seeding/seed.ts`)**:

```typescript
// src/seeding/seed.ts
import { DataSourceOptions } from 'typeorm';
import { SeederOptions, TypeOrmDataSource, runSeeders } from 'typeorm-extension';
import { DB_CONFIG } from '../../db.config'; // Adjust path for your DB config

import { MainSeeder } from './main.seeder'; //
import { userFactory } from './user.factory'; //
import { propertyFactory } from './property.factory'; //
import { propertyFeatureFactory } from './property-feature.factory'; //

// Combine TypeORM DataSourceOptions with SeederOptions
const options: DataSourceOptions & SeederOptions = {
  ...DB_CONFIG, // Spread your database configuration (e.g., PostgreSQL config)
  synchronize: false, // Set to false here, as we'll manually call synchronize later
  factories: [ // List all your factories
    userFactory,
    propertyFactory,
    propertyFeatureFactory,
  ],
  seeds: [MainSeeder], // List your main seeder(s)
};

const dataSource = new TypeOrmDataSource(options); // Create a new data source

dataSource
  .initialize() // Initialize the data source
  .then(async () => {
    await dataSource.synchronize(true); // Synchronize database schema
    await runSeeders(dataSource); // Run the defined seeders
    console.log('Database seeding complete!');
    return process.exit(); // Exit the process
  })
  .catch(error => {
    console.error('Database seeding failed!', error);
    process.exit(1);
  });
```


#### 6. Updating `package.json`

Add a new script to your `package.json` file to easily run the seeding process.

**Steps**:
1.  Open `package.json`.
2.  Add a `seed` script under the `scripts` section.
3.  The command should use `ts-node` to run your `seed.ts` file, specifying its path.

**Example (`package.json`)**:

```json
{
  "name": "your-nestjs-project",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    // ... other scripts
    "seed": "ts-node src/seeding/seed.ts" // New seed script
  },
  // ... rest of package.json
}
```


#### 7. Addressing Import Paths

Since the seeding files (`seed.ts`, `main.seeder.ts`, and factories) are **separate from NestJS modules**, their import paths need to be **relative to their file location**, not based on NestJS path aliases.

**Steps**:
1.  Go through `seed.ts`, `main.seeder.ts`, `user.factory.ts`, `property.factory.ts`, and `propertyfeature.factory.ts`.
2.  **Adjust all import paths** (e.g., `import { User } from '../entities/user.entity';` instead of `@entities/user.entity`) to correctly resolve the files based on their relative positions within the file system.

#### 8. Running the Seeder and Verification

Once all files are set up and import paths are corrected, you can run the seeding command.

**Steps**:
1.  **Run the seed script**:
    ```bash
    npm run seed
    ```
   
2.  **Observe console output**: You should see logs indicating the seeding of property types, users, and properties.
3.  **Verify in your database**: Connect to your database (e.g., using Neon Console as mentioned in the video).
    *   Check your `user` table for 10 new users.
    *   Check your `property_type` table for "condo" and "apartment".
    *   Check your `property` table for 50 new properties.
    *   Check your `property_feature` table for 50 new property features.
    *   Crucially, verify that relationships are correctly established (e.g., each property has an associated user and property type, and a property feature).

This process successfully seeds your PostgreSQL database with TypeORM.

---


## NestJS Pagination Implementation

This video addresses the inefficiency of fetching all records from a database in a single query and provides a solution using pagination in a NestJS application.

### 1. The Problem: Inefficient Data Retrieval

**Fetching all records is inefficient and problematic for several reasons**:
*   If a table contains millions of records, fetching all of them at once will cause **high response times**, **high server load**, and potentially **crash the server**.
*   The current `propertyService.fetchAll` function, which calls `propertyRepo.find()`, retrieves *all* records from the `property` table.
    *   Even with just 50 records, this method is unsustainable for larger datasets.

**Example of the problematic code (conceptual, based on description)**:
```typescript
// property.service.ts (before pagination)
import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository'; // Assuming this exists

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async fetchAll() {
    // This fetches all records, which is the problem
    return this.propertyRepo.find();
  }
}

// property.controller.ts (before pagination)
import { Controller, Get } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('/')
  async fetchAllProperties() {
    return this.propertyService.fetchAll();
  }
}
```

### 2. The Solution: Pagination

**Pagination** is the solution to inefficient data retrieval, allowing you to fetch records in smaller, manageable chunks. It requires two main parameters:
*   **`skip`**: Specifies the **number of records to skip** before starting to return the results.
*   **`limit` (or `take` in TypeORM)**: Specifies the **maximum number of records to return** in a single query.

### 3. Step-by-Step Implementation

To implement pagination, we'll modify the DTO, controller, and service layers of our NestJS application.

#### Step 3.1: Create a `PaginationDto`

We need a Data Transfer Object (DTO) to validate the `skip` and `limit` query parameters.

*   **File**: `src/dto/pagination.dto.ts`
*   **Parameters**: `skip` and `limit`, both of type `number`.
*   **Validation Decorators**:
    *   `@IsNumber()`: Ensures the parameter is a number.
    *   `@IsPositive()`: Ensures the number is positive.
    *   `@IsOptional()`: Makes the parameter optional (allowing default values or behaviour).

```typescript
// src/dto/pagination.dto.ts
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  skip?: number; // Number of records to skip

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number; // Maximum number of records to return
}
```

#### Step 3.2: Update the `PropertyController`

The controller needs to receive the `skip` and `limit` query parameters and pass them to the service.

*   Use the `@Query()` decorator from `@nestjs/common` to access query parameters.
*   The `@Query()` decorator can directly inject an instance of `PaginationDto`, which handles validation.
*   Pass this `paginationDto` object to the `findAll` (or `fetchAll`) function in the `PropertyService`.

```typescript
// src/property/property.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PaginationDto } from '../dto/pagination.dto'; // Import the DTO

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('/')
  async fetchAllProperties(
    @Query() paginationDto: PaginationDto, // Inject PaginationDto
  ) {
    // Pass the paginationDto to the service
    return this.propertyService.findAll(paginationDto);
  }
}
```

#### Step 3.3: Update the `PropertyService`

The service will now use the `skip` and `limit` values to query the database using TypeORM's `find` method.

*   The `findAll` function in `PropertyService` should accept the `paginationDto`.
*   TypeORM's `find` method accepts a configuration object with `skip` and `take` parameters.
    *   **`skip` in TypeORM** is the same as our `skip` parameter.
    *   **`take` in TypeORM** is the equivalent of our `limit` parameter, specifying how many records to return.

**Initial `property.service.ts` update**:
```typescript
// src/property/property.service.ts
import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository'; // Assuming this exists
import { PaginationDto } from '../dto/pagination.dto'; // Import the DTO

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async findAll(paginationDto: PaginationDto) {
    return this.propertyRepo.find({
      skip: paginationDto.skip,
      take: paginationDto.limit, // 'take' is TypeORM's 'limit'
    });
  }
}
```

#### Step 3.4: Handle Undefined `skip` and `limit` Parameters

Since `skip` and `limit` are optional, we need to consider what happens if they are not provided by the client.

*   **If `skip` is undefined**: TypeORM will start fetching records from the **first record** of the table. This behaviour is generally acceptable.
*   **If `limit` is undefined**: TypeORM will start fetching records from the `skip` point all the way **to the end of the table**, returning all remaining records. This is problematic as it defeats the purpose of pagination for the last "page".
    *   Therefore, we **cannot allow `limit` to be undefined**; we must provide a **default page size**.

#### Step 3.5: Define a Default Page Size

To handle the case where `limit` is not provided, we'll define a default page size.

*   **File**: `src/utils/constants.ts` (create a new `utils` folder and file).
*   **Constant**: `DEFAULT_PAGE_SIZE`, set to a reasonable number (e.g., 10).

```typescript
// src/utils/constants.ts
export const DEFAULT_PAGE_SIZE = 10;
```

#### Step 3.6: Integrate Default Page Size in `PropertyService`

Now, use the `DEFAULT_PAGE_SIZE` in the `PropertyService` if `paginationDto.limit` is undefined.

*   Use the **nullish coalescing operator (`??`)** to provide a default value for `take`.

```typescript
// src/property/property.service.ts
import { Injectable } from '@nestjs/common';
import { PropertyRepository } from './property.repository';
import { PaginationDto } from '../dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from '../utils/constants'; // Import the constant

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  async findAll(paginationDto: PaginationDto) {
    return this.propertyRepo.find({
      skip: paginationDto.skip,
      // Use defaultPageSize if paginationDto.limit is undefined or null
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }
}
```

### 4. Testing the Pagination (with Insomnia/API Client)

After implementing the changes, you can test the API endpoint to observe the pagination in action.

*   **Base URL**: `GET /property`

**Test Cases**:
1.  **No query parameters**:
    *   Request: `GET /property`
    *   Expected result: Returns records from the first record up to the `DEFAULT_PAGE_SIZE` (e.g., 10 records).
    *   This demonstrates the `DEFAULT_PAGE_SIZE` being applied.
2.  **With `skip` and `limit` parameters**:
    *   Request: `GET /property?skip=30&limit=15`
    *   Expected result: Returns records starting from record number 31 to record number 45.
    *   This shows that 30 records are skipped, and then 15 records are returned.

---

## Managing Environment Variables in NestJS (Best Practices + Config Module)

This video demonstrates how to load and access environment variables in a NestJS application using the **`@nestjs/config` module**, including best practices for organising configurations and managing different environment files.

### 1. The Problem: Accessing `.env` Variables Directly

*   **Direct Access Failure**: Attempting to access environment variables from a `.env` file directly using `process.env.VARIABLE_NAME` in a NestJS project often results in `undefined`.
    *   For example, `process.env.DB_NAME` would return `undefined` even if `DB_NAME` is set in a `.env` file.

**Example of problematic code**:
```typescript
// .env
DB_NAME=my_database_name

// src/main.ts
console.log(process.env.DB_NAME); // Output: undefined
```

### 2. Solution: NestJS Config Module

To fix the problem, the **`@nestjs/config` module** must be used.

#### Step 2.1: Install the Config Module

*   Install the module using npm or yarn:
    ```bash
    npm install @nestjs/config
    # or
    yarn add @nestjs/config
    ```

#### Step 2.2: Register the Config Module

*   The `ConfigModule` needs to be **registered in the root module** (e.g., `AppModule`).
*   Use `ConfigModule.forRoot()` and set `isGlobal: true` to make it accessible throughout the application without re-importing in other modules.

**Example `app.module.ts` configuration**:
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Register ConfigModule globally
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available everywhere
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

*   After this, `process.env` will correctly load variables from the `.env` file.

### 3. Variable Expansion

*   **Concept**: Variable expansion allows you to use one environment variable within the definition of another environment variable in the `.env` file.
*   **Syntax**: Use `$` followed by curly braces, e.g., `${DB_NAME}`.

**Example `.env` with variable expansion**:
```dotenv
DB_NAME=my_database
URL=${DB_NAME}/username # URL will become my_database/username
```

*   **Enabling Expansion**: By default, variable expansion is **disabled**. To enable it, set the `expandVariables` option to `true` in `ConfigModule.forRoot()`.

**Example `app.module.ts` with variable expansion enabled**:
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// ... other imports

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true, // Enable variable expansion
    }),
  ],
  // ...
})
export class AppModule {}
```

### 4. Custom Configuration Objects (Factory Functions)

The video discusses best practices for organising configurations, especially for modules like TypeORM, and addresses issues with accessing `process.env` outside the `src` directory.

#### Step 4.1: The Problem: `process.env` Outside `src`

*   `process.env` might not work correctly when trying to access environment variables from files **outside the `src` directory** (e.g., a `db.config.ts` file located at the project root).

#### Step 4.2: Solution: Create a `config` Directory Inside `src`

*   Move configuration files into a new `src/config` directory.
*   Define configurations using **factory functions**. A factory function is an anonymous function that returns a configuration object.

**Example `src/config/db.config.ts` (using a factory function)**:
```typescript
// src/config/db.config.ts
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// Removed path import for now, will add later

// This is a factory function that returns the configuration object
export default (() => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', // Example using env var
  port: parseInt(process.env.DB_PORT, 10) || 5432, // Use parseInt for port
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'nest',
  entities: [], // Path will be fixed later
  synchronize: true, // Good for development
})) as unknown as PostgresConnectionOptions; // Type assertion
```
*   **Important Tip**: Convert string environment variables like `PORT` to numbers using `parseInt()` or by prefixing with a `+` (unary plus operator).

#### Step 4.3: Load Custom Config in `AppModule`

*   Use the **`load` option** within `ConfigModule.forRoot()` to load the custom factory function.
*   For modules like TypeORM that also accept configuration, use `forRootAsync()` with the **`useFactory` option** to provide the loaded configuration.

**Example `app.module.ts` loading custom `db.config.ts`**:
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Assuming TypeORM is used
import dbConfig from './config/db.config'; // Import the default export from db.config.ts
// ... other imports

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [dbConfig], // Load your custom config factory function
    }),
    TypeOrmModule.forRootAsync({
      // Use useFactory to get the configuration from your factory function
      useFactory: dbConfig,
    }),
  ],
  // ...
})
export class AppModule {}
```

#### Step 4.4: Update Seeding Files (if applicable)

*   If you have a seeding file (e.g., `seed.ts`) that previously imported the database configuration, you need to update its path and ensure it calls the factory function to get the actual config object.
*   **Crucial**: Remember to **call the factory function** (e.g., `dbConfig()`) to retrieve the configuration object, and then **spread its properties** if needed for initialising TypeORM's `createConnection`.

**Example `seed.ts` update**:
```typescript
// seed.ts (conceptual, based on description)
import { createConnection } from 'typeorm';
import dbConfig from './src/config/db.config'; // Adjust path

async function seed() {
  const connectionOptions = dbConfig(); // Call the factory function
  const connection = await createConnection({
    ...connectionOptions, // Spread the returned object
    // ... any specific seeding options
  });
  // ... seeding logic
  await connection.close();
}

seed();
```

#### Step 4.5: Fix Entity Paths

*   When moving config files to `src/config`, **relative paths for entities** (e.g., `../**/*.entity{.ts,.js}`) in the TypeORM config might break because the base directory changes.
*   **Solution**: Use Node.js's **`path` module** to resolve paths correctly.
    *   `__dirname` refers to the directory of the current file (`src/config` in this case).
    *   `path.resolve(__dirname, '..')` will go up one level to the `src` directory.

**Example `src/config/db.config.ts` with fixed entity path**:
```typescript
// src/config/db.config.ts
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path'; // Import Node.js path module

export default (() => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'nest',
  // Resolve entities path correctly
  entities: [path.resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  synchronize: true,
})) as unknown as PostgresConnectionOptions;
```

### 5. Managing Different Environment Configurations (e.g., Production vs. Development)

It's common to have different configurations for development and production environments.

#### Step 5.1: Create Environment-Specific Config Files

*   Create a separate config file for each environment, e.g., `src/config/db.config.production.ts`.
*   Adjust specific options for that environment. For example, **`synchronize` should be set to `false` in production** to prevent accidental data loss.

**Example `src/config/db.config.production.ts`**:
```typescript
// src/config/db.config.production.ts
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

export default (() => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'production_db_host',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'prod_user',
  password: process.env.DB_PASSWORD || 'prod_password',
  database: process.env.DB_NAME || 'nest_prod',
  entities: [path.resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  synchronize: false, // Crucial: set to false for production!
})) as unknown as PostgresConnectionOptions;
```

#### Step 5.2: Conditionally Load Configurations

*   In `app.module.ts`, use **`process.env.NODE_ENV`** to check the current environment and load the appropriate configuration.

**Example `app.module.ts` with conditional loading**:
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config'; // Development config
import dbConfigProduction from './config/db.config.production'; // Production config
// ... other imports

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // Load both configs if needed, or dynamically load based on NODE_ENV
      load: [
        process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig, // Conditional loading
      ],
    }),
    TypeOrmModule.forRootAsync({
      // Conditionally use the factory function
      useFactory:
        process.env.NODE_ENV === 'production'
          ? dbConfigProduction
          : dbConfig,
    }),
  ],
  // ...
})
export class AppModule {}
```

### 6. Using `ConfigService`

The `ConfigService` provides a convenient way to access environment variables and custom configuration objects within your application.

#### Step 6.1: Injecting `ConfigService`

*   Inject `ConfigService` into any class (controller, service, etc.) where you need to access configuration values.

**Example `app.controller.ts` injecting `ConfigService`**:
```typescript
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  @Get()
  getHello(): string {
    // Access an environment variable using ConfigService
    const port = this.configService.get<string>('DB_PORT');
    return `Hello from port: ${port}`;
  }
}
```

#### Step 6.2: Accessing Custom Configuration Properties with `ConfigService`

To access properties from your custom configuration objects (`db.config.ts`, `db.config.production.ts`) using `ConfigService`, you need to **register them with a namespace**.

*   **Register with `registerAs`**: Use `registerAs()` from `@nestjs/config` within your factory function. This function takes a namespace string and the factory function itself.

**Example `src/config/db.config.ts` using `registerAs`**:
```typescript
// src/config/db.config.ts
import { registerAs } from '@nestjs/config'; // Import registerAs
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

// Register the config with a namespace, e.g., 'database'
export default registerAs(
  'database', // Namespace for this config
  () =>
    ({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'nest',
      entities: [path.resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
      synchronize: true,
    }) as unknown as PostgresConnectionOptions,
);
```
*   **Update `app.module.ts` for `TypeOrmModule`**: When using `registerAs`, the factory function will return the configuration *object* itself, so you just pass the function reference to `useFactory`.

**Updated `app.module.ts` for `TypeOrmModule` with `registerAs`**:
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config'; // Now imports the result of registerAs
import dbConfigProduction from './config/db.config.production';
// ... other imports

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // load array should contain the factory functions from registerAs calls
      load: [
        process.env.NODE_ENV === 'production' ? dbConfigProduction : dbConfig,
      ],
    }),
    TypeOrmModule.forRootAsync({
      // useFactory now directly uses the factory function from registerAs
      useFactory:
        process.env.NODE_ENV === 'production'
          ? dbConfigProduction
          : dbConfig,
    }),
  ],
  // ...
})
export class AppModule {}
```

*   **Accessing Properties**: Use `configService.get('namespace.propertyName')` to retrieve specific properties from your namespaced custom configuration.

**Example `app.controller.ts` accessing custom config property**:
```typescript
// src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  @Get('/db-type')
  getDbType(): string {
    // Access 'type' property from the 'database' namespace
    return this.configService.get<string>('database.type');
  }
}
```

This comprehensive approach allows for robust and organised management of environment variables and application configurations in NestJS.

---

### NestJS Full Course -13: Hashing - Key Points and Implementation

This episode focuses on setting up **authentication and authorization** in NestJS, specifically addressing the crucial step of **password hashing** using database triggers.

#### Step 1: Creating the User Module Resource

The first step involves generating a full-fledged user module to manage user-related operations.

1.  **Generate a Resource**:
    *   Open your terminal and use the Nest CLI command to create a resource named `user`.
    *   A **resource** in NestJS is a complete module that includes its own controller, service, Data Transfer Objects (DTOs), and an entity.

    ```bash
    nest g res user
    ```

2.  **Select Transport Layer**:
    *   When prompted, choose **`REST API`** as the transport layer.
    *   Confirm by typing `yes` to generate CRUD HTTP endpoints for the user controller.

3.  **Files Generated**:
    *   This command generates several files and directories within a `user` folder:
        *   `user.controller.ts` (with `create`, `findAll`, `findOne`, `update`, `remove` endpoints).
        *   `user.module.ts`.
        *   `user.service.ts` (declaring functions for CRUD operations).
        *   `dto/create-user.dto.ts` (an empty class initially).
        *   `user.entity.ts` (a new entity file, which will be removed as we have an existing one).

4.  **Cleanup**:
    *   Since a `User` entity has already been created in the main `entities` directory, **remove the newly generated `user.entity.ts` file and its directory** from the `user` module.

#### Step 2: Adding a Password Column to the User Entity

Next, modify your existing `User` entity to include a `password` column.

1.  **Modify `user.entity.ts`**:
    *   Open your `user.entity.ts` file (the one you already had, not the newly generated one).
    *   Add a new column for `password` with the type `string`.

    ```typescript
    // src/entities/user.entity.ts (or wherever your main user entity is)
    import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

    @Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        firstName: string;

        @Column()
        lastName: string;

        @Column({ unique: true })
        email: string;

        @Column({ nullable: true })
        avatarUrl: string;

        @CreateDateColumn()
        createdAt: Date;

        // Add the password column here
        @Column()
        password: string; // New password column
    }
    ```

2.  **Security Best Practice: Hashing Passwords**:
    *   **Never store plain passwords** in your database. This is a major security risk.
    *   If your database is compromised, attackers could gain direct access to user credentials.
    *   **Hashing passwords** transforms them into an **irreversible string of characters**. Even if hackers obtain the hashed password, they cannot recover the original password, significantly protecting user accounts.

3.  **Choosing a Hashing Strategy (Triggers vs. Service Function)**:
    *   One approach is to hash the password within the `create` function of your `UserService` before inserting the user into the database.
    *   However, most relational databases offer **triggers**, which allow you to run a function automatically before or after a CRUD operation.
    *   The video leverages **database triggers** for this task, specifically a `before insert` trigger for the `User` table. This ensures that every time a user is inserted, the trigger runs automatically to hash the password before the actual insert statement.

#### Step 3: Implementing a `before insert` Trigger for Password Hashing

We will use the `@BeforeInsert()` decorator from TypeORM and the `bcrypt` package to automatically hash passwords.

1.  **Install `bcrypt`**:
    *   `bcrypt` is a widely used package for hashing. Install it and its types:

    ```bash
    npm i bcrypt
    npm i --save-dev @types/bcrypt
    ```

2.  **Implement the Trigger in `user.entity.ts`**:
    *   Import `bcrypt` into your `user.entity.ts`.
    *   Use the `@BeforeInsert()` decorator to define an asynchronous function, for example, `hashPassword`.
    *   Inside this function, use `bcrypt.hash()` to hash the plain password (`this.password`).

    ```typescript
    // src/entities/user.entity.ts
    import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert } from 'typeorm';
    import * as bcrypt from 'bcrypt'; // Import bcrypt

    @Entity()
    export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        firstName: string;

        @Column()
        lastName: string;

        @Column({ unique: true })
        email: string;

        @Column({ nullable: true })
        avatarUrl: string;

        @CreateDateColumn()
        createdAt: Date;

        @Column()
        password: string;

        // ----------------------------------------------------------------------
        // BeforeInsert Trigger for Password Hashing
        // ----------------------------------------------------------------------
        @BeforeInsert()
        async hashPassword() {
            // bcrypt.hash takes two parameters: the plain password and the number of salt rounds.
            // Salt rounds determine the complexity of the hashing process.
            // A higher value increases security but slows down hashing.
            // The documentation suggests using '10' for salt rounds.
            this.password = await bcrypt.hash(this.password, 10); // Hash with 10 salt rounds
        }
    }
    ```

    *   **Explanation of `saltRounds`**: The `saltRounds` value in `bcrypt.hash()` determines the **complexity of the hashing process**. A higher `saltRounds` value increases security but also slows down the hashing. The `bcrypt` documentation suggests using **`10`** for `saltRounds` to balance security and performance.

#### Step 4: Using `bcrypt.compare` for Password Verification

The `bcrypt` package also provides a `compare` function for verifying passwords.

1.  **`bcrypt.compare()` Function**:
    *   This function is used to compare a plain-text password (provided by the user during login) with a stored hashed password.
    *   It takes **two arguments**: the plain password and the hashed version of the password from the database.
    *   The function first hashes the plain password and then compares it with the provided hashed password.

2.  **`saltRounds` in `compare()`**:
    *   You **do not need to provide the `saltRounds`** to the `bcrypt.compare()` function.
    *   This is because the **salt is implicitly included within the hashed password** itself. When `bcrypt` generates a hash, it incorporates the salt into the output.
    *   Therefore, `bcrypt.compare()` automatically extracts the original salt from the stored hashed value and uses it for the comparison.

#### Step 5: Developing the `CreateUserDto`

The `CreateUserDto` defines the expected structure and validation rules for creating a new user.

1.  **Define DTO Properties**:
    *   Open `src/user/dto/create-user.dto.ts`.
    *   Define properties for `firstName`, `lastName`, `email`, `avatarUrl`, and `password`.

2.  **Add `class-validator` Decorators**:
    *   Use decorators from the `class-validator` package to enforce validation rules.

    ```typescript
    // src/user/dto/create-user.dto.ts
    import { IsString, IsEmail, IsUrl, IsOptional } from 'class-validator';

    export class CreateUserDto {
        @IsString()
        firstName: string;

        @IsString()
        lastName: string;

        @IsEmail() // Ensures the string is a valid email format
        email: string;

        @IsOptional() // Marks the field as optional
        @IsString()
        @IsUrl() // Ensures the string is a valid URL format
        avatarUrl?: string; // Made optional

        @IsString() // Basic validation for password for now
        password: string;
    }
    ```

    *   **Note on Password Validation**: The video mentions that later in the course, a **custom decorator for password validation** will be created to enforce stronger rules (e.g., minimum length, special characters). For now, `@IsString()` is sufficient.

#### Step 6: Implementing the `create` Function in `UserService`

This step involves injecting the `UserRepository` and implementing the logic to save a new user, ensuring the `before insert` trigger runs.

1.  **Inject `UserRepository`**:
    *   In `src/user/user.service.ts`, create a constructor and inject the `User` entity's repository.

    ```typescript
    // src/user/user.service.ts
    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { User } from '../entities/user.entity'; // Adjust path if needed
    import { CreateUserDto } from './dto/create-user.dto';

    @Injectable()
    export class UserService {
        constructor(
            @InjectRepository(User) // Injects the User entity's repository
            private userRepo: Repository<User>,
        ) {}

        // ... other service methods
    }
    ```

2.  **Implement the `create` Method**:
    *   Define an `async` `create` method that takes `CreateUserDto` as an argument.
    *   **Crucially, use `this.userRepo.create()` first, then `this.userRepo.save()`**.

    ```typescript
    // src/user/user.service.ts (continuation)
    // ... imports and constructor ...

    @Injectable()
    export class UserService {
        constructor(
            @InjectRepository(User)
            private userRepo: Repository<User>,
        ) {}

        async create(createUserDto: CreateUserDto): Promise<User> {
            // IMPORTANT: First, create the user object.
            // This line does NOT insert into the database yet; it just prepares the object.
            // This step is ESSENTIAL for the @BeforeInsert trigger to be executed.
            const user = this.userRepo.create(createUserDto);

            // Then, save the created user object to the database.
            // This operation will trigger the @BeforeInsert hook in the User entity.
            return await this.userRepo.save(user);
        }
    }
    ```

    *   **Why `create()` then `save()` is vital**:
        *   Directly calling `this.userRepo.save(createUserDto)` would bypass the `@BeforeInsert()` trigger, resulting in the plain password being saved in the database.
        *   By calling `this.userRepo.create(createUserDto)` first, you create a TypeORM entity object. When this object is then passed to `this.userRepo.save()`, the `before insert` trigger associated with the `User` entity is executed, ensuring the password is hashed.

#### Step 7: Registering the User Repository in `UserModule`

To make the `UserRepository` available for injection, you need to register the `User` entity in the `UserModule`.

1.  **Modify `user.module.ts`**:
    *   Import `TypeOrmModule` and the `User` entity.
    *   Add `TypeOrmModule.forFeature([User])` to the `imports` array.

    ```typescript
    // src/user/user.module.ts
    import { Module } from '@nestjs/common';
    import { UserService } from './user.service';
    import { UserController } from './user.controller';
    import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
    import { User } from '../entities/user.entity'; // Import User entity (adjust path if needed)

    @Module({
        imports: [
            TypeOrmModule.forFeature([User]), // Register the User entity for this module
        ],
        controllers: [UserController],
        providers: [UserService],
    })
    export class UserModule {}
    ```

#### Step 8: Important Considerations for Existing Records

If you are adding the `password` column to a `User` table that already contains existing records, you might encounter an error.

1.  **Handling Existing Data**:
    *   When you add a new `password` column, existing records will have a `null` value for this new column.
    *   If your `password` column is defined as `NOT NULL` (which it typically should be for security), this will cause an error.
    *   **Solution**: Either define a **`default` value** for the `password` column in your entity, or temporarily set `nullable: true` during the migration process, and then update existing records with placeholder hashed passwords.

#### Step 9: Testing the Implementation

After setting up everything, you can test the functionality using an API client like Insomnia.

1.  **Send a POST Request**:
    *   Send a `POST` request to the `/user` endpoint (which maps to `UserController.create()`).
    *   Provide a request body matching `CreateUserDto` with a plain password (e.g., `password: "123"`).

    ```json
    // Example POST request body to /user
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "123"
    }
    ```

2.  **Verify Hashed Password**:
    *   Upon a successful request, when you inspect the database record for the newly created user, you will observe that the `password` field contains a **hashed string** instead of the plain "123". This confirms that the `@BeforeInsert()` trigger has successfully run and hashed the password.

3.  **Reinforcement of `create()` then `save()`**:
    *   The video reiterates that if you were to bypass the `create()` function and directly call `this.userRepo.save(createUserDto)`, the plain password "123" would be saved in the database, demonstrating that the trigger was not executed. This highlights the critical importance of the `create()` followed by `save()` pattern when using TypeORM triggers.

***

This detailed breakdown covers all the essential steps and concepts from the video, ensuring a robust understanding of implementing password hashing with TypeORM triggers in NestJS.
