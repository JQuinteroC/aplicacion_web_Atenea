package com.reto03.grupog1.CrudRepository;
import com.reto03.grupog1.Entities.Reservation;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer>{

    public List<Reservation> findAllByStartDateAfterAndStartDateBefore(Date a, Date b);
    
    @Query(value = "SELECT count(*) FROM reservations r WHERE r.status = ?", nativeQuery = true)
    public Integer CountByStatus(String status);

    @Query(value = "SELECT r.idClient, COUNT(r.idClient) FROM reservations r GROUP BY r.idClient ORDER BY COUNT(r.idClient) DESC", nativeQuery = true)
    public List<Object[]> CountTotalReservationsByClient();
}
