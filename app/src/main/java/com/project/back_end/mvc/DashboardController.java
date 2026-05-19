package com.project.back_end.mvc;


import com.project.back_end.services.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Controller
public class DashboardController {


        @Autowired
        private Service service;

        // Admin Dashboard Route
        @GetMapping("/adminDashboard/{token}")
        public String adminDashboard(@PathVariable String token) {

            String validationResult = service.validateToken(token, "admin");

            if (validationResult == null || validationResult.isEmpty()) {
                return "admin/adminDashboard";
            }

            return "redirect:/";
        }

        // Doctor Dashboard Route
        @GetMapping("/doctorDashboard/{token}")
        public String doctorDashboard(@PathVariable String token) {

            String validationResult = service.validateToken(token, "doctor");

            if (validationResult == null || validationResult.isEmpty()) {
                return "doctor/doctorDashboard";
            }

            return "redirect:/";
        }


}
