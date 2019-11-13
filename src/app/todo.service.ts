import { Injectable } from '@angular/core';
import { FetchListRequest, FetchListResponse } from './../proto/todo_service_pb';
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
}
