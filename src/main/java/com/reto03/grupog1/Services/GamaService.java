package com.reto03.grupog1.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto03.grupog1.Repository.GamaRepository;
import com.reto03.grupog1.Entities.Gama;

import java.util.List;

@Service
public class GamaService {
    @Autowired
    private GamaRepository gamaRepository;

    public List<Gama> getAll() {
        return (List<Gama>) gamaRepository.getAll();
    }

    public Gama addGama(Gama gama) {
        boolean bgrabar = true;

        if (gama.getName() == null)
            bgrabar = false;
        if (gama.getDescription() == null)
            bgrabar = false;
        if(bgrabar)
            return gamaRepository.addGama(gama);
        else
            return gama;
    }

    public Gama update(Gama gama) {
        if (gama.getIdGama() != null) {
            Gama objGama = gamaRepository.getGama(gama.getIdGama());
            if (!objGama.equals(null)) {
                if (gama.getName() != null) {
                    objGama.setName(gama.getName());
                }
                if (gama.getDescription() != null) {
                    objGama.setDescription(gama.getDescription());
                }
                gamaRepository.updateGama(objGama);
                return objGama;
            } else {
                return gama;
            }
        } else {
            return gama;
        }
    }

    public boolean delGama(Integer idGama) {
        gamaRepository.delGama(idGama);
        return true;
    }
    
    public Gama getGama(Integer idGama) {
        return gamaRepository.getGama(idGama);
    }
}