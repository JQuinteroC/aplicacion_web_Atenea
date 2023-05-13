package com.reto03.grupog1.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog1.Entities.Car;
import com.reto03.grupog1.CrudRepository.CarCrudRepository;

import java.util.List;

@Repository
public class CarRepository {
    @Autowired
    private CarCrudRepository carsCrudRepository;

    public List<Car> getAll() {
        return (List<Car>) carsCrudRepository.findAll();
    }

    public Car addCar(Car car) {
        if (car.getIdCar() == null || car.getIdCar() == 0) {
            return carsCrudRepository.save(car);
        } else {
            return car;
        }
    }

    public Car existCar(Integer idCar) {
        return carsCrudRepository.findById(idCar).orElse(null);
    }

    public Car updateCar(Car car) {
        Car objCar = existCar(car.getIdCar());
        if (objCar == null) {
            return car;
        }

        if (car.getBrand() != null)
            objCar.setBrand(car.getBrand());

        if (car.getDescription() != null)
            objCar.setDescription(car.getDescription());

        if (car.getName() != null)
            objCar.setName(car.getName());

        if (car.getYear() != null)
            objCar.setYear(car.getYear());

        return carsCrudRepository.save(objCar);
    }

    public void delCar(Integer idCar) {
        Car objCar = existCar(idCar);
        if (objCar != null) {
            carsCrudRepository.deleteById(idCar);
        }
    }

    public Car getCar(Integer idCar) {
        return carsCrudRepository.findById(idCar).orElse(null);
    }
}
