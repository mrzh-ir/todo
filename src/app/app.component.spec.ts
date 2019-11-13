import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  }));

  it('adds an item to the list', () => {
    addItemToList('An item');

    expect(itemsList()).toContain('An item');
  });

  it('clears the input once the button is clicked', async () => {
    addItemToList('An item');
    await fixture.whenStable();

    expect(addItemInput().nativeElement.value).toEqual('');
  });

  it('removes an item from the list', () => {
    addItemToList('An item');

    removeItemFromList(0);

    expect(itemsList()).not.toContain('An item');
  });

  it('disables the add button until text is entered', () => {
    expect(addItemButton().nativeElement.attributes['disabled']).toBeTruthy;
  });

  it('enables the add button when text is entered', () => {
    inputText(addItemInput(), 'An item');

    expect(addItemButton().nativeElement.attributes['disabled']).not.toBeTruthy;
  });

  function addItemToList(item: string) {
    inputText(addItemInput(), item);
    addItemButton().nativeElement.click();
  }

  function removeItemFromList(index: number) {
    fixture.debugElement
        .query(By.css(`#todo-list mat-list-option:nth-of-type(${index + 1}) mat-pseudo-checkbox`))
        .nativeElement
        .click();
    fixture.detectChanges();
  }

  function itemsList(): string[] {
    return fixture.debugElement
        .queryAll(By.css('#todo-list mat-list-option'))
        .map((item) => item.nativeElement.innerText);
  }

  function addItemInput(): DebugElement {
    return fixture.debugElement.query(By.css('#add-item-input'));
  }

  function addItemButton(): DebugElement {
    return fixture.debugElement.query(By.css('#add-item-button'));
  }

  function inputText(element: DebugElement, value: string) {
    element.nativeElement.value = value;
    element.nativeElement.dispatchEvent(new Event('input'));
  }
});
