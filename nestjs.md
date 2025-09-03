# Nestjs

# Table of Contents

## NestJS

- [1. Getting Started with NestJS](#1-getting-started-with-nestjs)
  - [Generating Modules, Controllers, Services](#generating-modules-controllers-services)

- [2. Connecting to Databases](#2-connecting-to-databases)
  - [PostgreSQL Integration (TypeORM)](#postgresql-integration-typeorm)
  - [MongoDB Integration (Mongoose)](#mongodb-integration-mongoose)

- [3. Using DTOs and Validation](#3-using-dtos-and-validation)
  - [What is a DTO?](#what-is-a-dto)
  - [DTOs vs Entities](#dtos-vs-entities)
  - [Create, Update, and Response DTOs](#create-update-and-response-dtos)

- [4. Swagger API Documentation](#4-swagger-api-documentation)
  - [Setting Up Swagger](#setting-up-swagger)
  - [Generating API Docs from DTOs](#generating-api-docs-from-dtos)
  - [Swagger Authorization Integration](#swagger-authorization-integration)

- [5. Authentication & Authorization](#5-authentication--authorization)
  - [JWT Authentication](#jwt-authentication)
  - [Protecting Routes with Guards](#protecting-routes-with-guards)
  - [Swagger + JWT Integration](#swagger--jwt-integration)

- [6. Advanced Topics](#6-advanced-topics)
  - [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
  - [Refresh Tokens & Token Rotation](#refresh-tokens--token-rotation)
  - [Dynamic DTO Generation](#dynamic-dto-generation)





---

### 1. `nest g module users`

**Expands to:** `nest generate module users`

* **What it does:** Creates a new **module** called `UsersModule` in a `users/` directory.
* **Purpose:** Modules in NestJS are used to organize your application into cohesive blocks of functionality. The `UsersModule` will encapsulate all user-related features.

**Generates:**

```
src/users/users.module.ts
```

---

### 2. `nest g controller users`

**Expands to:** `nest generate controller users`

* **What it does:** Creates a new **controller** called `UsersController` in the `users/` directory.
* **Purpose:** Controllers handle incoming HTTP requests and return responses. `UsersController` will define routes like `/users`.

**Generates:**

```
src/users/users.controller.ts
```

---

### 3. `nest g service users`

**Expands to:** `nest generate service users`

* **What it does:** Creates a new **service** called `UsersService` in the `users/` directory.
* **Purpose:** Services handle business logic and data retrieval. `UsersService` might handle tasks like getting users from a database.

**Generates:**

```
src/users/users.service.ts
```

---

### Summary

Together, these commands set up a basic structure for a user-related feature:

```
src/users/
├── users.module.ts       <-- Module
├── users.controller.ts   <-- Handles HTTP routes (e.g., GET /users)
└── users.service.ts      <-- Contains business logic (e.g., fetch users)
```

This is a typical pattern in NestJS: **module + controller + service** for each domain or feature area (like users, posts, etc.).

--- 

Great! Here's a simple example of how a **NestJS module**, **controller**, and **service** work together using the `users` feature.

---

## How they work togather : 

**🛠 Files Created:**

We'll walk through how these three parts are wired:

```
src/users/
├── users.module.ts
├── users.controller.ts
└── users.service.ts
```

---

### 1. `users.service.ts`

This file handles the business logic.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }
}
```

---

### 2. `users.controller.ts`

This handles incoming HTTP requests and uses the service to respond.

```ts
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // base route: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll(); // GET /users
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findOne(Number(id)); // GET /users/1
  }
}
```

---

### 3. `users.module.ts`

This file connects the controller and service.

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

### 🔄 How It All Works Together

1. The `UsersModule` registers the `UsersController` and `UsersService`.
2. A request to `/users` is handled by `UsersController.getAllUsers()`.
3. That controller method calls `UsersService.findAll()` to get the data.
4. The response is returned to the client.

---

### 🧪 Example Requests

* `GET /users`
  → Returns:

  ```json
  [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
  ```

* `GET /users/2`
  → Returns:

  ```json
  { "id": 2, "name": "Bob" }
  ```

---

## Connecting with DB, Example of DTOs and Validation

Absolutely! Let’s build out two full examples in **NestJS** showing how the `users` module can be connected to real databases—first with **PostgreSQL using TypeORM**, then with **MongoDB using Mongoose**—and include **DTOs with validation**.

---

### 1. PostgreSQL Setup (TypeORM)

### Dependencies

Install TypeORM and validation packages:

```bash
npm install @nestjs/typeorm typeorm pg
npm install class-validator class-transformer
```

### User Entity & DTO

```ts
// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;
}
```

```ts
// src/users/create-user.dto.ts
import {
  IsString, IsEmail,
  IsInt, Min, IsNotEmpty
} from 'class-validator';

export class CreateUserDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsEmail() @IsNotEmpty()
  email: string;

  @IsInt() @Min(0)
  age: number;
}
```

([Medium][1])

### Users Service

```ts
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  create(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }
}
```

### Users Controller

```ts
// src/users/users.controller.ts
import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
```

### Users Module

```ts
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```

([Medium][2])

### App Module & Validation

```ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_user',
      password: 'your_password',
      database: 'your_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
```

([NestJS Documentation][3], [Medium][1])

---

### 2. MongoDB Setup (Mongoose)

### Dependencies

```bash
npm install @nestjs/mongoose mongoose
npm install class-validator class-transformer
```

### Mongoose Schema & DTO

```ts
// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

```ts
// src/users/create-user.dto.ts
import { IsString, IsEmail, IsInt, Min, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;
}
```

### Users Service

```ts
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  create(dto: CreateUserDto) {
    const user = new this.userModel(dto);
    return user.save();
  }
}
```

### Users Controller & Module

```ts
// src/users/users.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
```

```ts
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```

### App Module & Validation

```ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydb'),
    UsersModule,
  ],
})
export class AppModule {}
```

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
```

([Teguh Arief Blog][4])

---

### Summary Table

| Stack                | User Entity/Schema | DTO + Validation              | Module + Service + Controller | Database Connection |
| -------------------- | ------------------ | ----------------------------- | ----------------------------- | ------------------- |
| PostgreSQL (TypeORM) | `User` entity      | `CreateUserDto` w/ decorators | UsersModule                   | TypeORM config      |
| MongoDB (Mongoose)   | `User` schema      | `CreateUserDto` w/ decorators | UsersModule                   | Mongoose config     |

---

### Wrap-Up

Both examples integrate DTO validation (using `class-validator`) and connect controllers to services that talk to either PostgreSQL or MongoDB. The request validation is handled automatically via `ValidationPipe`.

Want to extend with features like authentication, DTO updates (`PartialType`), or custom validation logic? I'm happy to dive deeper!

--- 

## authentication, DTO updates, or custom validation logic

Absolutely! Let’s dive into NestJS with three advanced features: **authentication (JWT + Passport)**, **DTO update patterns**, and **custom validation logic**.

---

### 1. Authentication with JWT and Passport

### Setup & Dependencies

```bash
npm install @nestjs/passport passport passport-jwt @nestjs/jwt bcryptjs
npm install class-validator class-transformer
```

([FreeCodeCamp][1], [Syskool][2])

### DTOs

```ts
export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;
}
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
```

([DEV Community][3])

### Auth Module Configuration

```ts
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: process.env.JWT_SECRET, signOptions: { expiresIn: '1h' } }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
```

([FreeCodeCamp][1], [NestJS Documentation][4])

### Auth Service

```ts
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signup(dto: SignupDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({ email: dto.email, password: hashed });
    return { access_token: this.jwtService.sign({ sub: user.id, email: user.email }) };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
```

([Syskool][2], [NestJS Documentation][4])

### Auth Controller with Guard

```ts
@Controller('auth')
export class AuthController {
  @Post('signup') signup(@Body() dto: SignupDto) { return this.authService.signup(dto); }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) { return req.user; }
}
```

([Syskool][2], [NestJS Documentation][4])

### Summary

This setup lets you:

* **Signup** users with hashed passwords
* **Login** with validation and JWT issuance
* **Protect routes** using JWT-based Passport guard

---

### 2. DTO Updates with `PartialType`

When updating records, not all fields may be provided. Use `PartialType` to make all DTO fields optional based on a base `CreateDto`:

```ts
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

([NestJS Documentation][5])

Then use in controller:

```ts
@Put(':id')
update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
  return this.usersService.update(id, dto);
}
```

Allows flexible, safe updates without repeating validation decorators.

---

### 3. Custom Validation Logic

### Custom Pipe Example (UUID validator)

```ts
@Injectable()
export class ParseUUIDPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    const uuidRegex = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) throw new BadRequestException('Invalid UUID');
    return value;
  }
}
```

You can apply it in routes:

```ts
@Get(':id')
findOne(@Param('id', ParseUUIDPipe) id: string) { /* ... */ }
```

([Medium][6])

### Custom Validator Decorator

For more specific validation logic:

```ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isValidPrice' })
export class IsValidPriceConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    const decimals = value.toString().split('.')[1]?.length ?? 0;
    return value >= 0 && decimals <= 2;
  }
}

export function IsValidPrice(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isValidPrice',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsValidPriceConstraint,
    });
  };
}
```

Use it in DTOs:

```ts
@IsValidPrice({ message: 'Price must be non-negative with max 2 decimals' })
price: number;
```

([Reddit][7])

---

## Quick Recap Table

| Feature                       | What It Does                                                  |
| ----------------------------- | ------------------------------------------------------------- |
| JWT Authentication            | Secures routes, issues tokens, signup & login with validation |
| `PartialType` for Update DTOs | Allows partial updates with validation without boilerplate    |
| Custom Validation Logic       | Validates UUIDs or business constraints via custom logic      |

---

## advanced topics like role-based access control, refresh tokens, and dynamic DTO generation

Here’s a detailed overview of **advanced NestJS patterns**—covering **role-based access control (RBAC)**, **refresh token flows**, and **dynamic DTO generation**—with concrete code examples and best practices.

---

### 1. Role-Based Access Control (RBAC)

### Using decorators and guards

**Step 1: Define roles and decorator**

```ts
// role.enum.ts
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
```

**Step 2: Create a RolesGuard**

```ts
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.get<Role[]>('roles', ctx.getHandler());
    if (!required) return true;

    const { user } = ctx.switchToHttp().getRequest();
    return required.some(role => user.roles?.includes(role));
  }
}
```

This is directly aligned with NestJS patterns for guards and metadata-based authorization. ([NestJS Documentation][1], [Wanago][2], [Medium][3])

**Step 3: Apply to routes**

```ts
// users.controller.ts
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
```

### Database-driven permissions (fine-grained)

Instead of simple roles, you can assign **permissions** in your DB and include them in JWT:

* Decorator:

  ```ts
  export const Permissions = (...perms: string[]) => SetMetadata('permissions', perms);
  ```
* Guard fetches permissions from metadata and JWT payload.
  This approach is scalable and avoids hardcoded logic. ([Medium][4])

---

### 2. Refresh Tokens with Rotation & Blacklisting

### Why rotate tokens?

To enhance security, rotation invalidates reuse of refresh tokens and allows token revocation.

### Core flow using TypeORM or DB

**JWT Strategies**

```ts
// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(...) { super({ /* access token options */ }); }
  validate(payload: any) { /* return user */ }
}

// jwt-refresh.strategy.ts
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(...) { super({ /* refresh token options */ }); }
  validate(payload: any) {
    return { user: userData, refreshTokenExpiresAt: new Date(payload.exp * 1000) };
  }
}
```


**Token service with rotation**

```ts
// auth-refresh-token.service.ts
@Injectable()
export class AuthRefreshTokenService {
  async generateRefreshToken(userId: number, currToken?: string, currExp?: Date) {
    const newToken = this.jwtService.sign({ sub: userId }, { secret: ..., expiresIn: '30d' });
    if (currToken && currExp) {
      if (await this.isBlacklisted(currToken, userId)) throw new UnauthorizedException();
      await this.repository.insert({ refreshToken: currToken, expiresAt: currExp, userId });
    }
    return newToken;
  }

  async generateTokenPair(user: User, currToken?: string, currExp?: Date) {
    return {
      access_token: this.jwtService.sign({ sub: user.id }),
      refresh_token: await this.generateRefreshToken(user.id, currToken, currExp),
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  clearExpired() {
    this.repository.delete({ expiresAt: LessThanOrEqual(new Date()) });
  }
}
```

([Rabbit Byte Club][5], [DEV Community][6])

**Controller endpoints**

```ts
@Post('login')
@UseGuards(LocalAuthGuard)
login(@Req() req) {
  return this.authService.login(req.user);
}

@Post('refresh-tokens')
@UseGuards(JwtRefreshAuthGuard)
refresh(@Req() req) {
  return this.authRefreshTokenService.generateTokenPair(
    req.user.attributes, req.headers.authorization.split(' ')[1], req.user.refreshTokenExpiresAt
  );
}
```

([Rabbit Byte Club][5], [DEV Community][6])

---

### 3. Dynamic DTO Generation

### Use `PartialType` for updates

```ts
import { PartialType } from '@nestjs/mapped-types';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

All properties in `CreateUserDto` now optional in updates. ([NestJS Documentation][7])

### Dynamic DTOs via Generics or Mapped Types

* **OmitType**: exclude fields for specific operations.

```ts
export class PublicUserDto extends OmitType(UserEntity, ['password']) {}
```

* **Mapped DTOs (manual transformations)**:

```ts
function DynamicDto<T>(cls: Type<T>): Type<Partial<T>> {
  class DtoClass {}
  // reflect fields from `cls` and apply decorators
  return DtoClass as any;
}
```

Useful for auto-generating DTOs from models—especially for media-heavy or evolving schemas.

---

### Summary Table

| Feature                    | Purpose                                            |
| -------------------------- | -------------------------------------------------- |
| **RBAC with Guards**       | Secure routes based on role or permission metadata |
| **Refresh Token Rotation** | Enhanced token security and revocation             |
| **Dynamic DTO Generation** | Streamline DTO maintenance and reduce duplication  |

---

In short:

* **RBAC** enables scalable route-level security.
* **JWT with refresh rotation** provides robust authentication flow.
* **Dynamic DTO patterns** reduce repetitive validation logic.

--- 

## What does DTO mean?

Great question!

---

### 🧾 What does **DTO** mean?

**DTO** stands for **Data Transfer Object**.

It’s a **design pattern** used to define the **shape and structure of data** that is **sent or received**—especially between:

* Client ↔️ Server
* Controller ↔️ Service
* Application ↔️ Database (sometimes)

---

### 💡 Why Use DTOs?

DTOs help to:

* ✅ **Validate** input data (e.g. user input from forms or API calls)
* ✅ **Sanitize**/filter unwanted properties
* ✅ **Control** what is exposed (e.g. hiding `password` field in a response)
* ✅ **Document** the expected shape of data
* ✅ **Maintain consistency** across your code

---

### 📦 Example in NestJS

```ts
// create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

This DTO is used in the controller like this:

```ts
@Post('signup')
create(@Body() createUserDto: CreateUserDto) {
  return this.authService.signup(createUserDto);
}
```

---

### 🧯 Without a DTO? You risk:

* Accepting unwanted fields (`isAdmin: true`)
* Missing validation
* Making your API harder to maintain

---

### ✅ Summary

| Term    | Means                | Used for                                   |
| ------- | -------------------- | ------------------------------------------ |
| **DTO** | Data Transfer Object | Structuring, validating, and securing data |

It's like a **contract** that says: “This is what valid data must look like.”

---

## how DTOs relate to your DB models or API responses!

Let’s break this down clearly with examples showing how **DTOs relate to database models (entities)** and how they shape **API responses** in a NestJS project.

---

### 🧱 1. **Database Model (Entity)**

This represents how your data is stored in the database. Let’s say you're building a `User` system.

```ts
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;
}
```

* This is your **DB model**, tightly coupled with your database schema.
* It often contains sensitive or internal data (like `password`).

---

### 🧾 2. **DTOs (Data Transfer Objects)**

DTOs help **structure the data** sent to and from the API. You typically have different DTOs for:

### ✏️ A. **Creating a User**

```ts
// create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

* This DTO is used to **validate user input** during registration.
* You might not allow users to set `role` when signing up—so it’s not included.

---

### 🛠️ B. **Updating a User**

```ts
// update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

* Makes all fields optional for PATCH/PUT operations.
* Saves you from rewriting validation logic.

---

### 📤 C. **Responding with a User (No password!)**

```ts
// user-response.dto.ts
import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
```

You can now return a sanitized response like this:

```ts
// users.service.ts
import { plainToClass } from 'class-transformer';

const user = await this.userRepo.findOneBy({ id: 1 });
return plainToClass(UserResponseDto, user, { excludeExtraneousValues: true });
```

---

### 🔁 3. **Full Flow Example**

### ✅ User sends POST `/users` request:

```json
{
  "email": "test@example.com",
  "password": "Secret123"
}
```

* ✨ Validated by `CreateUserDto`
* 💾 Saved to DB as a `User` entity

---

### 📤 API returns:

```json
{
  "id": 1,
  "email": "test@example.com",
  "role": "user"
}
```

* 👀 Generated using `UserResponseDto` — excludes sensitive data like `password`

---

### 🧠 Summary: How DTOs relate to DB & API

| Concern      | Uses        | Example                       |
| ------------ | ----------- | ----------------------------- |
| DB Model     | DB storage  | `User` entity                 |
| Create DTO   | Input data  | `CreateUserDto`               |
| Update DTO   | Patch/PUT   | `UpdateUserDto`               |
| Response DTO | Output data | `UserResponseDto` (sanitized) |

Using this pattern helps you **separate concerns**, **enforce validation**, and **secure your API**.

---

Would you like a real-world example with NestJS + Swagger (for API docs)?

## What is Swagger ?

**Swagger** is a set of tools for **designing, building, documenting, and consuming RESTful web services**. It helps developers create APIs that are easy to understand and interact with—both for machines and humans.

Here’s a breakdown of **what Swagger does**:

---

### 🔹 1. **API Documentation**

Swagger automatically generates interactive and user-friendly documentation from your API code or definitions. This makes it easy for others (developers, testers, third-party integrators) to understand and use your API.

✅ Example: It turns your API into a live interface where users can try out endpoints directly from the browser.

---

### 🔹 2. **API Design & Specification**

Swagger uses a standard format called **OpenAPI Specification (OAS)** to define your API.

* You can write your API structure in a `.yaml` or `.json` file.
* This specification includes endpoints, request types, responses, parameters, authentication, etc.

✅ Tools like **Swagger Editor** help you design your API visually or by editing the spec directly.

---

### 🔹 3. **Code Generation**

Swagger can generate:

* **Server stubs** in multiple programming languages (e.g., Node.js, Java, Python)
* **Client SDKs** to call the API from various languages
* Helps speed up development by reducing boilerplate

✅ Tool: **Swagger Codegen** or **OpenAPI Generator**

---

### 🔹 4. **Interactive Testing**

With **Swagger UI**, you get a web-based UI to:

* See available endpoints
* Try them out with real parameters
* View request/response payloads and headers

✅ Great for testing and onboarding developers.

---

### 🔹 5. **Validation & Mocking**

You can validate whether your actual API matches the specification. Some tools even allow **mocking APIs** for testing before the backend is built.

---

### Common Swagger Tools:

| Tool                | Purpose                                |
| ------------------- | -------------------------------------- |
| **Swagger UI**      | Interactive API documentation          |
| **Swagger Editor**  | Design and edit OpenAPI specs          |
| **Swagger Codegen** | Generate client/server code            |
| **SwaggerHub**      | Collaborative API development platform |

---

### TL;DR

**Swagger** makes working with APIs easier, more consistent, and more developer-friendly by providing:

* 🔍 Clear documentation
* 🛠️ Design tools
* ⚙️ Code generation
* 🧪 Testing capabilities

---

## Example of Swagger 

Sure! Here's a **basic example** of a **Swagger/OpenAPI specification** written in YAML. This defines a simple API for managing books in a library.

---

### 📘 **Swagger/OpenAPI Example (YAML)**

```yaml
openapi: 3.0.0
info:
  title: Library API
  description: API for managing books in a library
  version: 1.0.0

servers:
  - url: https://api.example.com/v1

paths:
  /books:
    get:
      summary: Get all books
      responses:
        '200':
          description: A list of books
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Book'
    post:
      summary: Add a new book
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Book'
      responses:
        '201':
          description: Book added successfully

  /books/{id}:
    get:
      summary: Get a single book by ID
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Book details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found

components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        author:
          type: string
        publishedDate:
          type: string
          format: date
```

---

### 🔍 What This Defines:

* **GET /books**: Get all books.
* **POST /books**: Add a new book.
* **GET /books/{id}**: Get a specific book by ID.
* **Book Schema**: Describes the structure of a book (id, title, author, publishedDate).

---

### 🔧 You Can Try This With:

* [**Swagger Editor**](https://editor.swagger.io/) (Paste this YAML to see it in action)
* Swagger UI (renders it as an interactive API)



---
## A real world example with NestJs + Swagger

Absolutely! Here's a **real-world example** of using **NestJS + Swagger** to automatically generate beautiful, interactive **API documentation**—complete with DTOs, validation, and sanitization.

---

### ✅ Overview

We’ll create a simple **User API** with:

* `POST /users` → create a new user
* `GET /users` → get all users
* Swagger UI with auto-generated docs from DTOs

---

### 🔧 Step 1: Install Swagger Dependencies

```bash
npm install @nestjs/swagger swagger-ui-express
```

---

### 🏗️ Step 2: Setup Swagger in `main.ts`

```ts
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('User management API with Swagger docs')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI at /api

  await app.listen(3000);
}
bootstrap();
```

---

### 📦 Step 3: Create User DTOs

```ts
// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Secret123' })
  @IsString()
  @MinLength(6)
  password: string;
}
```

```ts
// src/users/dto/user-response.dto.ts
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
```

---

### 📁 Step 4: Create Entity (mocked for this demo)

```ts
// src/users/entities/user.entity.ts
export class User {
  id: number;
  email: string;
  password: string;
  role: string;
}
```

---

### ⚙️ Step 5: Create Controller

```ts
// src/users/users.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private users = []; // in-memory users for demo

  @Post()
  @ApiResponse({ status: 201, description: 'User created', type: UserResponseDto })
  create(@Body() dto: CreateUserDto): UserResponseDto {
    const newUser = {
      id: this.users.length + 1,
      email: dto.email,
      password: dto.password,
      role: 'user',
    };
    this.users.push(newUser);
    return plainToClass(UserResponseDto, newUser, { excludeExtraneousValues: true });
  }

  @Get()
  @ApiResponse({ status: 200, type: [UserResponseDto] })
  findAll(): UserResponseDto[] {
    return this.users.map(user =>
      plainToClass(UserResponseDto, user, { excludeExtraneousValues: true })
    );
  }
}
```

---

### 🧩 Step 6: Module

```ts
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
```

```ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

---

### 🚀 Step 7: Run & Test

```bash
npm run start
```

Then open:

👉 [http://localhost:3000/api](http://localhost:3000/api)

You’ll see your full **interactive Swagger UI**, with:

* Example requests and responses
* Validation rules from your DTOs
* Return types automatically documented

---

### ✅ Summary

| Layer         | Tool Used                             | Purpose                              |
| ------------- | ------------------------------------- | ------------------------------------ |
| DTOs          | `class-validator` + `@nestjs/swagger` | Validate input and generate docs     |
| API Docs      | `SwaggerModule`                       | Visual interface for your API        |
| Response DTOs | `class-transformer`                   | Hide sensitive fields like passwords |

---

## Integration with db like PostgreSQL and mongodb in the same swagger document

Great — let's integrate both **PostgreSQL** and **MongoDB** in a real-world **NestJS project** with full Swagger documentation support.

---

### 🎯 Goal

We’ll build a NestJS app that:

✅ Uses **PostgreSQL** for `User` entities
✅ Uses **MongoDB** for `Product` entities
✅ Shows both APIs in a **single Swagger document** (`/api`)

---

### 🧱 1. Install Required Packages

### ✅ TypeORM + PostgreSQL

```bash
npm install @nestjs/typeorm typeorm pg
```

### ✅ Mongoose + MongoDB

```bash
npm install @nestjs/mongoose mongoose
```

### ✅ Validation & Swagger

```bash
npm install class-validator class-transformer @nestjs/swagger swagger-ui-express
```

---

### 🧩 2. App Module Setup

```ts
// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    // PostgreSQL connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nest_demo',
      autoLoadEntities: true,
      synchronize: true,
    }),

    // MongoDB connection
    MongooseModule.forRoot('mongodb://localhost/nest_demo'),

    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
```

---

### 👤 3. PostgreSQL: Users Module

### Entity

```ts
// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
```

### DTOs

```ts
// src/users/dto/create-user.dto.ts
import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
```

### Service & Controller

```ts
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }
}
```

```ts
// src/users/users.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users (PostgreSQL)')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
```

### Module

```ts
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

---

### 📦 4. MongoDB: Products Module

### Schema

```ts
// src/products/schemas/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
```

### DTO

```ts
// src/products/dto/create-product.dto.ts
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}
```

### Service & Controller

```ts
// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  create(dto: CreateProductDto) {
    const product = new this.model(dto);
    return product.save();
  }

  findAll() {
    return this.model.find().exec();
  }
}
```

```ts
// src/products/products.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products (MongoDB)')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
```

### Module

```ts
// src/products/products.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

---

### 🧾 5. Final Swagger Setup

Already added in `main.ts`:

```ts
const config = new DocumentBuilder()
  .setTitle('Demo API')
  .setDescription('PostgreSQL + MongoDB + Swagger')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

---

### ✅ Result

### 🧪 Visit:

**[http://localhost:3000/api](http://localhost:3000/api)**

You will see two grouped sections in Swagger UI:

* 🔵 **Users (PostgreSQL)**
* 🟢 **Products (MongoDB)**

Each with their own endpoints, DTO-based validation, and response schemas!

---

### ⚡ Summary

| Feature          | PostgreSQL                              | MongoDB              |
| ---------------- | --------------------------------------- | -------------------- |
| ORM/ODM          | TypeORM                                 | Mongoose             |
| DB Model         | Entity (`@Entity`)                      | Schema (`@Schema`)   |
| DTO              | Shared validation via `class-validator` |                      |
| Swagger Grouping | `@ApiTags()`                            | `@ApiTags()`         |
| Docs UI          | Swagger at `/api`                       | Combines both models |

---

## Swagger authorization integration

Absolutely! Let’s walk through a **real-world example of Swagger authorization integration** in a NestJS project — specifically using **JWT Bearer Tokens**.

---

### 🎯 Goal

Add **JWT authentication** and expose it in the Swagger UI so you can:

* 🔐 Secure routes with JWT
* 🔓 Authenticate via the Swagger "Authorize" button

---

### ✅ Final Result Preview

In the Swagger UI (`/api`), you’ll get a 🔒 **Authorize** button that lets you paste a JWT like:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Then, protected routes will work directly from the docs.

---

### 🧩 Step-by-Step Integration

---

### 1. ✅ Install JWT Dependencies

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
```

---

### 2. 🏗️ Setup JWT Auth Module

```ts
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret', // Use env var in real apps
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
```

---

### 3. 🔐 JWT Strategy

```ts
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'super-secret',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
```

---

### 4. 🔑 AuthService & Login Controller

```ts
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

```ts
// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    // Dummy user for example
    const user = { id: 1, email: body.email, role: 'admin' };
    return this.authService.login(user);
  }
}
```

---

### 5. 🔒 Protect Other Routes with `@UseGuards`

```ts
// src/users/users.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users (Protected)')
@ApiBearerAuth() // 👈 Tells Swagger to add auth to this group
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProtectedUsers() {
    return [{ id: 1, email: 'secure@example.com' }];
  }
}
```

```ts
// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

---

### 6. 🧾 Update Swagger Setup in `main.ts`

```ts
// src/main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Demo API')
  .setDescription('Includes JWT auth')
  .setVersion('1.0')
  .addBearerAuth() // 👈 Enables the "Authorize" button
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

---

### 🔐 Swagger UI Experience

Once you're running your app and visit:

👉 `http://localhost:3000/api`

You’ll see:

* An 🔒 "Authorize" button
* Under protected routes (`Users`), a lock icon 🔒
* After logging in (via `/auth/login`), paste the JWT token:

  ```
  Bearer eyJhbGciOiJIUzI1NiIsInR...
  ```

All subsequent requests in Swagger will include that token automatically in the `Authorization` header.

---

### ✅ Summary

| Feature                    | Purpose                               |
| -------------------------- | ------------------------------------- |
| `@ApiBearerAuth()`         | Adds lock icon + JWT input in Swagger |
| `.addBearerAuth()`         | Globally enables Swagger auth button  |
| `@UseGuards(JwtAuthGuard)` | Protects routes using JWT strategy    |

---

### Swagger YML example
```yml

openapi: 3.0.0
info:
  title: Library API
  description: API for managing books in a library
  version: 1.0.0

servers:
  - url: https://api.example.com/v1

paths:
  /books:
    get:
      summary: Get all books
      responses:
        '200':
          description: A list of books
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Book'
    post:
      summary: Add a new book
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Book'
      responses:
        '201':
          description: Book added successfully

  /books/{id}:
    get:
      summary: Get a single book by ID
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Book details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book'
        '404':
          description: Book not found

components:
  schemas:
    Book:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        author:
          type: string
        publishedDate:
          type: string
          format: date

```

