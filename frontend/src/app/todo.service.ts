import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  async fetchItems(): Promise<string[]> {
    return this.httpClient.get<FetchItemsResponse>('/api/items').toPromise().then((response) => response.items);
  }

  async addItem(item: string): Promise<void> {
    return this.httpClient.post('/api/items', {'label': item}).toPromise().then(() => Promise.resolve());
  }

  async completeItem(item: string): Promise<void> {
    return this.httpClient.delete(`/api/items/${item}`).toPromise().then(() => Promise.resolve());
  }
}

class FetchItemsResponse {
  items: string[];
}
