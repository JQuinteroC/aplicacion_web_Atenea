package com.reto03.grupog1.Repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto03.grupog1.CrudRepository.AdminCrudRepository;
import com.reto03.grupog1.Entities.Admin;

@Repository
public class AdminRepository {
    @Autowired
    private AdminCrudRepository adminCrudRepository;

    public List<Admin> getAll() {
        return (List<Admin>) adminCrudRepository.findAll();
    }

    public Admin addAdmin(Admin admin) {
        if (admin.getIdAdmin() == null || admin.getIdAdmin() == 0) {
            return adminCrudRepository.save(admin);
        } else {
            return admin;
        }
    }
    
    public Admin existAdmin(Integer idAdmin) {
        return adminCrudRepository.findById(idAdmin).orElse(null);
    }

    public Admin updateAdmin(Admin admin) {
        Admin objAdmin = existAdmin(admin.getIdAdmin());
        if (objAdmin == null) {
            return admin;
        }

        if (admin.getName() != null)
            objAdmin.setName(admin.getName());

        if (admin.getPassword() != null)
            objAdmin.setPassword(admin.getPassword());

        if (admin.getEmail() != null)
            objAdmin.setEmail(admin.getEmail());

        return adminCrudRepository.save(objAdmin);
    }

    public void delAdmin(Integer idAdmin) {
        Admin objAdmin = existAdmin(idAdmin);
        if (objAdmin != null) {
            adminCrudRepository.deleteById(idAdmin);
        }
    }

    public Admin getAdmin(Integer idAdmin) {
        return adminCrudRepository.findById(idAdmin).orElse(null);
    }
}
