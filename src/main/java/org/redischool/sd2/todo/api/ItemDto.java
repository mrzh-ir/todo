package org.redischool.sd2.todo.api;

/**
 * Specifies the format of a TODO item between frontend and server.
 *
 * Each field corresponds to a JSON property.
 */
public final class ItemDto {
  private static long nextId = 0;

  private String id;
  private String label;
  private String type;
  private Integer amount;
  private Integer frequency;
  private String period;
  private String deadline;

  public static ItemDto oneTimeTaskWithLabel(String label) {
    ItemDto itemDto = new ItemDto();
    itemDto.label = label;
    itemDto.id = String.valueOf(nextId++);
    itemDto.type = "TASK";
    return itemDto;
  }

  public static ItemDto oneTimeTaskWithLabelAndDeadline(String label, String deadline) {
    ItemDto itemDto = new ItemDto();
    itemDto.label = label;
    itemDto.deadline = deadline;
    itemDto.id = String.valueOf(nextId++);
    itemDto.type = "TASK";
    return itemDto;
  }

  public static ItemDto recurringTaskWithLabel(String label) {
    ItemDto itemDto = new ItemDto();
    itemDto.label = label;
    itemDto.frequency = 1;
    itemDto.period = "WEEK";
    itemDto.id = String.valueOf(nextId++);
    itemDto.type = "RECURRING";
    return itemDto;
  }

  public static ItemDto shoppingItemWithLabel(String label) {
    ItemDto itemDto = new ItemDto();
    itemDto.label = label;
    itemDto.amount = 1;
    itemDto.id = String.valueOf(nextId++);
    itemDto.type = "SHOPPING_ITEM";
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
