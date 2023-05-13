package com.reto03.grupog1.Services;

import com.reto03.grupog1.Entities.Car;
import com.reto03.grupog1.Repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {
    @Autowired
    private CarRepository carsRepository;

    public List<Car> getAll() {
        return (List<Car>) carsRepository.getAll();
    }

    public Car addCar(Car car) {
        boolean bgrabar = true;

        if (car.getBrand() == null)
            bgrabar = false;
        if (car.getDescription() == null)
            bgrabar = false;
        if (car.getName() == null)
            bgrabar = false;
        if (car.getYear() == null)
            bgrabar = false;

        if (bgrabar)
            return carsRepository.addCar(car);
        else
            return car;
    }

    public Car updateCar(Car car) {
        boolean bGrabar = true;

        if (car.getIdCar() == null || car.getIdCar() == 0)
            bGrabar = false;

        if (bGrabar)
            return carsRepository.updateCar(car);
        else
            return car;
    }

    public void delCar(Integer idCar) {
        carsRepository.delCar(idCar);
    }

    public Car getCar(Integer idCar) {
        return carsRepository.getCar(idCar);
    }
}
