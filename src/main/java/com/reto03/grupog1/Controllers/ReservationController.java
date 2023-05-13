package com.reto03.grupog1.Controllers;

import java.util.List;

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

import com.reto03.grupog1.DTO.ClientReport;
import com.reto03.grupog1.DTO.StatusReport;
import com.reto03.grupog1.Entities.Reservation;
import com.reto03.grupog1.Services.ReservationService;

@RestController
@RequestMapping("/api/Reservation")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/all")
    public List<Reservation> getReservations() {
        return (List<Reservation>) reservationService.getAll();
    }

    @GetMapping("/{idReservation}")
    public Reservation getReservation(@PathVariable Integer idReservation) {
        return reservationService.getReservation(idReservation);
    }

    @PostMapping("/save")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void save(@RequestBody Reservation reservation) {
        reservationService.addReservation(reservation);
    }

    @PutMapping("/update")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void update(@RequestBody Reservation reservation) {
        reservationService.update(reservation);
    }

    @DeleteMapping("/{idReservation}")
    @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer idReservation) {
        reservationService.delete(idReservation);
    }

    @GetMapping("/report-dates/{dateOne}/{dateTwo}")
    public List<Reservation> getReservationsReportDates(@PathVariable("dateOne") String dateOne,
            @PathVariable("dateTwo") String dateTwo) {
        return reservationService.getReservationsPeriod(dateOne, dateTwo);
    }

    @GetMapping("/report-status")
    public StatusReport getStatusReport() {
        return reservationService.getStatusReport();
    }

    @GetMapping("/report-clients")
    public List<ClientReport> getClientReport() {
        return reservationService.getTopClients();
    }
}
