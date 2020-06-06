package org.redischool.sd2.todo.api;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.redischool.sd2.todo.domain.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TodoServiceController.class)
class TodoServiceControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private TodoListService todoListService;

  @Test
  void shouldAddAOneTimeTask() throws Exception {
    String payload = "{\"label\":\"An item\",\"type\":\"TASK\"}";

    mockMvc.perform(post("/api/items").content(payload).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    verify(todoListService).addTask("An item");
  }

  @Test
  void shouldAddAOneTimeTaskWithDeadline() throws Exception {
    String payload = "{\"label\":\"An item\",\"type\":\"TASK\",\"deadline\":\"2020-01-15\"}";

    mockMvc.perform(post("/api/items").content(payload).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    verify(todoListService).addTaskWithDeadline("An item", LocalDate.of(2020, 1, 15));
  }

  @ParameterizedTest
  @MethodSource("recurringTaskCases")
  void shouldAddARecurringTask(String periodAsString, Period periodExpected) throws Exception {
    String payload =
        String.format(
            "{\"label\":\"An item\",\"type\":\"RECURRING\",\"period\":\"%s\",\"frequency\":2}",
            periodAsString);

    mockMvc.perform(post("/api/items").content(payload).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    verify(todoListService).addRecurringTask("An item", periodExpected);
  }

  private static Iterable<Arguments> recurringTaskCases() {
    return List.of(
        Arguments.arguments("DAY", Period.ofDays(2)),
        Arguments.arguments("WEEK", Period.ofWeeks(2)),
        Arguments.arguments("MONTH", Period.ofMonths(2)),
        Arguments.arguments("YEAR", Period.ofYears(2)));
  }

  @Test
  void shouldAddAShoppingItem() throws Exception {
    String payload = "{\"label\":\"An item\",\"type\":\"SHOPPING_ITEM\",\"amount\":2}";

    mockMvc.perform(post("/api/items").content(payload).contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());

    verify(todoListService).addShoppingItem("An item", 2);
  }

  @Test
  void shouldCompleteAnItem() throws Exception {
    mockMvc.perform(delete("/api/items/100")).andExpect(status().isOk());

    verify(todoListService).markCompleted("100");
  }

  @Test
  void shouldUpdateRecurringTasks() throws Exception {
    mockMvc.perform(put("/api/items:updateRecurring")).andExpect(status().isOk());

    verify(todoListService).updateRecurringTasks();
  }
}
