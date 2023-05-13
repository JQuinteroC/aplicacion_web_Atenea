package com.reto03.grupog1.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.reto03.grupog1.Services.ClientService;
import com.reto03.grupog1.Entities.Client;
import java.util.List;

@RestController
@RequestMapping("/api/Client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all")
    public List<Client> getAll() {
        return (List<Client>) clientService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void addClient(@RequestBody Client client) {
        clientService.addClient(client);
    }

    @GetMapping("/{idClient}")
    public Client get(@PathVariable Integer idClient) {
        return clientService.getClient(idClient);
    }

    @PutMapping("/update")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void update(@RequestBody Client client) {
        clientService.update(client);
    }

    @DeleteMapping("/{idClient}")
    @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer idClient) {
        clientService.delClient(idClient);
    }
}
