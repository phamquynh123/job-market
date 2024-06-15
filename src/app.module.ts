import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScraperModule } from './modules/scrapers/scraper.module';

@Module({
	imports: [ConfigModule.forRoot(), ScraperModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
