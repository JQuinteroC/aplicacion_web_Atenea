package com.reto03.grupog1.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.reto03.grupog1.Entities.Admin;
import com.reto03.grupog1.Services.AdminService;

@RestController
@RequestMapping("/api/Admin")
public class AdminController {
    
    @Autowired
    private AdminService adminService;

    @GetMapping("/all")
    public List<Admin> getAll() {
        return adminService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void addAdmin(@RequestBody Admin admin) {
        adminService.addAdmin(admin);
    }

    @GetMapping("/{idAdmin}")
    public Admin get(@PathVariable Integer idAdmin) {
        return adminService.getAdmin(idAdmin);
    }

    @PutMapping("/update")
    @ResponseStatus(org.springframework.http.HttpStatus.CREATED)
    public void updateAdmin(@RequestBody Admin admin) {
        adminService.updateAdmin(admin);
    }

    @DeleteMapping("/{idAdmin}")
    @ResponseStatus(org.springframework.http.HttpStatus.NO_CONTENT)
    public void deleteAdmin(@PathVariable Integer idAdmin) {
        adminService.delAdmin(idAdmin);
    }
}
