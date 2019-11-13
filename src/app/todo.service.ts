import { Injectable } from '@angular/core';
import { AddItemRequest, CompleteItemRequest, FetchListRequest, FetchListResponse } from './../proto/todo_service_pb';
import { TodoServiceClient } from './../proto/Todo_serviceServiceClientPb';
import * as grpcWeb from 'grpc-web';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private client = new TodoServiceClient('http://localhost:8080', null, null);

  constructor() { }

  async fetchItems(): Promise<string[]> {
    const request = new FetchListRequest();
    return new Promise<string[]>((resolve, reject) => {
      this.client.fetchList(request, {}, (err: grpcWeb.Error, response: FetchListResponse) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.getItemsList());
        }
      });  
    });
  }

  async addItem(item: string): Promise<void> {
    const request = new AddItemRequest();
    request.setLabel(item);
    return new Promise<void>((resolve, reject) => {
      this.client.addItem(request, {}, (err, _) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async completeItem(item: string): Promise<void> {
    const request = new CompleteItemRequest();
    request.setLabel(item);
    return new Promise<void>((resolve, reject) => {
      this.client.completeItem(request, {}, (err, _) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
