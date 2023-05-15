package com.reto03.grupog1.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reto03.grupog1.Entities.Gama;
import com.reto03.grupog1.Services.GamaService;

@RestController
@RequestMapping("/api/Gama")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class GamaController {
    @Autowired
    private GamaService gamaService;

    @GetMapping("/all")
    public List<Gama> getGamas() {
        return (List<Gama>) gamaService.getAll();
    }

    @GetMapping("/{idGama}")
    public Gama getGama(@PathVariable Integer idGama) {
        return gamaService.getGama(idGama);
    }

    @PostMapping("/save")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void save(@RequestBody Gama gama) {
        gamaService.addGama(gama);
    }

    @PutMapping("/update")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void update(@RequestBody Gama gama) {
        gamaService.update(gama);
    }

    @DeleteMapping("/{idGama}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer idGama) {
        gamaService.delGama(idGama);
    }
}
