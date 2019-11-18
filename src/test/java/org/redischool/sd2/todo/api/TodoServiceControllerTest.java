package org.redischool.sd2.todo.api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.junit.jupiter.MockitoExtension;
import org.redischool.sd2.todo.domain.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoServiceControllerTest {
  @Autowired
  private TestRestTemplate restTemplate;

  @MockBean
  private TodoListService todoListService;

  private final HttpHeaders httpHeaders = new HttpHeaders();

  @BeforeEach
  void setup() {
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
  }

  @Test
  void shouldAddAOneTimeTask() {
    String payload = "{\"label\":\"An item\",\"type\":\"TASK\"}";

    ResponseEntity<String> result =
        restTemplate.postForEntity("/api/items", httpEntity(payload), String.class);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
    verify(todoListService).addTask("An item");
  }

  @Test
  void shouldAddAOneTimeTaskWithDeadline() {
    String payload = "{\"label\":\"An item\",\"type\":\"TASK\",\"deadline\":\"2020-01-15\"}";

    ResponseEntity<String> result =
        restTemplate.postForEntity("/api/items", httpEntity(payload), String.class);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
    verify(todoListService).addTaskWithDeadline("An item", LocalDate.of(2020, 1, 15));
  }

  @ParameterizedTest
  @MethodSource("recurringTaskCases")
  void shouldAddARecurringTask(String periodAsString, Period periodExpected) {
    String payload =
        String.format(
            "{\"label\":\"An item\",\"type\":\"RECURRING\",\"period\":\"%s\",\"frequency\":2}",
            periodAsString);

    ResponseEntity<String> result =
        restTemplate.postForEntity("/api/items", httpEntity(payload), String.class);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
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
  void shouldAddAShoppingItem() {
    String payload = "{\"label\":\"An item\",\"type\":\"SHOPPING_ITEM\",\"amount\":2}";

    ResponseEntity<String> result =
        restTemplate.postForEntity("/api/items", httpEntity(payload), String.class);

    assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
    verify(todoListService).addShoppingItem("An item", 2);
  }

  @Test
  void shouldCompleteAnItem() {
    restTemplate.delete("/api/items/100");

    verify(todoListService).markCompleted("100");
  }

  private HttpEntity<String> httpEntity(String payload) {
    return new HttpEntity<>(payload, httpHeaders);
  }
}
