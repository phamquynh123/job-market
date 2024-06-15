import { Controller, Post } from '@nestjs/common';
import { ZippiaService } from './zippia.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Scrapper')
@Controller({
	path: 'auth',
	version: '1',
})
export class ScaperController {
	constructor(private zippiaService: ZippiaService) {}

	@Post('zippia-career')
	@ApiOperation({
		summary: 'Zipia-career',
	})
	zippiaCareer() {
		return this.zippiaService.getCareerData();
	}

	@Post('zippia-industry')
	@ApiOperation({
		summary: 'Zipia-industry',
	})
	zippiaIndustry() {
		return this.zippiaService.getzippiaIndustry();
	}

	@Post('zippia-detail-industry')
	@ApiOperation({
		summary: 'Zipia-detail-industry',
	})
	zippiaDetailIndustry() {
		return this.zippiaService.getzippiaDetailIndustry();
	}
}
