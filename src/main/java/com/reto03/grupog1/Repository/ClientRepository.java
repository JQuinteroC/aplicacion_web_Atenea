package com.reto03.grupog1.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog1.Entities.Client;
import com.reto03.grupog1.CrudRepository.ClientCrudRepository;

import java.util.List;

@Repository
public class ClientRepository {
    @Autowired
    private ClientCrudRepository clientCrudRepository;

    public List<Client> getAll() {
        return (List<Client>) clientCrudRepository.findAll();
    }
    public Client addClient(Client client) {
        if (client.getIdClient() == null || client.getIdClient() == 0) {
            return clientCrudRepository.save(client);
        } else {
            return client;
        }
    }

    public Client existClient(Integer idClient) {
        return clientCrudRepository.findById(idClient).orElse(null);
    }

    public Client updateClient(Client client) {
        Client objClient = existClient(client.getIdClient());
        if (objClient == null) {
            return client;
        }

        if (client.getAge() != null)
            objClient.setAge(client.getAge());

        if (client.getPassword() != null)
            objClient.setPassword(client.getPassword());

        if (client.getName() != null)
            objClient.setName(client.getName());

        if (client.getEmail() != null)
            objClient.setEmail(client.getEmail());

        return clientCrudRepository.save(objClient);
    }

    public void delClient(Integer idClient) {
        Client objClient = existClient(idClient);
        if (objClient != null) {
            clientCrudRepository.deleteById(idClient);
        }
    }

    public Client getClient(Integer idClient) {
        return clientCrudRepository.findById(idClient).orElse(null);
    }
}
