package com.reto03.grupog1.DTO;

import java.io.Serializable;

import com.reto03.grupog1.Entities.Client;

public class ClientReport implements Serializable {
    private Integer total;
    private Client client;

    public ClientReport(Integer total, Client client) {
        this.total = total;
        this.client = client;
    }

    public ClientReport() {
    }

    public Integer getTotal() {
        return this.total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
