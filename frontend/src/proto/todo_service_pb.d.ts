import * as jspb from "google-protobuf"

export class FetchListRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchListRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FetchListRequest): FetchListRequest.AsObject;
  static serializeBinaryToWriter(message: FetchListRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchListRequest;
  static deserializeBinaryFromReader(message: FetchListRequest, reader: jspb.BinaryReader): FetchListRequest;
}

export namespace FetchListRequest {
  export type AsObject = {
  }
}

export class FetchListResponse extends jspb.Message {
  getItemsList(): Array<string>;
  setItemsList(value: Array<string>): void;
  clearItemsList(): void;
  addItems(value: string, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FetchListResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FetchListResponse): FetchListResponse.AsObject;
  static serializeBinaryToWriter(message: FetchListResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FetchListResponse;
  static deserializeBinaryFromReader(message: FetchListResponse, reader: jspb.BinaryReader): FetchListResponse;
}

export namespace FetchListResponse {
  export type AsObject = {
    itemsList: Array<string>,
  }
}

export class AddItemRequest extends jspb.Message {
  getLabel(): string;
  setLabel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddItemRequest): AddItemRequest.AsObject;
  static serializeBinaryToWriter(message: AddItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddItemRequest;
  static deserializeBinaryFromReader(message: AddItemRequest, reader: jspb.BinaryReader): AddItemRequest;
}

export namespace AddItemRequest {
  export type AsObject = {
    label: string,
  }
}

export class AddItemResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddItemResponse): AddItemResponse.AsObject;
  static serializeBinaryToWriter(message: AddItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddItemResponse;
  static deserializeBinaryFromReader(message: AddItemResponse, reader: jspb.BinaryReader): AddItemResponse;
}

export namespace AddItemResponse {
  export type AsObject = {
  }
}

export class CompleteItemRequest extends jspb.Message {
  getLabel(): string;
  setLabel(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompleteItemRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CompleteItemRequest): CompleteItemRequest.AsObject;
  static serializeBinaryToWriter(message: CompleteItemRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompleteItemRequest;
  static deserializeBinaryFromReader(message: CompleteItemRequest, reader: jspb.BinaryReader): CompleteItemRequest;
}

export namespace CompleteItemRequest {
  export type AsObject = {
    label: string,
  }
}

export class CompleteItemResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompleteItemResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CompleteItemResponse): CompleteItemResponse.AsObject;
  static serializeBinaryToWriter(message: CompleteItemResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompleteItemResponse;
  static deserializeBinaryFromReader(message: CompleteItemResponse, reader: jspb.BinaryReader): CompleteItemResponse;
}

export namespace CompleteItemResponse {
  export type AsObject = {
  }
}

