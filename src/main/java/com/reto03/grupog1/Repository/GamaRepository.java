package com.reto03.grupog1.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog1.CrudRepository.GamaCrudRepository;
import com.reto03.grupog1.Entities.Gama;

@Repository
public class GamaRepository {
    @Autowired
    private GamaCrudRepository gamaCrudRepository;

    public List<Gama> getAll() {
        return (List<Gama>) gamaCrudRepository.findAll();
    }

    public Gama getGama(Integer idGama) {
        return gamaCrudRepository.findById(idGama).orElse(null);
    }

    public Gama addGama(Gama gama) {
        if (gama.getIdGama() == null || gama.getIdGama() == 0) {
            return gamaCrudRepository.save(gama);
        } else {
            return gama;
        }
    }

    public Gama existGama(Integer idGama) {
        return gamaCrudRepository.findById(idGama).orElse(null);
    }

    public Gama updateGama(Gama gama) {
        Gama objGama = existGama(gama.getIdGama());
        if (objGama == null) {
            return gama;
        }

        if (gama.getName() != null)
            objGama.setName(gama.getName());

        if (gama.getDescription() != null)
            objGama.setDescription(gama.getDescription());

        return gamaCrudRepository.save(objGama);
    }

    public void delGama(Integer idGama) {
        gamaCrudRepository.deleteById(idGama);
    }
}
