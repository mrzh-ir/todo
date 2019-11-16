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
    await this.todoService.completeItem(itemIdToBeRemoved);
  }

  get canAdd(): boolean {
    return !!this.newItem.label && (this.newItem.type !== Type.Recurring || !!this.newItem.frequency);
  }

  async addItem() {
    this.items.push(this.newItem);
    await this.todoService.addItem(this.newItem);
    this.resetForm();
  }

  private resetForm() {
    this.newItem = Item.emptyItem();
  }
}
