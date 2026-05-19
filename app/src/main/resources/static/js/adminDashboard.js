/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form
*/

import {
  getDoctors,
  filterDoctors,
  saveDoctor
} from "../services/doctorService.js";

import { createDoctorCard } from "../components/doctorCard.js";
import { openModal, closeModal } from "../utils/modal.js";

const contentDiv = document.getElementById("doctor-content");
const addDoctorBtn = document.getElementById("addDoctorBtn");

const searchBar = document.getElementById("searchDoctor");
const timeFilter = document.getElementById("timeFilter");
const specialtyFilter = document.getElementById("specialtyFilter");

/*
  Attach a click listener to the "Add Doctor" button
  When clicked, it opens a modal form using openModal('addDoctor')
*/
addDoctorBtn?.addEventListener("click", () => {
  openModal("addDoctor");
});

/*
  When the DOM is fully loaded:
    - Call loadDoctorCards() to fetch and display all doctors
*/
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
});

/*
  Function: loadDoctorCards
  Purpose: Fetch all doctors and display them as cards
*/
async function loadDoctorCards() {
  try {
    // Call getDoctors() from the service layer
    const doctors = await getDoctors();

    // Clear the current content area
    contentDiv.innerHTML = "";

    // Render doctor cards
    doctors.forEach((doctor) => {
      const card = createDoctorCard(doctor);
      contentDiv.appendChild(card);
    });
  } catch (error) {
    // Handle any fetch errors by logging them
    console.error("Error loading doctors:", error);
  }
}

/*
  Attach 'input' and 'change' event listeners to the search bar and filter dropdowns
  On any input change, call filterDoctorsOnChange()
*/
searchBar?.addEventListener("input", filterDoctorsOnChange);
timeFilter?.addEventListener("change", filterDoctorsOnChange);
specialtyFilter?.addEventListener("change", filterDoctorsOnChange);

/*
  Function: filterDoctorsOnChange
  Purpose: Filter doctors based on name, available time, and specialty
*/
async function filterDoctorsOnChange() {
  try {
    // Read values from the search bar and filters
    let name = searchBar.value.trim();
    let time = timeFilter.value;
    let specialty = specialtyFilter.value;

    // Normalize empty values to null
    name = name || null;
    time = time || null;
    specialty = specialty || null;

    // Call filterDoctors(name, time, specialty) from the service
    const doctors = await filterDoctors(name, time, specialty);

    // If doctors are found
    if (doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      // Show no results message
      contentDiv.innerHTML = `
        <p class="no-results">
          No doctors found with the given filters.
        </p>
      `;
    }
  } catch (error) {
    // Catch and display any errors
    console.error("Filter error:", error);
    alert("Failed to filter doctors.");
  }
}

/*
  Function: renderDoctorCards
  Purpose: A helper function to render a list of doctors passed to it
*/
function renderDoctorCards(doctors) {
  // Clear the content area
  contentDiv.innerHTML = "";

  // Loop through the doctors and append each card
  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

/*
  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor to the system
*/
async function adminAddDoctor() {
  try {
    // Collect input values from the modal form
    const name = document.getElementById("doctorName").value.trim();
    const email = document.getElementById("doctorEmail").value.trim();
    const phone = document.getElementById("doctorPhone").value.trim();
    const password = document.getElementById("doctorPassword").value.trim();
    const specialty = document
      .getElementById("doctorSpecialty")
      .value.trim();

    // Get available times (comma separated)
    const availableTimesInput = document
      .getElementById("doctorAvailableTimes")
      .value.trim();

    const availableTimes = availableTimesInput
      .split(",")
      .map((time) => time.trim())
      .filter((time) => time !== "");

    // Retrieve authentication token from localStorage
    const token = localStorage.getItem("token");

    // If no token exists
    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    // Build doctor object
    const doctor = {
      name,
      email,
      phone,
      password,
      specialty,
      availableTimes
    };

    // Call saveDoctor from service
    const response = await saveDoctor(doctor, token);

    // If successful
    if (response) {
      alert("Doctor added successfully!");

      // Close modal
      closeModal("addDoctor");

      // Reload page
      window.location.reload();
    }
  } catch (error) {
    console.error("Error saving doctor:", error);
    alert("Failed to add doctor.");
  }
}

// Make function globally accessible if needed
window.adminAddDoctor = adminAddDoctor;





