package com.reto03.grupog1.Services;

import com.reto03.grupog1.Entities.Message;
import com.reto03.grupog1.Repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepositor;

    public List<Message> getAll() {
        return (List<Message>) messageRepositor.getAll();
    }

    public Message addMessage(Message message) {
        boolean bgrabar = true;

        if (message.getCar() == null)
            bgrabar = false;
        if (message.getClient() == null)
            bgrabar = false;
        if (message.getMessageText() == null)
            bgrabar = false;

        if (bgrabar)
            return messageRepositor.addMessage(message);
        else
            return message;
    }

    public Message updateMessage(Message message) {
        boolean bGrabar = true;

        if (message.getIdMessage() == null || message.getIdMessage() == 0)
            bGrabar = false;

        if (bGrabar)
            return messageRepositor.updateMessage(message);
        else
            return message;
    }

    public void delMessage(Integer idMessage) {
        messageRepositor.delMessage(idMessage);
    }

    public Message getMessage(Integer idMessage) {
        return messageRepositor.getMessage(idMessage);
    }
}
