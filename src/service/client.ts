import axios, { AxiosInstance } from 'axios';

export class ServiceClient {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:8001',
    })
  }

  setToken(token: any) {
    this.httpClient.defaults.headers.authorization = token ? `Bearer ${token.toString()}` : undefined;
  }

  async getUserProjectTitles(userId: string) {
    const response = await this.httpClient.get(`/projects?owner=${userId}`);
    return response.data;
  }

  async createNewProject(title: string) {
    const response = await this.httpClient.post(`/projects`, { title });
    return response.data;
  }

  async getProject(id: string) {
    const response = await this.httpClient.get(`/projects/${id}`);
    return response.data;
  }
}
