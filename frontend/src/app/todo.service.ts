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

  async addItem(item: Item): Promise<Array<Item>> {
    return this.httpClient.post<AddItemResponse>('/api/items', item).toPromise().then(response => response.items);
  }

  async completeItem(itemId: string): Promise<Array<Item>> {
    return this.httpClient.delete<CompleteItemResponse>(`/api/items/${itemId}`).toPromise().then(response => response.items);
  }
}

class FetchItemsResponse {
  items: Array<Item>;
}

class AddItemResponse {
  items: Array<Item>;  
}

class CompleteItemResponse {
  items: Array<Item>;
}
