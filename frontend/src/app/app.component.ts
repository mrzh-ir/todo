import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  items: string[] = [];
  newItemLabel = '';
  itemAmount: number = null;
  itemFrequency: number = null;
  itemDeadline: Moment = null;
  repeatPeriod = 'days';
  newItemType = 'task';

  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    this.items = await this.todoService.fetchItems();
  }

  async listItemSelected(itemToBeRemoved: string) {
    this.items = this.items.filter((item) => item !== itemToBeRemoved);
    await this.todoService.completeItem(itemToBeRemoved);
  }

  get canAdd(): boolean {
    return !!this.newItemLabel && (this.newItemType !== 'recurring' || !!this.itemFrequency);
  }

  async addItem() {
    this.items.push(this.newItemLabel);
    await this.todoService.addItem(this.newItemLabel);
    this.resetForm();
  }

  private resetForm() {
    this.newItemLabel = '';
    this.itemAmount = null;
    this.itemDeadline = null;
    this.itemFrequency = null;
    this.repeatPeriod = 'days';
  }
}
