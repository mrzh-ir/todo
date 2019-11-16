import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as moment from 'moment';

import { AppComponent } from './app.component';
import { Item, Type, Period } from './item';
import { TodoService } from './todo.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let items: Array<Item>;
  let addedItems: Array<Item>;
  let completedItems: string[];
  let nextItemId = 100;

  class FakeTestingService {
    async fetchItems(): Promise<Array<Item>> {
      return Promise.resolve(items);
    }

    async addItem(item: Item): Promise<Array<Item>> {
      const newItem = {...item, id: String(nextItemId)};
      addedItems.push(item);
      return Promise.resolve([...items, newItem]);
    }

    async completeItem(itemId: string): Promise<Array<Item>> {
      completedItems.push(itemId);
      return Promise.resolve(items.filter((item) => item.id !== itemId));
    }
  }

  beforeEach(async(() => {
    items = [];
    addedItems = [];
    completedItems = [];
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMomentDateModule,
        MatSelectModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: TodoService, useValue: new FakeTestingService() },
      ],
    }).compileComponents();
  }));

  describe('With items loaded from the backend', () => {
    it('loads items from the backend', async () => {
      items = [itemWithData('An item')];

      fixture = TestBed.createComponent(AppComponent);
      await fixture.whenStable();
  
      expect(itemsList()).toContain('An item');
    });

    it('removes an item from the list', async () => {
      items = [itemWithData('An item', '100')];
      fixture = TestBed.createComponent(AppComponent);
      await fixture.whenStable();

      await removeItemFromList(0);

      expect(itemsList()).not.toContain('An item');
    });

    it('completes an item on the backend', async () => {
      items = [itemWithData('An item', '100')];
      fixture = TestBed.createComponent(AppComponent);
      await fixture.whenStable();

      await removeItemFromList(0);

      expect(completedItems).toContain('100');
    });

    it('updates the list of items with the server response after completing an item', async () => {
      items = [itemWithData('An item', '100')];
      fixture = TestBed.createComponent(AppComponent);

      await fixture.whenStable();
      items = [itemWithData('Another item', '101')];

      await removeItemFromList(0);
      await fixture.whenStable();

      expect(itemsList()).toContain('Another item');
    });

    const typeCases: Array<{type: Type, icon: string}> = [
      {
        type: Type.Task,
        icon: 'assignment',
      },
      {
        type: Type.Recurring,
        icon: 'update',
      },
      {
        type: Type.ShoppingItem,
        icon: 'shopping_cart',
      },
    ];

    it('displays a deadline if present', async () => {
      const item = itemWithData();
      item.deadline = moment('2020-03-15');
      items = [item];

      fixture = TestBed.createComponent(AppComponent);
      await fixture.whenStable();

      expect(itemDeadlines()).toEqual(['Complete by: 15/03/2020']);
    });

    it('hides the deadline if not present', async () => {
      items = [itemWithData()];

      fixture = TestBed.createComponent(AppComponent);
      await fixture.whenStable();
  
      expect(itemDeadlines()).toEqual([]);
    });

    function itemDeadlines(): string[] {
      return fixture.debugElement
          .queryAll(By.css('#todo-list mat-list-item .item-deadline'))
          .map((item) => item.nativeElement.innerText);
    }

    for (const {type, icon} of typeCases) {
      it(`displays the icon for type ${type}`, async () => {
        items = [itemWithData('An item', '100', type)];

        fixture = TestBed.createComponent(AppComponent);
        await fixture.whenStable();
    
        expect(itemsIcons()).toEqual([icon]);
      });
    }

    function itemsIcons(): string[] {
      return fixture.debugElement
          .queryAll(By.css('#todo-list mat-list-item .type-icon'))
          .map((item) => item.nativeElement.innerText);
    }

    it('displays the amount of a shopping item', async () => {
      const item = itemWithData('An item', '100', Type.ShoppingItem);
      item.amount = 2;
      items = [item];

      fixture = TestBed.createComponent(AppComponent);
      await fixture.whenStable();
  
      expect(itemsAmounts()).toEqual(['2']);
    });

    for (const type of [Type.Task, Type.Recurring]) {
      it(`hides the amount when type is ${type}`, async () => {
        items = [itemWithData('An item', '100', type)];

        fixture = TestBed.createComponent(AppComponent);
        await fixture.whenStable();
    
        expect(itemsAmounts()).toEqual([]);
      });
    }

    function itemsAmounts(): string[] {
      return fixture.debugElement
          .queryAll(By.css('#todo-list mat-list-item .amount'))
          .map((item) => item.nativeElement.innerText);
    }

    const recurrenceCases: Array<{period: Period, frequency: number, recurrenceExpected: string}> = [
      {
        period: Period.Day,
        frequency: 1,
        recurrenceExpected: 'Repeats every day',
      },
      {
        period: Period.Week,
        frequency: 1,
        recurrenceExpected: 'Repeats every week',
      },
      {
        period: Period.Month,
        frequency: 1,
        recurrenceExpected: 'Repeats every month',
      },
      {
        period: Period.Year,
        frequency: 1,
        recurrenceExpected: 'Repeats every year',
      },
      {
        period: Period.Day,
        frequency: 2,
        recurrenceExpected: 'Repeats every 2 days',
      },
      {
        period: Period.Week,
        frequency: 2,
        recurrenceExpected: 'Repeats every 2 weeks',
      },
      {
        period: Period.Month,
        frequency: 2,
        recurrenceExpected: 'Repeats every 2 months',
      },
      {
        period: Period.Year,
        frequency: 2,
        recurrenceExpected: 'Repeats every 2 years',
      },
    ];

    for (const {period, frequency, recurrenceExpected} of recurrenceCases) {
      it(`displays the recurrence ${recurrenceExpected} for period ${period} and frequency ${frequency}`, async () => {
        const item = itemWithData('An item', '100', Type.Recurring);
        item.period = period;
        item.frequency = frequency;
        items = [item];

        fixture = TestBed.createComponent(AppComponent);
        await fixture.whenStable();
    
        expect(itemRecurrences()).toEqual([recurrenceExpected]);
      });
    }

    for (const type of [Type.Task, Type.ShoppingItem]) {
      it(`hides the recurrence if the type is ${type}`, async () => {
        items = [itemWithData()];
        fixture = TestBed.createComponent(AppComponent);
        await fixture.whenStable();
    
        expect(itemRecurrences()).toEqual([]);
      });
    }

    function itemRecurrences(): string[] {
      return fixture.debugElement
          .queryAll(By.css('#todo-list mat-list-item .item-recurrence'))
          .map((item) => item.nativeElement.innerText);
    }
  });

  describe('Adding and removing items', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
    }));

    it('adds an item to the list', async () => {
      await addItemToList('An item');

      expect(itemsList()).toContain('An item');
    });

    it('adds an item on the backend', async () => {
      await addItemToList('An item');

      expect(addedItems).toContain(jasmine.objectContaining({label: 'An item'}));
    });

    it('updates the list of items with the server response after adding an item', async () => {
      items = [itemWithData('An item'), itemWithData('Another item')];

      await addItemToList('An item');
      await fixture.whenStable();

      expect(itemsList()).toContain('Another item');
    });

    it('clears the label input once the add button is clicked', async () => {
      await addItemToList('An item');

      expect(addItemInput().nativeElement.value).toEqual('');
    });

    it('resets the amount input once the add button is clicked', async () => {
      await selectItemType(Type.ShoppingItem);
      await inputText(amountInput(), '100');

      await addItemToList('An item');

      await selectItemType(Type.ShoppingItem);
      expect(amountInput().nativeElement.value).toEqual('1');
    });

    it('clears the deadline input once the add button is clicked', async () => {
      await selectItemType(Type.Task);
      await inputText(deadlineInput(), '01/01/2020');

      await addItemToList('An item');

      expect(deadlineInput().nativeElement.value).toEqual('');
    });

    it('clears the frequency input once the add button is clicked', async () => {
      await selectItemType(Type.Recurring);
      await inputText(frequencyInput(), '2');
      await selectPeriod(Period.Week);

      await addItemToList('An item');

      await selectItemType(Type.Recurring);
      expect(frequencyInput().nativeElement.value).toEqual('');
      expect(selectedPeriod()).toBe('days');
    });

    it('disables the add button until label is entered', () => {
      expect(addItemButton().nativeElement.disabled).toBeTruthy();
    });

    it('disables the add button for recurring item until frequency is entered', () => {
      inputText(addItemInput(), 'An item');

      selectItemType(Type.Recurring);

      expect(addItemButton().nativeElement.disabled).toBeTruthy();
    });

    it('enables the add button when label is entered', () => {
      inputText(addItemInput(), 'An item');

      expect(addItemButton().nativeElement.disabled).toBeFalsy();
    });

    it('enables the add button for recurring item when frequency is entered', () => {
      inputText(addItemInput(), 'An item');
      selectItemType(Type.Recurring);

      inputText(frequencyInput(), '1');

      expect(addItemButton().nativeElement.disabled).toBeFalsy();
    });

    async function addItemToList(item: string) {
      inputText(addItemInput(), item);
      addItemButton().nativeElement.click();
      await fixture.whenStable();
    }

    function addItemInput(): DebugElement {
      return fixture.debugElement.query(By.css('#label-input'));
    }

    function amountInput(): DebugElement {
      return fixture.debugElement.query(By.css('#amount-input'));
    }

    function frequencyInput(): DebugElement {
      return fixture.debugElement.query(By.css('#frequency-input'));
    }

    function deadlineInput(): DebugElement {
      return fixture.debugElement.query(By.css('#deadline-input'));
    }

    function addItemButton(): DebugElement {
      return fixture.debugElement.query(By.css('#add-item-button'));
    }

    function inputText(element: DebugElement, value: string) {
      element.nativeElement.value = value;
      element.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
    }

    async function selectPeriod(period: Period) {
      fixture.debugElement.query(By.css('.period-select .mat-select-trigger')).nativeElement.click();
      fixture.detectChanges();
      fixture.debugElement.query(By.css(`mat-option.period[ng-reflect-value="${period}"]`)).nativeElement.click();
      await fixture.whenStable();
    }

    function selectedPeriod(): string {
      return fixture.debugElement.query(By.css('.period-select')).nativeElement.innerText.trim();
    }
  });

  describe('New item form elements', () => {
    beforeEach(async(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
    }));

    it('displays the amount input when shopping item selected', async () => {
      await selectItemType(Type.ShoppingItem);

      expect(amountInputFormElement()).toBeTruthy();
    });

    for (const type of [Type.Task, Type.Recurring]) {
      it(`hides the amount input when ${type} selected`, async () => {
        await selectItemType(type);

        expect(amountInputFormElement()).not.toBeTruthy();
      });
    }

    it('displays the deadline input when task selected', async () => {
      await selectItemType(Type.Task);

      expect(deadlinePart()).toBeTruthy();
    });

    for (const type of [Type.Recurring, Type.ShoppingItem]) {
      it(`hides the deadline input when ${type} selected`, async () => {
        await selectItemType(type);

        expect(deadlinePart()).not.toBeTruthy();
      });
    }

    it('displays the repeat input when recurring selected', async () => {
      await selectItemType(Type.Recurring);

      expect(repeatPart()).toBeTruthy();
    });

    for (const type of [Type.Task, Type.ShoppingItem]) {
      it(`hides the repeat input when ${type} selected`, async () => {
        await selectItemType(type);

        expect(repeatPart()).not.toBeTruthy();
      });
    }

    function amountInputFormElement(): DebugElement {
      return fixture.debugElement.query(By.css('.amount-input'));
    }

    function deadlinePart(): DebugElement {
      return fixture.debugElement.query(By.css('.deadline-part'));
    }

    function repeatPart(): DebugElement {
      return fixture.debugElement.query(By.css('.repeat-part'));
    }
  });

  async function removeItemFromList(index: number) {
    fixture.debugElement
        .query(By.css(`#todo-list mat-list-item:nth-of-type(${index + 1}) .complete-button`))
        .nativeElement
        .click();
    await fixture.whenStable();
  }

  async function selectItemType(type: Type) {
    fixture.debugElement.query(By.css('.new-item-type-select .mat-select-trigger')).nativeElement.click();
    fixture.detectChanges();
    fixture.debugElement.query(By.css(`mat-option.item-type[ng-reflect-value="${type}"]`)).nativeElement.click();
    await fixture.whenStable();
  }

  function itemsList(): string[] {
    return fixture.debugElement
        .queryAll(By.css('#todo-list mat-list-item .item-label'))
        .map((item) => item.nativeElement.innerText);
  }

  function itemWithData(label: string = 'An item', id: string = '100', type: Type = Type.Task): Item {
    const item = Item.emptyItem();
    item.id = id;
    item.label = label;
    item.type = type;
    return item;
  }
});
