package org.redischool.sd2.todo.api;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
final class TodoServiceController {
  private static final List<ItemDto> ITEMS =
      List.of(ItemDto.withLabel("Butter"), ItemDto.withLabel("Sugar"), ItemDto.withLabel("Flour"));

  @GetMapping("/api/items")
  FetchItemsResponseDto fetchItems() {
    return new FetchItemsResponseDto(ITEMS);
  }

  @PostMapping("/api/items")
  AddItemResponseDto addItem(AddItemDto addItemDto) {
    return new AddItemResponseDto(ITEMS);
  }

  @DeleteMapping("/api/items/{id}")
  DeleteItemResponseDto deleteItem(@PathVariable("id") String id) {
    return new DeleteItemResponseDto(ITEMS);
  }

  private static final class FetchItemsResponseDto {
    private final List<ItemDto> items;

    FetchItemsResponseDto(List<ItemDto> items) {
      this.items = List.copyOf(items);
    }

    public List<ItemDto> getItems() {
      return items;
    }
  }

  private static final class AddItemResponseDto {
    private final List<ItemDto> items;

    AddItemResponseDto(List<ItemDto> items) {
      this.items = List.copyOf(items);
    }

    public List<ItemDto> getItems() {
      return items;
    }
  }

  private static final class DeleteItemResponseDto {
    private final List<ItemDto> items;

    DeleteItemResponseDto(List<ItemDto> items) {
      this.items = List.copyOf(items);
    }

    public List<ItemDto> getItems() {
      return items;
    }
  }

  private static final class ItemDto {
    private static long nextId = 0;
    String id;
    String label;
    String type;
    Integer amount;
    Integer frequency;
    String period;
    String deadline;

    static ItemDto withLabel(String label) {
      ItemDto itemDto = new ItemDto();
      itemDto.label = label;
      itemDto.id = String.valueOf(nextId++);
      itemDto.type = "TASK";
      return itemDto;
    }

    public String getId() {
      return id;
    }

    public String getLabel() {
      return label;
    }

    public String getType() {
      return type;
    }

    public Integer getAmount() {
      return amount;
    }

    public Integer getFrequency() {
      return frequency;
    }

    public String getPeriod() {
      return period;
    }

    public String getDeadline() {
      return deadline;
    }
  }

  private static final class AddItemDto {
    String label;
    String type;
    Integer amount;
    Integer frequency;
    String period;
    String deadline;

    public void setLabel(String label) {
      this.label = label;
    }

    public void setType(String type) {
      this.type = type;
    }

    public void setAmount(Integer amount) {
      this.amount = amount;
    }

    public void setFrequency(Integer frequency) {
      this.frequency = frequency;
    }

    public void setPeriod(String period) {
      this.period = period;
    }

    public void setDeadline(String deadline) {
      this.deadline = deadline;
    }
  }
}
