package org.redischool.sd2.todo.domain;

import java.util.UUID;

public class ShoppingItem implements Item {
    private String label;
    private Integer amount;
    private String itemId;

    ShoppingItem(String label, Integer amount) {
        this.label = label;
        this.amount = amount;
        this.itemId = UUID.randomUUID().toString();
    }

    @Override
    public String getLabel() {
        return label;
    }

    void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getAmount() {
        return amount;
    }

    @Override
    public String getItemId() {
        return itemId;
    }
}
