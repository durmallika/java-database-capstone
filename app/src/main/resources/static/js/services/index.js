import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';
import { selectRole } from '../render.js';

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

// For example, if:
// export const API_BASE_URL = 'http://localhost:3000';
//then:
// ADMIN_API;  // http://localhost:3000/admin
// DOCTOR_API; // http://localhost:3000/doctor/login


window.onload = function () {
  const adminBtn = document.getElementById('adminLogin');
  const doctorBtn = document.getElementById('doctorLogin');

  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      openModal('adminLogin');
    });
  }

  if (doctorBtn) {
    doctorBtn.addEventListener('click', () => {
      openModal('doctorLogin');
    });
  }
};

async function adminLoginHandler() {
  const username = document.getElementById('adminUsername')?.value.trim();
  const password = document.getElementById('adminPassword')?.value.trim();

  const admin = { username, password };

  try {
    const response = await fetch(ADMIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(admin)
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem('token', data.token);
      selectRole('admin');
    } else {
      alert('Invalid credentials!');
    }
  } catch (error) {
    console.error(error);
    alert('An unexpected error occurred.');
  }
}

async function doctorLoginHandler() {
  const email = document.getElementById('doctorEmail')?.value.trim();
  const password = document.getElementById('doctorPassword')?.value.trim();

  const doctor = { email, password };

  try {
    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doctor)
    });

    if (response.ok) {
      const data = await response.json();

      localStorage.setItem('token', data.token);
      selectRole('doctor');
    } else {
      alert('Invalid credentials!');
    }
  } catch (error) {
    console.error(error);
    alert('An unexpected error occurred.');
  }
}

// Make handlers globally accessible
window.adminLoginHandler = adminLoginHandler;
window.doctorLoginHandler = doctorLoginHandler;
