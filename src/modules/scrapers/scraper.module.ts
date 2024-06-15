import { Module } from '@nestjs/common';
import { ZippiaService } from './zippia.service';
import { ScaperController } from './scraper.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot()],
	providers: [ZippiaService],

	controllers: [ScaperController],
})
export class ScraperModule {}
