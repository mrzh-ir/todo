import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  async fetchItems(): Promise<Array<Item>> {
    return this.httpClient.get<FetchItemsResponse>('/api/items').toPromise().then((response) => response.items);
  }

  async addItem(item: Item): Promise<void> {
    return this.httpClient.post('/api/items', item).toPromise().then(() => Promise.resolve());
  }

  async completeItem(itemId: string): Promise<void> {
    return this.httpClient.delete(`/api/items/${itemId}`).toPromise().then(() => Promise.resolve());
  }
}

class FetchItemsResponse {
  items: Array<Item>;
}
