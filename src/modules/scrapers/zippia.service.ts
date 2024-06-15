import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { fetchData } from '../../ultis/helpers/fetchData';
// import careerData from '../../database/seeds/zipper-career.json';
// const path = require('path');
// const careerData = require(path.join(__dirname, '../../database/seeds/zipper-career.json'));

import * as careerData from '../../database/seeds/zipper-career.json';
import { ZIPPIA_SCRAP_TYPE } from 'src/ultis/constant';

@Injectable()
export class ZippiaService {
	constructor(private configService: ConfigService) {}

	async getCareerData() {
		const url = 'https://www.zippia.com/careers/#jobs-by-industry';
		const data = await fetchData(url, ZIPPIA_SCRAP_TYPE.CAREER);

		return data;
	}

	async getzippiaIndustry() {
		const dataInsert = [];
		for (const item of careerData) {
			const url = this.configService.get<string>('ZIPPIA_URL') + item.dapUrl;
			const ScrapData = await fetchData(url, ZIPPIA_SCRAP_TYPE.INDUSTRY);

			for (const industryLv1 of ScrapData) {
				industryLv1.forEach((industryLv2) => {
					dataInsert.push({
						name: industryLv2.text.title,
						link: industryLv2.link,
						parent: item.name,
					});
				});
			}
		}
	}

	async getzippiaDetailIndustry() {
		// step 1: Get data Industry from DB
		// step 2: using for loop to get url( have example above). In code below, i hard url to get data
		const url = 'https://www.zippia.com/architect-jobs/';
		const ScrapData = await fetchData(url, ZIPPIA_SCRAP_TYPE.INDUSTRY_DETAIL);

		return ScrapData;
	}
}
