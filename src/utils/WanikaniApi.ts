import moment from 'moment';

const baseUrl: string = 'https://api.wanikani.com/v2/'

export default class WanikaniApi {

    private static async makeWanikaniRequest(apiKey: string, nextUrl: string) {
        try {
            var requestHeaders =
            new Headers({
                'Wanikani-Revision': '20170710',
                Authorization: `Bearer ${apiKey}`,
            });
            var apiEndpoint =
            new Request(nextUrl, {
                method: 'GET',
                headers: requestHeaders
            });

            const response = await fetch(apiEndpoint)
            return await response.json();
        } catch(e) {
            console.error(e);
        }
    }

    static async getUser(apiKey: string, nextUrl: string = `${baseUrl}user`) {
        return await WanikaniApi.makeWanikaniRequest(apiKey, nextUrl);
    }

    static async getReviews(apiKey: string, nextUrl: string = `${baseUrl}reviews?updated_after=${moment().subtract(11, 'month').toISOString()}`) {
        return await WanikaniApi.makeWanikaniRequest(apiKey, nextUrl);
    }

    static async getReviewStatistics(apiKey: string, nextUrl: string = `${baseUrl}review_statistics`) {
        return await WanikaniApi.makeWanikaniRequest(apiKey, nextUrl);
    }

    static async getSubjects(apiKey: string, ids: number[]) {
        return await WanikaniApi.makeWanikaniRequest(apiKey, `${baseUrl}subjects?ids=[${ids.join(',')}]`);
    }
}