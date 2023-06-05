import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../../backend/src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile(); // Only compile. Integration
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      }));
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.cleandb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => { });

    describe('Signin', () => { });

  });

  describe('User', () => {
    describe('Get me', () => { });

    describe('Edit user', () => { });

  });

  describe('Product', () => {
    describe('Create product', () => { });

    describe('Get product', () => { });

    describe('Get product by id', () => { });

    describe('Edit product', () => { });

    describe('Delete product', () => { });

  });

  describe('Category', () => {
    describe('Create category', () => { });

    describe('Get category', () => { });

    describe('Get category by id', () => { });

    describe('Edit category', () => { });

    describe('Delete category', () => { });

  });

  it.todo('should pass');
})