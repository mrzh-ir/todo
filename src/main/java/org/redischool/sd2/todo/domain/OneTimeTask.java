package org.redischool.sd2.todo.domain;

import java.time.LocalDate;
import java.util.UUID;

public class OneTimeTask implements Item {
    private String label;
    private LocalDate deadline;
    private String itemId;

    OneTimeTask(String label, LocalDate deadline) {
        this.label = label;
        this.deadline = deadline;
        this.itemId = UUID.randomUUID().toString();      //unique random
    }

    OneTimeTask(String label) {
        this.label = label;
    }

    void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    @Override
    public String getLabel() {
        return label;
    }

    @Override
    public String getItemId() {
        return itemId;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

}
