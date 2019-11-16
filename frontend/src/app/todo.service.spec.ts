import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';

import { Type, Period, Item } from './item';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let subject: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    subject = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const cases: Array<{dto: object, item: object}> = [
    {
      dto: {id: '100'},
      item: {id: '100'},
    },
    {
      dto: {label: 'An item'},
      item: {label: 'An item'},
    },
    {
      dto: {type: 'TASK'},
      item: {type: Type.Task},
    },
    {
      dto: {type: 'RECURRING'},
      item: {type: Type.Recurring},
    },
    {
      dto: {type: 'SHOPPING_ITEM'},
      item: {type: Type.ShoppingItem},
    },
    {
      dto: {amount: 100},
      item: {amount: 100},
    },
    {
      dto: {frequency: 2},
      item: {frequency: 2},
    },
    {
      dto: {period: 'DAY'},
      item: {period: Period.Day},
    },
    {
      dto: {period: 'WEEK'},
      item: {period: Period.Week},
    },
    {
      dto: {period: 'MONTH'},
      item: {period: Period.Month},
    },
    {
      dto: {period: 'YEAR'},
      item: {period: Period.Year},
    },
    {
      dto: {deadline: '2020-01-15'},
      item: {deadline: moment('2020-01-15')},
    },
  ];

  const toItemCases: Array<{dto: object, item: object}> = [
    ...cases,
    {
      dto: {id: '100'},
      item: {id: '100'},
    },
    {
      dto: {type: 'invalid'},
      item: {type: undefined},
    },
    {
      dto: {period: 'invalid'},
      item: {period: undefined},
    },
    {
      dto: {deadline: null},
      item: {deadline: null},
    },
  ];

  for (let {dto, item} of toItemCases) {
    it(`should convert ${JSON.stringify(dto)} to ${JSON.stringify(item)} in fetching items`, async () => {
      const resultPromise = subject.fetchItems();

      const request = httpMock.expectOne('/api/items');
      expect(request.request.method).toEqual('GET');
      request.flush({items: [dto]});
      expect(await resultPromise).toContain(jasmine.objectContaining(item));
    });
  }

  for (let {dto, item} of cases) {
    it(`should convert ${JSON.stringify(item)} to ${JSON.stringify(dto)} in adding an item`, async () => {
      subject.addItem(item as Item);

      const request = httpMock.expectOne('/api/items');
      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(jasmine.objectContaining(dto));
    });
  }

  it('should return list after adding item', async () => {
    const resultPromise = subject.addItem(Item.emptyItem());

    const request = httpMock.expectOne('/api/items');
    request.flush({items: [{id: '100'}]});
    expect(await resultPromise).toContain(jasmine.objectContaining({id: '100'}));
  });

  it('should complete an item', async () => {
    subject.completeItem('100');

    const request = httpMock.expectOne('/api/items/100');
    expect(request.request.method).toEqual('DELETE');
  });

  it('should return list after completing item', async () => {
    const resultPromise = subject.completeItem('100');

    const request = httpMock.expectOne('/api/items/100');
    request.flush({items: [{id: '200'}]});
    expect(await resultPromise).toContain(jasmine.objectContaining({id: '200'}));
  });
});
