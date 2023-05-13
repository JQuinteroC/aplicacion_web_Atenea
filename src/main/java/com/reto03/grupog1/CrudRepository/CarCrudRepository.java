package com.reto03.grupog1.CrudRepository;

import com.reto03.grupog1.Entities.Car;
import org.springframework.data.repository.CrudRepository;

public interface CarCrudRepository extends CrudRepository<Car, Integer> {
}
