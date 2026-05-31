
import { getPatientData } from "./patientService.js";
import { showBookingOverlay } from "./bookingOverlay.js";

export function createDoctorCard(doctor) {
  // Main Card Container
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Get current user role
  const role = localStorage.getItem("userRole");

  // Doctor Info Section
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialty: ${doctor.specialization}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const availability = document.createElement("p");
  availability.textContent = `Available: ${
    Array.isArray(doctor.availability)
      ? doctor.availability.join(", ")
      : doctor.availability
  }`;

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Action Buttons Container
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // Admin Actions
  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.classList.add("delete-btn");

    removeBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(
        `Are you sure you want to delete Dr. ${doctor.name}?`
      );

      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/doctors/${doctor.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete doctor");
        }

        alert("Doctor deleted successfully.");

        // Remove card from DOM
        card.remove();
      } catch (error) {
        console.error(error);
        alert("Unable to delete doctor.");
      }
    });

    actionsDiv.appendChild(removeBtn);
  }

  // Patient (not logged in)
  else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("book-btn");

    bookNow.addEventListener("click", () => {
      alert("Patient needs to login first.");
    });

    actionsDiv.appendChild(bookNow);
  }

  // Logged-in Patient
  else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("book-btn");

    bookNow.addEventListener("click", async (e) => {
      try {
        const token = localStorage.getItem("token");

        const patientData = await getPatientData(token);

        showBookingOverlay(e, doctor, patientData);
      } catch (error) {
        console.error(error);
        alert("Unable to load patient information.");
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  // Final Assembly
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}










// another way-----below::

// // Import required functions
// import { showBookingOverlay } from './loggedPatient.js';
// import { deleteDoctor } from './services/doctorServices.js';
// import { getPatientData } from './services/patientServices.js';

// // Define the function
// // export function createDoctorCard(doctor) {
// //   // Create the main card container
// //   const card = document.createElement("div");
// //   card.classList.add("doctor-card");


//   export function createDoctorCard(doctor) {
//     return `
//       <div class="doctor-card">
//         <h3>${doctor.name}</h3>
//         <p><strong>Specialty:</strong> ${doctor.specialty}</p>
//         <p><strong>Availability:</strong> ${doctor.availability}</p>
//         <button class="view-btn">View Profile</button>
//       </div>
//     `;
//   }


//   // Fetch the user's role
//   const role = localStorage.getItem("userRole");

//   // Create doctor info section
//   const infoDiv = document.createElement("div");
//   infoDiv.classList.add("doctor-info");

//   const name = document.createElement("h3");
//   name.textContent = doctor.name;

//   const specialization = document.createElement("p");
//   specialization.textContent = `Specialization: ${doctor.specialization}`;

//   const email = document.createElement("p");
//   email.textContent = `Email: ${doctor.email}`;

//   const availability = document.createElement("p");
//   availability.textContent = `Available: ${doctor.availableTimes.join(", ")}`;

//   infoDiv.appendChild(name);
//   infoDiv.appendChild(specialization);
//   infoDiv.appendChild(email);
//   infoDiv.appendChild(availability);

//   // Create button container
//   const actionsDiv = document.createElement("div");
//   actionsDiv.classList.add("card-actions");

//   // === Admin Role ===
//   if (role === "admin") {
//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "Delete";
//     removeBtn.classList.add("delete-btn");

//     removeBtn.addEventListener("click", async () => {
//       const confirmed = confirm(`Are you sure you want to delete Dr. ${doctor.name}?`);
//       if (!confirmed) return;

//       const token = localStorage.getItem("token");
//       if (!token) return alert("Admin session expired.");

//       try {
//         const result = await deleteDoctor(doctor.id, token);
//         if (result.success) {
//           alert("Doctor deleted successfully.");
//           card.remove();
//         } else {
//           alert("Failed to delete doctor.");
//         }
//       } catch (error) {
//         console.error(error);
//         alert("Error deleting doctor.");
//       }
//     });

//     actionsDiv.appendChild(removeBtn);
//   }

//   // === Patient (not logged in) ===
//   else if (role === "patient") {
//     const bookNow = document.createElement("button");
//     bookNow.textContent = "Book Now";
//     bookNow.classList.add("book-btn");

//     bookNow.addEventListener("click", () => {
//       alert("Please log in to book an appointment.");
//     });

//     actionsDiv.appendChild(bookNow);
//   }

//   // === Logged-in Patient ===
//   else if (role === "loggedPatient") {
//     const bookNow = document.createElement("button");
//     bookNow.textContent = "Book Now";
//     bookNow.classList.add("book-btn");

//     bookNow.addEventListener("click", async (e) => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Session expired. Please log in again.");
//         return;
//       }

//       try {
//         const patientData = await getPatientData(token);
//         showBookingOverlay(e, doctor, patientData);
//       } catch (error) {
//         console.error(error);
//         alert("Failed to fetch patient data.");
//       }
//     });

//     actionsDiv.appendChild(bookNow);
//   }

//   // Final assembly
//   card.appendChild(infoDiv);
//   card.appendChild(actionsDiv);

//   return card;



//   //