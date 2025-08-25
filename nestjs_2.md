# NestJS – Step‑by‑Step Tutorial

This hands‑on README walks you through building a production‑ready REST API with NestJS, using PostgreSQL (TypeORM) and MongoDB (Mongoose), DTOs & validation, Swagger docs, JWT authentication, RBAC, refresh tokens, and dynamic DTOs. Every section includes copy‑pasteable code.

> Prereqs: Node 18+, npm or yarn, Docker (optional but recommended), and basic TypeScript knowledge.

---

# Table of Contents

## NestJS

* [1. Getting Started with NestJS](#1-getting-started-with-nestjs)

  * [Generating Modules, Controllers, Services](#generating-modules-controllers-services)

* [2. Connecting to Databases](#2-connecting-to-databases)

  * [PostgreSQL Integration (TypeORM)](#postgresql-integration-typeorm)
  * [MongoDB Integration (Mongoose)](#mongodb-integration-mongoose)

* [3. Using DTOs and Validation](#3-using-dtos-and-validation)

  * [What is a DTO?](#what-is-a-dto)
  * [DTOs vs Entities](#dtos-vs-entities)
  * [Create, Update, and Response DTOs](#create-update-and-response-dtos)

* [4. Swagger API Documentation](#4-swagger-api-documentation)

  * [Setting Up Swagger](#setting-up-swagger)
  * [Generating API Docs from DTOs](#generating-api-docs-from-dtos)
  * [Swagger Authorization Integration](#swagger-authorization-integration)

* [5. Authentication & Authorization](#5-authentication--authorization)

  * [JWT Authentication](#jwt-authentication)
  * [Protecting Routes with Guards](#protecting-routes-with-guards)
  * [Swagger + JWT Integration](#swagger--jwt-integration)

* [6. Advanced Topics](#6-advanced-topics)

  * [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
  * [Refresh Tokens & Token Rotation](#refresh-tokens--token-rotation)
  * [Dynamic DTO Generation](#dynamic-dto-generation)

---

## Project Setup (common for all sections)

```bash
# 1) Create a new Nest project
npm i -g @nestjs/cli
nest new nest-starter
cd nest-starter

# 2) Useful dev deps
npm i -D @types/bcrypt

# 3) Environment variables
cp .env.example .env  # create .env from the template below
```

**.env.example**

```ini
# App
PORT=3000
NODE_ENV=development

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB=nestdb

# MongoDB
MONGO_URI=mongodb://localhost:27017/nestdb

# Auth
JWT_ACCESS_SECRET=supersecretaccess
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_SECRET=supersecretrefresh
JWT_REFRESH_EXPIRES=7d
BCRYPT_SALT_ROUNDS=10
```

**src/main.ts** – Global pipes, Swagger (wired later), and bootstrap.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
```

---

## 1. Getting Started with NestJS

Create an application and understand the basic building blocks: **Module**, **Controller**, **Service**.

### Generating Modules, Controllers, Services

```bash
# Generate a feature (Users) with module/controller/service
nest g module users
nest g controller users --no-spec
nest g service users --no-spec

# Generate a resource (Books) scaffold (CRUD controller + service + DTOs)
nest g resource books --no-spec --type rest
# Follow prompts: choose REST API, yes for CRUD endpoints
```

**src/users/users.module.ts**

```ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

**src/users/users.service.ts** (in‑memory to start)

```ts
import { Injectable } from '@nestjs/common';

export type User = { id: number; email: string; password?: string; name: string; roles: ('user'|'admin')[] };

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, email: 'admin@example.com', password: 'changeme', name: 'Admin', roles: ['admin'] },
  ];

  findByEmail(email: string) { return this.users.find(u => u.email === email); }
  findById(id: number) { return this.users.find(u => u.id === id); }
}
```

**src/users/users.controller.ts**

```ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const { password, ...rest } = this.usersService.findById(id) || {} as any;
    return rest;
  }
}
```

Run the app:

```bash
npm run start:dev
# GET http://localhost:3000/api/users/1
```

---

## 2. Connecting to Databases

### PostgreSQL Integration (TypeORM)

#### 2.1 Install & Configure

```bash
npm i typeorm @nestjs/typeorm pg
```

**src/app.module.ts**

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT!,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      synchronize: true, // DON'T use synchronize=true in production; use migrations.
    }),
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}
```

#### 2.2 Create an Entity & Repository

```bash
nest g module books
nest g service books --no-spec
nest g controller books --no-spec
```

**src/books/book.entity.ts**

```ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 120 })
  author: string;

  @Column('int', { default: 0 })
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

**src/books/books.module.ts**

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
```

**src/books/dto/create-book.dto.ts**

```ts
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean Architecture' })
  @IsString()
  @Length(1, 200)
  title: string;

  @ApiProperty({ example: 'Robert C. Martin' })
  @IsString()
  @Length(1, 120)
  author: string;

  @ApiProperty({ example: 2017, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  year?: number;
}
```

**src/books/dto/update-book.dto.ts**

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
```

**src/books/books.service.ts**

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

  create(dto: CreateBookDto) {
    const book = this.repo.create(dto);
    return this.repo.save(book);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const book = await this.repo.findOne({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    const book = await this.findOne(id);
    Object.assign(book, dto);
    return this.repo.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    await this.repo.remove(book);
    return { deleted: true };
  }
}
```

**src/books/books.controller.ts**

```ts
import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Book created' })
  create(@Body() dto: CreateBookDto) { return this.service.create(dto); }

  @Get()
  @ApiOkResponse({ description: 'List books' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) { return this.service.update(id, dto); }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
```

**Test quickly**

```bash
# With the app running, try:
curl -X POST http://localhost:3000/api/books -H 'Content-Type: application/json' \
  -d '{"title":"Clean Code","author":"Robert C. Martin","year":2008}'
```

#### 2.3 (Optional) Docker for Postgres

**docker-compose.yml**

```yml
version: '3.9'
services:
  postgres:
    image: postgres:16
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${PG_USER:-postgres}
      POSTGRES_PASSWORD: ${PG_PASSWORD:-postgres}
      POSTGRES_DB: ${PG_DB:-nestdb}
    ports: ["5432:5432"]
    volumes: [pgdata:/var/lib/postgresql/data]
volumes:
  pgdata:
```

Start DB: `docker compose up -d`

---

### MongoDB Integration (Mongoose)

#### 2.4 Install & Configure

```bash
npm i @nestjs/mongoose mongoose
```

**src/app.module.ts** (add Mongoose, can live alongside TypeORM)

```ts
import { MongooseModule } from '@nestjs/mongoose';
// ... inside @Module imports
MongooseModule.forRoot(process.env.MONGO_URI!),
```

Create a simple **Notes** model.

```bash
nest g module notes
nest g service notes --no-spec
nest g controller notes --no-spec
```

**src/notes/note.schema.ts**

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true, minlength: 1, maxlength: 200 })
  title: string;

  @Prop({ required: true, minlength: 1, maxlength: 2000 })
  content: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
```

**src/notes/dto/create-note.dto.ts**

```ts
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Shopping list' })
  @IsString() @Length(1, 200)
  title: string;

  @ApiProperty({ example: 'Milk, eggs, bread' })
  @IsString() @Length(1, 2000)
  content: string;
}
```

**src/notes/dto/update-note.dto.ts**

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
```

**src/notes/notes.module.ts**

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note, NoteSchema } from './note.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
```

**src/notes/notes.service.ts**

```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private model: Model<NoteDocument>) {}

  create(dto: CreateNoteDto) { return this.model.create(dto); }
  findAll() { return this.model.find().lean(); }

  async findOne(id: string) {
    const note = await this.model.findById(id).lean();
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(id: string, dto: UpdateNoteDto) {
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true }).lean();
    if (!updated) throw new NotFoundException('Note not found');
    return updated;
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException('Note not found');
    return { deleted: true };
  }
}
```

**src/notes/notes.controller.ts**

```ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Post() create(@Body() dto: CreateNoteDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateNoteDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}
```

---

## 3. Using DTOs and Validation

### What is a DTO?

A **DTO (Data Transfer Object)** is a TypeScript class that defines the shape and validation of data sent to/returned from your API. It decouples request/response shapes from persistence models.

### DTOs vs Entities

* **Entity (TypeORM)** or **Schema (Mongoose)** models how data is stored.
* **DTO** models how data flows across API boundaries (validated, sanitized, versioned).

### Create, Update, and Response DTOs

**src/users/dto/create-user.dto.ts**

```ts
import { IsEmail, IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8 })
  @IsString() @Length(8, 100)
  password: string;

  @ApiProperty({ example: 'Jane Doe', required: false })
  @IsOptional()
  @IsString() @Length(1, 80)
  name?: string;
}
```

**Update DTO using PartialType**

```ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
```

**Response DTO (hide sensitive fields)**

```ts
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty() id: number;
  @ApiProperty() email: string;
  @ApiProperty() name: string;
  @ApiProperty({ isArray: true, example: ['user'] }) roles: string[];
}
```

**Mapping Entity → DTO** (example in a controller)

```ts
// ... inside UsersController
@Get(':id')
async getOne(@Param('id') id: string): Promise<UserResponseDto> {
  const u = await this.usersService.findById(+id);
  return { id: u.id, email: u.email, name: u.name, roles: u.roles };
}
```

> The global `ValidationPipe` in `main.ts` already enforces DTO validation and strips unknown fields via `whitelist: true`.

---

## 4. Swagger API Documentation

### Setting Up Swagger

```bash
npm i @nestjs/swagger swagger-ui-express
```

**src/main.ts** (add just before `app.listen`)

```ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// ... inside bootstrap()
const config = new DocumentBuilder()
  .setTitle('Nest Starter API')
  .setDescription('API docs')
  .setVersion('1.0')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document, {
  swaggerOptions: { persistAuthorization: true },
});
```

Visit: **[http://localhost:3000/docs](http://localhost:3000/docs)**

### Generating API Docs from DTOs

Use `@ApiProperty()` on DTO fields and `@ApiTags()` / `@ApiResponse()` on controllers to have rich docs (already shown in earlier DTOs/controllers).

### Swagger Authorization Integration

`addBearerAuth()` enables the **Authorize** button. When JWT is implemented (next section), paste your access token there to authorize requests in Swagger UI.

---

## 5. Authentication & Authorization

We’ll build email/password login with **JWT access** & **refresh tokens** using Passport strategies.

```bash
npm i @nestjs/passport passport passport-local passport-jwt jsonwebtoken bcrypt
npm i -D @types/passport-local @types/passport-jwt
nest g module auth
nest g service auth --no-spec
nest g controller auth --no-spec
```

### JWT Authentication

**src/auth/auth.module.ts**

```ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
```

**src/auth/auth.service.ts**

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // For demo we compare plain; in prod hash & compare
    const ok = user.password ? await bcrypt.compare(password, await bcrypt.hash(user.password, 10)) : false;
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const { password: _, ...safe } = user as any;
    return safe;
  }

  async signAccessToken(payload: { sub: number; email: string; roles: string[] }) {
    return this.jwt.signAsync(payload);
  }
}
```

**src/auth/jwt.strategy.ts**

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: any) {
    // appended to request.user
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
```

**src/auth/jwt-auth.guard.ts**

```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

**src/auth/auth.controller.ts**

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class LoginDto { email: string; password: string }

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.auth.validateUser(dto.email, dto.password);
    const access_token = await this.auth.signAccessToken({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });
    return { access_token };
  }
}
```

> **Note:** For a real app, store **hashed** passwords, not plain. See the refresh‑token section for a complete flow.

### Protecting Routes with Guards

Protect **Books** endpoints:

**src/books/books.controller.ts** (add)

```ts
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('books')
@Controller('books')
export class BooksController { /* ... */ }
```

Now, hit `/auth/login`, copy the token, then call `/books` with `Authorization: Bearer <token>`.

### Swagger + JWT Integration

Because we added `.addBearerAuth()` and used `@UseGuards(JwtAuthGuard)`, Swagger will show a lock icon on protected routes. Click **Authorize**, paste your JWT, and try protected endpoints directly in Swagger UI.

---

## 6. Advanced Topics

### Role-Based Access Control (RBAC)

Create a `@Roles(...)` decorator and a `RolesGuard` that checks `request.user.roles` from `JwtStrategy`.

**src/auth/roles.decorator.ts**

```ts
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
```

**src/auth/roles.guard.ts**

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!required || required.length === 0) return true;
    const { user } = ctx.switchToHttp().getRequest();
    return required.some(r => user?.roles?.includes(r));
  }
}
```

**Apply to a route**

```ts
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Post()
create(@Body() dto: CreateBookDto) { return this.service.create(dto); }
```

### Refresh Tokens & Token Rotation

**Concept**

* On login, issue **access token** (short‑lived) and **refresh token** (longer‑lived).
* Store **hashed refresh token** in DB; on refresh, verify & **rotate** (invalidate old, issue new).
* Return refresh token via **HttpOnly cookie** or response body (cookie recommended).

**Install cookies**

```bash
npm i cookie-parser
```

**src/main.ts** (enable cookies)

```ts
import * as cookieParser from 'cookie-parser';
// ...
app.use(cookieParser());
```

**Sample User entity (TypeORM) with refresh token hash**

```ts
// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) email: string;
  @Column() passwordHash: string;
  @Column('text', { nullable: true }) refreshTokenHash?: string | null;
  @Column('text', { array: true, default: '{"user"}' }) roles: string[];
}
```

**Auth service (core parts)**

```ts
// src/auth/auth.service.ts (refresh flow parts)
import * as bcrypt from 'bcrypt';

async register(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS!);
  // persist user with passwordHash via UsersService/TypeORM
}

private async signTokens(payload: any) {
  const access_token = await this.jwt.signAsync(payload);
  const refresh_token = await this.jwt.signAsync(payload, {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
  });
  return { access_token, refresh_token };
}

async loginWithCredentials(email: string, password: string) {
  const user = await this.users.findByEmail(email);
  if (!user) throw new UnauthorizedException();
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new UnauthorizedException();
  const payload = { sub: user.id, email: user.email, roles: user.roles };
  const tokens = await this.signTokens(payload);
  await this.users.updateRefreshHash(user.id, await bcrypt.hash(tokens.refresh_token, 10));
  return tokens;
}

async refresh(userId: number, refreshToken: string) {
  const user = await this.users.findById(userId);
  const ok = user?.refreshTokenHash && await bcrypt.compare(refreshToken, user.refreshTokenHash);
  if (!ok) throw new UnauthorizedException('Invalid refresh token');
  const payload = { sub: user.id, email: user.email, roles: user.roles };
  const tokens = await this.signTokens(payload); // rotation
  await this.users.updateRefreshHash(user.id, await bcrypt.hash(tokens.refresh_token, 10));
  return tokens;
}

async logout(userId: number) {
  await this.users.updateRefreshHash(userId, null);
}
```

**Auth controller endpoints**

```ts
@Post('register')
async register(@Body() dto: { email: string; password: string }) {
  await this.auth.register(dto.email, dto.password);
  return { ok: true };
}

@Post('login')
async login(@Body() dto: { email: string; password: string }, @Res({ passthrough: true }) res: Response) {
  const { access_token, refresh_token } = await this.auth.loginWithCredentials(dto.email, dto.password);
  res.cookie('refresh_token', refresh_token, { httpOnly: true, sameSite: 'lax', secure: false });
  return { access_token };
}

@Post('refresh')
async refresh(@Req() req: Request) {
  const token = req.cookies['refresh_token'];
  const payload = this.jwt.decode(token) as any; // alternatively, send userId via guard
  return this.auth.refresh(payload.sub, token);
}

@Post('logout')
async logout(@Req() req: Request) {
  const token = req.cookies['refresh_token'];
  const payload = this.jwt.decode(token) as any;
  await this.auth.logout(payload.sub);
  return { ok: true };
}
```

> In production: set `secure: true` for cookies behind HTTPS.

### Dynamic DTO Generation

Use **mapped types** from `@nestjs/mapped-types` to create derived DTOs without repetition.

```ts
import { PartialType, PickType, OmitType, IntersectionType } from '@nestjs/mapped-types';

class BaseDto { id: number; createdAt: Date; updatedAt: Date; }
class BookBaseDto { title: string; author: string; year?: number; }

export class CreateBookDto2 extends OmitType(BookBaseDto, ['year'] as const) {}
export class UpdateBookDto2 extends PartialType(BookBaseDto) {}
export class BookSummaryDto extends PickType(BookBaseDto, ['title', 'author'] as const) {}
export class BookWithMetaDto extends IntersectionType(BookSummaryDto, BaseDto) {}
```

Map entities to response DTOs using a **Presenter** or **Mapper**:

```ts
export class BookMapper {
  static toSummaryDto(book: any): BookSummaryDto {
    const { title, author } = book;
    return { title, author } as BookSummaryDto;
  }
}
```

---

## Run & Test Everything

```bash
# Start databases (if using Docker)
docker compose up -d

# Start app
env $(cat .env | xargs) npm run start:dev

# Try routes
# 1) Swagger: http://localhost:3000/docs
# 2) Auth
curl -X POST http://localhost:3000/api/auth/register -H 'Content-Type: application/json' -d '{"email":"a@b.com","password":"password123"}'
curl -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email":"a@b.com","password":"password123"}'
# 3) Books (protected)
curl -H 'Authorization: Bearer <ACCESS_TOKEN>' http://localhost:3000/api/books
# 4) Notes (Mongo)
curl -X POST http://localhost:3000/api/notes -H 'Content-Type: application/json' -d '{"title":"Todo","content":"Ship feature"}'
```

---

## Troubleshooting

* **`ECONNREFUSED`** connecting to DB → Ensure Docker service is up and env vars are correct.
* **Validation errors** → Check DTO decorators and that `ValidationPipe` is enabled.
* **401 Unauthorized** → Ensure `Authorization: Bearer <token>` header is set and token not expired.
* **Swagger not loading** → Confirm `@nestjs/swagger` installed and `SwaggerModule.setup('docs', ...)` added in `main.ts`.

---

## Next Steps

* Add pagination & filtering to Books/Notes.
* Add migrations for TypeORM and disable `synchronize` in production.
* Write E2E tests with `@nestjs/testing` and `supertest`.
* Containerize the app with a multi‑stage Dockerfile.

---
