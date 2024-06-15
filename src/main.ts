require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as httpContext from 'express-http-context';
import { ConfigService } from '@nestjs/config';
import {  ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.enableCors();
	const appPort = process.env.APP_PORT;
	app.use(httpContext.middleware);
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	const configSwagger = new DocumentBuilder()
		.setTitle('Job market API')
		.setDescription('Job market API description')
		.setVersion('1.0')
		.addTag('docs')
		.build();
	const document = SwaggerModule.createDocument(app, configSwagger);
	SwaggerModule.setup('api-docs', app, document);

	await app.listen(appPort, () => {
		console.log(`${configService.get('app.name')} running on http://localhost:${appPort}`);
		console.log(`swagger: http://localhost:${appPort}/api-docs`);
	});
}

bootstrap();
