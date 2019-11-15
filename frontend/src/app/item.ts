import { Moment } from 'moment';

export class Item {
  id: string;
  label: string;
  type: Type = Type.Task;
  amount = 1;
  frequency: number;
  period = Period.Day;
  deadline: Moment;

  static emptyItem(): Item {
    return new Item();
  }
}

export enum Type {
  Task,
  Recurring,
  ShoppingItem,
}

export enum Period {
  Day,
  Week,
  Month,
  Year,
}
