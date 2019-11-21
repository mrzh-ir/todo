package org.redischool.sd2.todo.domain;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

@Service
final class ConcreteTodoListService implements TodoListService {
  @Override
  public void addTask(String label) {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  @Override
  public void addTaskWithDeadline(String label, LocalDate deadline) {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  @Override
  public void addRecurringTask(String label, Period recurrencePeriod) {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  @Override
  public void addShoppingItem(String label, int amount) {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  @Override
  public void markCompleted(String itemId) {
    throw new UnsupportedOperationException("Not implemented yet");
  }

  @Override
  public void updateRecurringTasks() {
    throw new UnsupportedOperationException("Not implemented yet");
  }
}
