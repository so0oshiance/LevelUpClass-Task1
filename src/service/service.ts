import Logger from "../logger/logger";
import axios from "axios";
export class Service {
	private requestId: number;
	private result = "";
	private client: any;

	constructor(requestId: number) {
		this.requestId = requestId;
		const options = {
			baseURL: "https://jsonplaceholder.typicode.com",
			headers: { "Content-Type": "application/json" }
		};
		this.client = axios.create(options);
	}

	async getData(url: string): Promise<JSON> {
		return await axios
			.get(url)
			.then((response: any) => (this.result = response.data))
			.catch(this.handleError)
			.finally(() => {
				Promise.resolve(this.result);
			});
	}

	async postData(inputText: string): Promise<JSON> {
		const data = this.createPostData(inputText);
		return this.client
			.post('/post', data)
			.then((response: any) => (this.result = response.data))
			.catch(this.handleError)
			.finally(() => {
				Promise.resolve(this.result);
			});
	}

	private handleError(error: any): Promise<any> {
		
		Logger.errorLog(this.requestId, error.statusMessage);
		return Promise.reject(error.message || error);
	}
	private createPostData(inputText: string) {
		return {
			userId: this.requestId,
			id: this.requestId,
			title: "Sanitizer",
			body: inputText
		};
	}
}
