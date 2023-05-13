package com.reto03.grupog1.DTO;

import java.io.Serializable;

public class StatusReport implements Serializable{
    private Integer completed;
    private Integer cancelled;

    public StatusReport(Integer completed, Integer cancelled) {
        this.completed = completed;
        this.cancelled = cancelled;
    }

    public StatusReport() {
    }

    public Integer getCompleted() {
        return this.completed;
    }

    public void setCompleted(Integer completed) {
        this.completed = completed;
    }

    public Integer getCancelled() {
        return this.cancelled;
    }

    public void setCancelled(Integer cancelled) {
        this.cancelled = cancelled;
    }
    
}
