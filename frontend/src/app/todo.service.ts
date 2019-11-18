import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import { Item, Type, Period } from './item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}

  async fetchItems(): Promise<Array<Item>> {
    return this.httpClient.get<FetchItemsResponse>('/api/items')
        .toPromise()
        .then((response) => response.items.map((itemDto) => ItemDto.toItem(itemDto)))
        .catch((error: HttpErrorResponse) => {
          this.snackBar.open(`Cannot fetch items: ${error.message}`);
          return [];
        });
  }

  async addItem(item: Item): Promise<Array<Item>> {
    return this.httpClient.post<AddItemResponse>('/api/items', ItemDto.fromItem(item))
        .toPromise()
        .then(response => response.items.map((itemDto) => ItemDto.toItem(itemDto)))
        .catch((error: HttpErrorResponse) => {
          this.snackBar.open(`Cannot add item '${item.label}': ${error.message}`);
          throw error;
        });
  }

  async completeItem(itemId: string): Promise<Array<Item>> {
    return this.httpClient.delete<CompleteItemResponse>(`/api/items/${itemId}`)
        .toPromise()
        .then(response => response.items.map((itemDto) => ItemDto.toItem(itemDto)))
        .catch((error: HttpErrorResponse) => {
          this.snackBar.open(`Cannot mark item ${itemId} completed: ${error.message}`);
          throw error;
        });
  }
}

class FetchItemsResponse {
  items: Array<ItemDto>;
}

class AddItemResponse {
  items: Array<ItemDto>;  
}

class CompleteItemResponse {
  items: Array<ItemDto>;
}

class ItemDto {
  id: string;
  label: string;
  type: string;
  amount: number;
  frequency: number;
  period: string;
  deadline: string;

  static fromItem(item: Item): ItemDto {
    const result = new ItemDto();
    result.id = item.id;
    result.label = item.label;
    result.type = ItemDto.toTypeString(item.type);
    result.amount = item.amount;
    result.frequency = item.frequency;
    result.period = ItemDto.toPeriodString(item.period);
    result.deadline = item.deadline && item.deadline.format('YYYY-MM-DD');
    return result;
  }

  private static toTypeString(type: Type): string {
    switch (type) {
      case Type.Task:
        return 'TASK';
      case Type.Recurring:
        return 'RECURRING';
      case Type.ShoppingItem:
        return 'SHOPPING_ITEM';
    }
  }

  private static toPeriodString(period: Period): string {
    switch (period) {
      case Period.Day:
        return 'DAY';
      case Period.Week:
        return 'WEEK';
      case Period.Month:
        return 'MONTH';
      case Period.Year:
        return 'YEAR';
    }
  }

  static toItem(dto: ItemDto): Item {
    const result = Item.emptyItem();
    result.id = dto.id;
    result.label = dto.label;
    result.type = ItemDto.toType(dto.type);
    result.amount = dto.amount;
    result.frequency = dto.frequency;
    result.period = ItemDto.toPeriod(dto.period);
    result.deadline = dto.deadline && moment(dto.deadline);
    return result;
  }

  private static toType(type: string): Type {
    switch (type) {
      case 'TASK':
        return Type.Task;
      case 'RECURRING':
        return Type.Recurring;
      case 'SHOPPING_ITEM':
        return Type.ShoppingItem;
      default:
        return undefined;
    }
  }

  private static toPeriod(period: string): Period {
    switch (period) {
      case 'DAY':
        return Period.Day;
      case 'WEEK':
        return Period.Week;
      case 'MONTH':
        return Period.Month;
      case 'YEAR':
        return Period.Year;
      default:
        return undefined;
    }
  }
}
