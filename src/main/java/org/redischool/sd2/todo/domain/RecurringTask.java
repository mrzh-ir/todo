package org.redischool.sd2.todo.domain;


import java.time.Period;
import java.util.UUID;

public class RecurringTask implements Item {
    private String label;
    private Period recurrencePeriod;
    private String itemId;

    RecurringTask(String label, Period recurrencePeriod) {
        this.label = label;
        this.recurrencePeriod = recurrencePeriod;
        this.itemId = UUID.randomUUID().toString();
    }

    void setRecurrencePeriod(Period recurrencePeriod) {
        this.recurrencePeriod = recurrencePeriod;
    }

    public Period getRecurrencePeriod() {
        return recurrencePeriod;
    }

    @Override
    public String getLabel() {
        return label;
    }

    @Override
    public String getItemId() {
        return itemId;
    }
}
