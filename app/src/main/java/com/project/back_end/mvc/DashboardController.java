//A Thymeleaf DashboardController

package com.project.back_end.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.back_end.services.AppService;
import com.project.back_end.services.TokenService;

@Controller
public class DashboardController {

    private AppService appService;  //

    @Autowired
    private TokenService tokenService;

    /**
     * Admin Dashboard
     */
    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {

        boolean isValid = tokenService.validateToken(token, "admin");  //User visits:  /adminDashboard/{token}

        if (isValid) {
            return "admin/adminDashboard";
        }

        return "redirect:http://localhost:8080";
    }

    /**
     * Doctor Dashboard
     */
    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {

        boolean isValid = tokenService.validateToken(token, "doctor"); //User visits:  /doctorDashboard/{token}

        if (isValid) {
            return "doctor/doctorDashboard";
        }

        return "redirect:http://localhost:8080";
    }
}


/* Notes:::

//How it works // (How this (Thymeleaf ) DashboardController works:: )
1.

User visits:  /adminDashboard/{token}
User visits:  /doctorDashboard/{token}

2. The controller extracts the JWT token from the URL using @PathVariable.
3. Then, It calls:

tokenService.validateToken(token, "admin");

or
tokenService.validateToken(token, "doctor");


	4	Inside TokenService:
	◦	The token signature is verified.
	◦	The email/username is extracted.
	◦	The corresponding repository is queried.
	◦	true is returned if the user exists and the token is valid.
	5	If valid:
	◦	Returns the Thymeleaf view:
	▪	admin/adminDashboard
	▪	doctor/doctorDashboard
	6	If invalid:
	◦	Redirects to:

http://localhost:8080

….

//
Inside TokenService:
The token signature is verified.
The email/username is extracted.
The corresponding repository is queried.
true is returned if the user exists and the token is valid.
If valid:
Returns the Thymeleaf view:
admin/adminDashboard
doctor/doctorDashboard
If invalid:
Redirects to:
http://localhost:8080

 */

