package com.reto03.grupog1.Controllers;

import com.reto03.grupog1.Entities.Message;
import com.reto03.grupog1.Services.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/all")
    public List<Message> getAll() {
        return messageService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void addMessage(@RequestBody Message message) {
        messageService.addMessage(message);
    }

    @GetMapping("/{idMessage}")
    public Message get(@PathVariable Integer idMessage) {
        return messageService.getMessage(idMessage);
    }

    @PutMapping("/update")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void update(@RequestBody Message message) {
        messageService.updateMessage(message);
    }

    @DeleteMapping("/{idMessage}")
    @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer idMessage) {
        messageService.delMessage(idMessage);
    }
}
