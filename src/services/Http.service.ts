import "isomorphic-fetch";

export class HttpService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async makeRequest(
    endpoint: string,
    config: RequestInit = {}
  ): Promise<unknown> {
    config = {
      method: config.method ?? "GET",
      ...config,
    };

    const response = await fetch(this.baseUrl + endpoint, config);
    return response.json();
  }

  async get(endpoint: string) {
    return this.makeRequest(endpoint);
  }

  async post(endpoint: string, body: BodyInit) {
    return this.makeRequest(endpoint, { method: "POST", body });
  }
}
