import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Item, Type, Period } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly type = Type;
  readonly period = Period;

  items: Array<Item> = [];
  newItem = Item.emptyItem();

  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    this.items = await this.todoService.fetchItems();
  }

  async listItemSelected(itemIdToBeRemoved: string) {
    this.items = this.items.filter((item) => item.id !== itemIdToBeRemoved);
    this.items = await this.todoService.completeItem(itemIdToBeRemoved);
  }

  get canAdd(): boolean {
    return !!this.newItem.label && (this.newItem.type !== Type.Recurring || !!this.newItem.frequency);
  }

  async addItem() {
    this.items.push(this.newItem);
    this.items = await this.todoService.addItem(this.newItem);
    this.resetForm();
  }

  private resetForm() {
    this.newItem = Item.emptyItem();
  }

  itemRecurrenceAsString(item: Item): string {
    if (item.frequency == 1) {
      switch (item.period) {
        case Period.Day:
          return 'day';
        case Period.Week:
          return 'week';
        case Period.Month:
          return 'month';
        case Period.Year:
          return 'year';
      }
    } else {
      switch (item.period) {
        case Period.Day:
          return `${item.frequency} days`;
        case Period.Week:
          return `${item.frequency} weeks`;
        case Period.Month:
          return `${item.frequency} months`;
        case Period.Year:
          return `${item.frequency} years`;
      }
    }
  }
}
