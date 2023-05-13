package com.reto03.grupog1.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog1.CrudRepository.MessageCrudRepository;
import com.reto03.grupog1.Entities.Car;
import com.reto03.grupog1.Entities.Client;
import com.reto03.grupog1.Entities.Message;

@Repository
public class MessageRepository {
    @Autowired
    private MessageCrudRepository messageCrudRepository;

    public List<Message> getAll() {
        return (List<Message>) messageCrudRepository.findAll();
    }

    public Message addMessage(Message message) {
        if (message.getIdMessage() == null || message.getIdMessage() == 0) {
            return messageCrudRepository.save(message);
        } else {
            return message;
        }
    }

    public Message existMessage(Integer idMessage) {
        return messageCrudRepository.findById(idMessage).orElse(null);
    }

    public Message updateMessage(Message message) {
        Client client = new Client();
        Car car = new Car();

        Message objMessage = existMessage(message.getIdMessage());
        if (objMessage == null) {
            return message;
        }

        if (message.getMessageText() != null)
            objMessage.setMessageText(message.getMessageText());

        if (message.getClient().getIdClient() != null) {
            client.setIdClient(message.getClient().getIdClient());
            objMessage.setClient(client);
        }

        if (message.getCar().getIdCar() != null) {
            car.setIdCar(message.getCar().getIdCar());
            objMessage.setCar(car);
        }

        return messageCrudRepository.save(objMessage);
    }

    public void delMessage(Integer idMessage) {
        Message objMessage = existMessage(idMessage);
        if (objMessage != null) {
            messageCrudRepository.deleteById(idMessage);
        }
    }

    public Message getMessage(Integer idMessage) {
        return messageCrudRepository.findById(idMessage).orElse(null);
    }
}
