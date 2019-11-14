package org.redischool.sd2.todo.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
final class TodoServiceController {
  private static final class FetchItemsResponseDto {
    private final List<String> items;

    FetchItemsResponseDto(List<String> items) {
      this.items = List.copyOf(items);
    }

    public List<String> getItems() {
      return items;
    }
  }

  @GetMapping("/api/items")
  FetchItemsResponseDto fetchItems() {
    return new FetchItemsResponseDto(List.of("Butter", "Sugar", "Flour"));
  }
}
