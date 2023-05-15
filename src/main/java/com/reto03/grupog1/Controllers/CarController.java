package com.reto03.grupog1.Controllers;

import com.reto03.grupog1.Entities.Car;
import com.reto03.grupog1.Services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Car")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class CarController {

    @Autowired
    private CarService carsService;

    @GetMapping("/all")
    public List<Car> getAll() {
        return carsService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void addCar(@RequestBody Car car) {
        System.out.println(car);
        carsService.addCar(car);
    }

    @GetMapping("/{idCar}")
    public Car get(@PathVariable Integer idCar) {
        return carsService.getCar(idCar);
    }

    @PutMapping("/update")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void update(@RequestBody Car car) {
        carsService.updateCar(car);
    }

    @DeleteMapping("/{idCar}")
    @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer idCar) {
        carsService.delCar(idCar);
    }
}
