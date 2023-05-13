package com.reto03.grupog1.Services;

import com.reto03.grupog1.Entities.Admin;
import com.reto03.grupog1.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminsRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminsRepository.getAll();
    }

    public Admin addAdmin(Admin admin) {
        boolean bgrabar = true;

        if (admin.getEmail() == null)
            bgrabar = false;
        if (admin.getName() == null)
            bgrabar = false;
        if (admin.getPassword() == null)
            bgrabar = false;

        if (bgrabar)
            return adminsRepository.addAdmin(admin);
        else
            return admin;
    }

    public Admin updateAdmin(Admin admin) {
        boolean bGrabar = true;

        if (admin.getIdAdmin() == null || admin.getIdAdmin() == 0)
            bGrabar = false;

        if (bGrabar)
            return adminsRepository.updateAdmin(admin);
        else
            return admin;
    }

    public void delAdmin(Integer idAdmin) {
        adminsRepository.delAdmin(idAdmin);
    }

    public Admin getAdmin(Integer idAdmin) {
        return adminsRepository.getAdmin(idAdmin);
    }
}
