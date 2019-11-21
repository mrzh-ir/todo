package org.redischool.sd2.todo.domain;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

public interface TodoListService {
  void addTask(String label);

  void addTaskWithDeadline(String label, LocalDate deadline);

  void addRecurringTask(String label, Period recurrencePeriod);

  void addShoppingItem(String label, int amount);

  void markCompleted(String itemId);

  void updateRecurringTasks();
}
