package com.reto03.grupog1.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog1.Repository.ClientRepository;
import com.reto03.grupog1.Entities.Client;

import java.util.List;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll() {
        return (List<Client>) clientRepository.getAll();
    }

    public Client addClient(Client client) {
        boolean bgrabar = true;

        if (client.getName() == null)
            bgrabar = false;
        if (client.getPassword() == null)
            bgrabar = false;
        if (client.getAge() == null)
            bgrabar = false;
        if (client.getEmail() == null)
            bgrabar = false;

        if (bgrabar)
            return clientRepository.addClient(client);
        else
            return client;
    }

    public Client update(Client client) {
        if (client.getIdClient() != null) {
            Client objClient = clientRepository.getClient(client.getIdClient());

            if (!objClient.equals(null)) {
                if (client.getName() != null) {
                    objClient.setName(client.getName());
                }
                if (client.getPassword() != null) {
                    objClient.setPassword(client.getPassword());
                }
                if (client.getAge() != null) {
                    objClient.setAge(client.getAge());
                }
                if (client.getEmail() != null) {
                    objClient.setEmail(client.getEmail());
                }
                clientRepository.updateClient(objClient);
                return objClient;
            } else {
                return client;
            }
        } else {
            return client;
        }
    }

    public void delClient(Integer idClient) {
        clientRepository.delClient(idClient);
    }

    public Client getClient(Integer idClient) {
        return clientRepository.getClient(idClient);
    }

}
