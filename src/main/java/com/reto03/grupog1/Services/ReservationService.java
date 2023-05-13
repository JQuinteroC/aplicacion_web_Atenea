package com.reto03.grupog1.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog1.CrudRepository.ClientCrudRepository;
import com.reto03.grupog1.DTO.ClientReport;
import com.reto03.grupog1.DTO.StatusReport;
import com.reto03.grupog1.Entities.Client;
import com.reto03.grupog1.Entities.Reservation;
import com.reto03.grupog1.Repository.ReservationRepository;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private ClientCrudRepository clientCrudRepository;

    public List<Reservation> getAll() {
        return (List<Reservation>) reservationRepository.getAll();
    }

    public Reservation getReservation(Integer idReservation) {
        return reservationRepository.getReservation(idReservation);
    }

    public Reservation addReservation(Reservation reservation) {
        boolean bGrabar = true;

        if (reservation.getStartDate() == null)
            bGrabar = false;

        if (reservation.getDevolutionDate() == null)
            bGrabar = false;

        if (reservation.getStatus() == null)
            reservation.setStatus("created");

        if (reservation.getClient().getIdClient() == null)
            bGrabar = false;

        if (reservation.getCar().getIdCar() == null)
            bGrabar = false;

        if (bGrabar) {
            return reservationRepository.addReservation(reservation);
        } else {
            return reservation;
        }
    }

    public void delete(Integer idReservation) {
        reservationRepository.delReservation(idReservation);
    }

    public Reservation update(Reservation reservation) {
        boolean bGrabar = true;

        if (reservation.getStartDate() == null)
            bGrabar = false;

        if (reservation.getDevolutionDate() == null)
            bGrabar = false;

        if (reservation.getStatus() == null)
            reservation.setStatus("created");

        if (reservation.getClient().getIdClient() == null)
            bGrabar = false;

        if (reservation.getCar().getIdCar() == null)
            bGrabar = false;

        if (bGrabar) {
            return reservationRepository.updateReservation(reservation);
        } else {
            return reservation;
        }
    }

    public List<Reservation> getReservationsPeriod(String dateOne, String dateTwo) {
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date a = new Date();
        Date b = new Date();

        try {
            a = parser.parse(dateOne);
            b = parser.parse(dateTwo);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if (a.before(b)) {
            return reservationRepository.getReservationsPeriod(a, b);
        } else {
            return new ArrayList<>();
        }
    }

    public StatusReport getStatusReport() {
        Integer completos = reservationRepository.CountByStatus("completed");
        Integer cancelados = reservationRepository.CountByStatus("cancelled");

        StatusReport statusReport = new StatusReport(completos, cancelados);
        return statusReport;
    }

    public List<ClientReport> getTopClients() {
        List<Object[]> report = reservationRepository.countTotalReservationsByClient();

        List<ClientReport> clientReports = new ArrayList<>();
                
        for (int i = 0; i < report.size(); i++) {
            Integer cantidad = Integer.parseInt(report.get(i)[1].toString());
            Client client = clientCrudRepository.findById(Integer.parseInt(report.get(i)[0].toString())).orElse(null);

            clientReports.add(new ClientReport(cantidad, client));
        }

        return clientReports;
    }
}
