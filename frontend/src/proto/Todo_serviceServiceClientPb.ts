/**
 * @fileoverview gRPC-Web generated client stub for todo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  AddItemRequest,
  AddItemResponse,
  CompleteItemRequest,
  CompleteItemResponse,
  FetchListRequest,
  FetchListResponse} from './todo_service_pb';

export class TodoServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoFetchList = new grpcWeb.AbstractClientBase.MethodInfo(
    FetchListResponse,
    (request: FetchListRequest) => {
      return request.serializeBinary();
    },
    FetchListResponse.deserializeBinary
  );

  fetchList(
    request: FetchListRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: FetchListResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/todo.TodoService/FetchList',
      request,
      metadata || {},
      this.methodInfoFetchList,
      callback);
  }

  methodInfoAddItem = new grpcWeb.AbstractClientBase.MethodInfo(
    AddItemResponse,
    (request: AddItemRequest) => {
      return request.serializeBinary();
    },
    AddItemResponse.deserializeBinary
  );

  addItem(
    request: AddItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AddItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/todo.TodoService/AddItem',
      request,
      metadata || {},
      this.methodInfoAddItem,
      callback);
  }

  methodInfoCompleteItem = new grpcWeb.AbstractClientBase.MethodInfo(
    CompleteItemResponse,
    (request: CompleteItemRequest) => {
      return request.serializeBinary();
    },
    CompleteItemResponse.deserializeBinary
  );

  completeItem(
    request: CompleteItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CompleteItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/todo.TodoService/CompleteItem',
      request,
      metadata || {},
      this.methodInfoCompleteItem,
      callback);
  }

}

