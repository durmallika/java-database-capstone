
// patientServices.js

import { API_BASE_URL } from "../config/config.js";

// Base endpoint for all patient-related API requests
const PATIENT_API = `${API_BASE_URL}/patient`;

/**
 * Register a new patient
 * @param {Object} data
 * @returns {Promise<{success:boolean,message:string}>}
 */
export const patientSignup = async (data) => {
    try {
        // Send signup request
        const response = await fetch(`${PATIENT_API}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Parse response
        const result = await response.json();

        return {
            success: response.ok,
            message: result.message || "Signup successful",
        };
    } catch (error) {
        console.error("Patient signup error:", error);

        return {
            success: false,
            message: "Unable to complete signup. Please try again.",
        };
    }
};

/**
 * Authenticate a patient
 * @param {Object} data
 * @returns {Promise<Response|null>}
 */
export const patientLogin = async (data) => {
    try {
        // Development only
        console.log("Login Data:", data);

        // Send login request
        const response = await fetch(`${PATIENT_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Return full response for frontend handling
        return response;
    } catch (error) {
        console.error("Patient login error:", error);
        return null;
    }
};

/**
 * Fetch logged-in patient information
 * @param {string} token
 * @returns {Promise<Object|null>}
 */
export const getPatientData = async (token) => {
    try {
        // Request patient profile data
        const response = await fetch(`${PATIENT_API}/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch patient data");
        }

        const data = await response.json();

        return data.patient || data;
    } catch (error) {
        console.error("Error fetching patient data:", error);
        return null;
    }
};

/**
 * Fetch appointments for patient or doctor dashboard
 * @param {string} id
 * @param {string} token
 * @param {string} user
 * @returns {Promise<Array|null>}
 */
export const getPatientAppointments = async (
    id,
    token,
    user
) => {
    try {
        // Dynamic endpoint based on requesting user role
        const endpoint = `${PATIENT_API}/appointments/${user}/${id}`;

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();

        return data.appointments || [];
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return null;
    }
};

/**
 * Filter appointments by condition and patient name
 * @param {string} condition
 * @param {string} name
 * @param {string} token
 * @returns {Promise<Array>}
 */
export const filterAppointments = async (
    condition = "",
    name = "",
    token
) => {
    try {
        // Build query parameters
        const queryParams = new URLSearchParams();

        if (condition) queryParams.append("condition", condition);
        if (name) queryParams.append("name", name);

        const url = `${PATIENT_API}/appointments/filter?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to filter appointments");
        }

        const data = await response.json();

        return data.appointments || [];
    } catch (error) {
        console.error("Error filtering appointments:", error);

        alert("Unable to filter appointments at this time.");

        return [];
    }
};









//another way--------

// import { openModal } from './modal.js';
// import { BASE_API_URL } from './config.js';

// const ADMIN_API = `${BASE_API_URL}/admin/login`;
// const DOCTOR_API = `${BASE_API_URL}/doctor/login`;

// window.onload = () => {
//   const adminLoginBtn = document.getElementById('adminLogin');
//   const doctorLoginBtn = document.getElementById('doctorLogin');

//   if (adminLoginBtn) {
//     adminLoginBtn.addEventListener('click', () => openModal('adminLogin'));
//   }

//   if (doctorLoginBtn) {
//     doctorLoginBtn.addEventListener('click', () => openModal('doctorLogin'));
//   }
// };

// window.adminLoginHandler = async () => {
//   const username = document.getElementById('adminUsername').value;
//   const password = document.getElementById('adminPassword').value;

//   const admin = { username, password };

//   try {
//     const response = await fetch(ADMIN_API, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(admin),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       localStorage.setItem('token', data.token);
//       selectRole('admin');
//     } else {
//       alert('Invalid admin credentials. Please try again.');
//     }
//   } catch (error) {
//     console.error('Admin login error:', error);
//     alert('An error occurred during admin login. Please try again later.');
//   }
// };

// window.doctorLoginHandler = async () => {
//   const email = document.getElementById('doctorEmail').value;
//   const password = document.getElementById('doctorPassword').value;

//   const doctor = { email, password };

//   try {
//     const response = await fetch(DOCTOR_API, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(doctor),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       localStorage.setItem('token', data.token);
//       selectRole('doctor');
//     } else {
//       alert('Invalid doctor credentials. Please try again.');
//     }
//   } catch (error) {
//     console.error('Doctor login error:', error);
//     alert('An error occurred during doctor login. Please try again later.');
//   }
// };