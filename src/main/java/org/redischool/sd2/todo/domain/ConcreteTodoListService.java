package org.redischool.sd2.todo.domain;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.Clock;

/**
 * Concrete manager for the TODO list.
 */
@Service
final class ConcreteTodoListService implements TodoListService {
    private List<Item> items = new ArrayList<>();

    @Override
    public void addTask(String label) {
        Optional<OneTimeTask> existingOneTimeTask = currentItems().stream().
                filter(item -> item instanceof OneTimeTask && item.getLabel().equalsIgnoreCase(label)).
                map(item -> (OneTimeTask) item).findFirst();

        if (existingOneTimeTask.isEmpty()) {
            items.add(new OneTimeTask(label));
        }
    }

    @Override
    public void addTaskWithDeadline(String label, LocalDate deadline) {
        Optional<OneTimeTask> existingOneTimeTaskWithDeadline = currentItems().stream().
                filter(item -> item instanceof OneTimeTask && item.getLabel().equalsIgnoreCase(label)).
                map(item -> (OneTimeTask) item).findFirst();
        if (existingOneTimeTaskWithDeadline.isPresent()) {
            existingOneTimeTaskWithDeadline.get().setDeadline(deadline);
        } else {
            currentItems().add(new OneTimeTask(label, deadline));
        }

    }

    @Override
    public void addRecurringTask(String label, Period recurrencePeriod) {
        Optional<RecurringTask> existingRecurringItem = currentItems().stream().
                filter(item -> item instanceof RecurringTask && item.getLabel().equalsIgnoreCase(label)).
                map(item -> (RecurringTask) item).findFirst();
        if (existingRecurringItem.isPresent()) {
            existingRecurringItem.get().setRecurrencePeriod(recurrencePeriod);
        } else {
            currentItems().add(new RecurringTask(label, recurrencePeriod));
        }
    }

    @Override
    public void addShoppingItem(String label, int amount) {
        Optional<ShoppingItem> existingShoppingItem = currentItems().stream().
                filter(item -> item instanceof ShoppingItem && item.getLabel().equalsIgnoreCase(label)).
                map(item -> (ShoppingItem) item).findFirst();
        if (existingShoppingItem.isPresent()) {
            existingShoppingItem.get().setAmount(amount + existingShoppingItem.get().getAmount());
        } else {
            currentItems().add(new ShoppingItem(label, amount));
        }
    }

    @Override
    public void markCompleted(String itemId) {
        Optional<Item> found = items.stream().filter(item -> item.getItemId().equals(itemId)).findAny();
        found.ifPresent(item -> items.remove(item));
    }

    @Override
    public void updateRecurringTasks() {
        throw new UnsupportedOperationException("Not implemented yet");
    }


    public List<Item> currentItems() {
        return items;
    }
}
