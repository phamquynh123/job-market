import axios from 'axios';
import cheerio from 'cheerio';
import { ZIPPIA_SCRAP_TYPE } from '../constant';

export const fetchData = async (url: string, key: ZIPPIA_SCRAP_TYPE) => {
	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);
		const scriptContent = $('#__NEXT_DATA__').html();
		const jsonData = JSON.parse(scriptContent);

		switch (key) {
			case ZIPPIA_SCRAP_TYPE.CAREER:
				return jsonData.qnaSectionData;
			case ZIPPIA_SCRAP_TYPE.INDUSTRY:
				return jsonData.props.pageProps.data.jobTitles;
			case ZIPPIA_SCRAP_TYPE.INDUSTRY_DETAIL:
				return jsonData.props.pageProps.data.careerPaths;

			default:
				break;
		}

		return [];
	} catch (error) {
		console.error(`Error fetching data: ${error}`);
		return [];
	}
};
