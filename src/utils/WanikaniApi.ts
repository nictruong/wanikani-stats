const baseUrl: string = 'https://api.wanikani.com/v2/'

export default class WanikaniApi {

    static async getUser(apiKey: string) {
        try {
            var apiEndpointPath = 'user';
            var requestHeaders =
            new Headers({
                'Wanikani-Revision': '20170710',
                Authorization: `Bearer ${apiKey}`,
            });
            var apiEndpoint =
            new Request(`${baseUrl}${apiEndpointPath}`, {
                method: 'GET',
                headers: requestHeaders
            });

            const response = await fetch(apiEndpoint)
            return await response.json();
        } catch(e) {
            console.error(e);
        }
    }

    static async getReviews(apiKey: string, nextUrl: string = `${baseUrl}reviews`) {
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
}