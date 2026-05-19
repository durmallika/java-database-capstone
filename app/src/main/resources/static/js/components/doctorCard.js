import { openBookingOverlay } from "./loggedPatient.js";
import { deleteDoctor } from "./doctorServices.js";
import { fetchPatientDetails } from "./patientServices.js";

export function createDoctorCard(doctor) {
  // Main container
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Get role from localStorage
  const role = localStorage.getItem("role"); // "admin", "patient", or null

  // Doctor info container
  const infoContainer = document.createElement("div");
  infoContainer.classList.add("doctor-info");

  // Name
  const nameEl = document.createElement("h3");
  nameEl.textContent = doctor.name;

  // Specialization
  const specEl = document.createElement("p");
  specEl.textContent = `Specialization: ${doctor.specialization}`;

  // Email
  const emailEl = document.createElement("p");
  emailEl.textContent = `Email: ${doctor.email}`;

  // Available times
  const timesEl = document.createElement("ul");
  timesEl.classList.add("available-times");

  (doctor.availableTimes || []).forEach(time => {
    const li = document.createElement("li");
    li.textContent = time;
    timesEl.appendChild(li);
  });

  // Append info
  infoContainer.appendChild(nameEl);
  infoContainer.appendChild(specEl);
  infoContainer.appendChild(emailEl);
  infoContainer.appendChild(timesEl);

  // Actions container
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("doctor-actions");

  /* ================= ADMIN ROLE ================= */
  if (role === "admin") {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Doctor";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", async () => {
      const confirmDelete = confirm("Are you sure you want to delete this doctor?");
      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("adminToken");
        const res = await deleteDoctor(doctor.id, token);

        alert(res.message || "Doctor deleted successfully");

        // Remove card from DOM if successful
        card.remove();
      } catch (err) {
        console.error(err);
        alert("Failed to delete doctor");
      }
    });

    actionsContainer.appendChild(deleteBtn);
  }

  /* ============== NOT LOGGED IN PATIENT ============== */
  else if (!role) {
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.classList.add("book-btn");

    bookBtn.addEventListener("click", () => {
      alert("Please log in to book an appointment.");
    });

    actionsContainer.appendChild(bookBtn);
  }

  /* ============== LOGGED-IN PATIENT ============== */
  else if (role === "patient") {
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Now";
    bookBtn.classList.add("book-btn");

    bookBtn.addEventListener("click", async () => {
      try {
        const token = localStorage.getItem("patientToken");

        if (!token) {
          alert("Session expired. Please log in again.");
          return (window.location.href = "/login");
        }

        const patient = await fetchPatientDetails(token);

        openBookingOverlay({
          doctor,
          patient
        });

      } catch (err) {
        console.error(err);
        alert("Unable to start booking process.");
      }
    });

    actionsContainer.appendChild(bookBtn);
  }

  // Append everything
  card.appendChild(infoContainer);
  card.appendChild(actionsContainer);

  return card;
}