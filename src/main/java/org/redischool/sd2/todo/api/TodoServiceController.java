package org.redischool.sd2.todo.api;

import org.springframework.web.bind.annotation.*;

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

  private static final class AddItemDto {
    private String item;

    public void setItem(String item) {
      this.item = item;
    }
  }

  @GetMapping("/api/items")
  FetchItemsResponseDto fetchItems() {
    return new FetchItemsResponseDto(List.of("Butter", "Sugar", "Flour"));
  }

  @PostMapping("/api/items")
  void addItem(AddItemDto addItemDto) {}

  @DeleteMapping("/api/items/{item}")
  void deleteItem(@PathVariable("item") String item) {}
}
