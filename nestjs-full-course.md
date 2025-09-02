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