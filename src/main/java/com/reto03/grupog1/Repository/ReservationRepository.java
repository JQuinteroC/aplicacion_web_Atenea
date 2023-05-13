package com.reto03.grupog1.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog1.CrudRepository.ReservationCrudRepository;
import com.reto03.grupog1.Entities.Car;
import com.reto03.grupog1.Entities.Client;
import com.reto03.grupog1.Entities.Reservation;

@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Reservation getReservation(Integer idReservation) {
        return reservationCrudRepository.findById(idReservation).orElse(null);
    }

    public Reservation addReservation(Reservation reservation) {
        if (reservation.getIdReservation() == null || reservation.getIdReservation() == 0) {
            return reservationCrudRepository.save(reservation);
        } else {
            return reservation;
        }
    }

    public Reservation updateReservation(Reservation reservation) {
        Client client = new Client();
        Car car = new Car();

        Reservation objReservation = getReservation(reservation.getIdReservation());
        if (objReservation == null) {
            return reservation;
        }

        if (reservation.getStartDate() != null)
            objReservation.setStartDate(reservation.getStartDate());

        if (reservation.getDevolutionDate() != null)
            objReservation.setDevolutionDate(reservation.getDevolutionDate());

        if (reservation.getStatus() != null)
            objReservation.setStatus(reservation.getStatus());

        if (reservation.getClient().getIdClient() != null) {
            client.setIdClient(reservation.getClient().getIdClient());
            reservation.setClient(client);
        }

        if (reservation.getCar().getIdCar() != null) {
            car.setIdCar(reservation.getCar().getIdCar());
            reservation.setCar(car);
        }

        return reservationCrudRepository.save(objReservation);
    }

    public void delReservation(Integer idReservation) {
        reservationCrudRepository.deleteById(idReservation);
    }

    public List<Reservation> getReservationsPeriod(Date dateStart, Date dateFinal) {
        return reservationCrudRepository.findAllByStartDateAfterAndStartDateBefore(dateStart, dateFinal);
    }

    public Integer CountByStatus(String status) {
        return reservationCrudRepository.CountByStatus(status);
    }

    public List<Object[]> countTotalReservationsByClient() {
        return reservationCrudRepository.CountTotalReservationsByClient();
    }
}
