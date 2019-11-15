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

  items: string[] = [];
  newItem = Item.emptyItem();

  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    this.items = await this.todoService.fetchItems();
  }

  async listItemSelected(itemToBeRemoved: string) {
    this.items = this.items.filter((item) => item !== itemToBeRemoved);
    await this.todoService.completeItem(itemToBeRemoved);
  }

  get canAdd(): boolean {
    return !!this.newItem.label && (this.newItem.type !== Type.Recurring || !!this.newItem.frequency);
  }

  async addItem() {
    this.items.push(this.newItem.label);
    await this.todoService.addItem(this.newItem.label);
    this.resetForm();
  }

  private resetForm() {
    this.newItem = Item.emptyItem();
  }
}
