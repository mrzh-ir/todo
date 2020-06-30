package org.redischool.sd2.todo.domain;

import org.junit.Before;
import org.junit.jupiter.api.Test;


import java.time.LocalDate;
import java.time.Period;

import static org.junit.jupiter.api.Assertions.*;

class ConcreteTodoListServiceTest {
    private ConcreteTodoListService service = new ConcreteTodoListService();

    @Test
    void TestCurrentItemsReturnSomeElement() {
        service.addTask("german");
        service.addShoppingItem("milk", 1);
        assertEquals(service.currentItems().size(), 2);
        assertTrue(service.currentItems().get(0).getLabel().contains("german"));
        assertEquals(service.currentItems().get(service.currentItems().size() - 1).getLabel(), "milk");
    }

    @Test
    void testUpdateExistingShoppingItemAmount() {
        service.addShoppingItem("bread", 1);
        service.addShoppingItem("bread", 2);

        for (Item item : service.currentItems()) {
            if (item instanceof ShoppingItem)
                assertEquals(((ShoppingItem) item).getAmount(), 3);
        }
    }

    @Test
    void testAddExistingOneTimeTask() {
        service.addTask("learning german");
        service.addTask("do the homework");
        service.addTask("learning german");

        assertEquals(service.currentItems().size(), 2);
    }

    @Test
    void testUpdateOneTimeTaskDeadline() {
        service.addTaskWithDeadline("call boss", LocalDate.of(2020, 07, 02));
        service.addTaskWithDeadline("call boss", LocalDate.of(2020, 07, 02));
        service.addTaskWithDeadline("call boss", LocalDate.of(2020, 07, 06));
        assertEquals(service.currentItems().size(), 1);
        assertTrue(service.currentItems().get(0) instanceof OneTimeTask);
        assertEquals(((OneTimeTask) service.currentItems().get(0)).getDeadline(), LocalDate.of(2020, 07, 06));
    }

    @Test
    public void testUpdatingRecurrentTaskPeriod() {
        service.addRecurringTask("clean the house", Period.of(0, 0, 5));
        service.addRecurringTask("clean the house", Period.of(0, 0, 5));
        service.addRecurringTask("clean the house", Period.of(0, 0, 7));


        for (Item item : service.currentItems()) {
            if (item instanceof RecurringTask) {
                assertEquals(((RecurringTask) item).getRecurrencePeriod(), Period.of(0, 0, 7));
            }
        }
        service.addRecurringTask("gym", Period.of(0, 0, 2));
        assertEquals(service.currentItems().size(), 2);
    }

    @Test
    void testMarkedCompleteOfaOneTimeTask() {
        OneTimeTask oneTimeTask = new OneTimeTask("finish the project");
        String oneTimeTaskId = oneTimeTask.getItemId();
        service.markCompleted(oneTimeTaskId);
        assertEquals(service.currentItems().size(), 0);
    }

    @Before
    void clear() {
        service.currentItems().clear();
    }

}
