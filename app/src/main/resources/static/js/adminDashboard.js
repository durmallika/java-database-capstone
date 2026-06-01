
// adminDashboard.js

import { openModal } from "./components/modals.js";
import {
    getDoctors,
    filterDoctors,
    saveDoctor
} from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

/**
 * Render doctor cards
 * @param {Array} doctors
 */
const renderDoctorCards = (doctors) => {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    if (!doctors || doctors.length === 0) {
        contentDiv.innerHTML = `
            <div class="no-results">
                <h3>No doctors found</h3>
            </div>
        `;
        return;
    }

    doctors.forEach((doctor) => {
        const doctorCard = createDoctorCard(doctor);
        contentDiv.appendChild(doctorCard);
    });
};

/**
 * Load all doctors from backend
 */
const loadDoctorCards = async () => {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Error loading doctors:", error);
    }
};

/**
 * Search and filter doctors
 */
const filterDoctorsOnChange = async () => {
    try {
        const name =
            document.getElementById("searchBar")?.value.trim() || "";

        const time =
            document.getElementById("filterTime")?.value || "";

        const specialty =
            document.getElementById("filterSpecialty")?.value || "";

        const filteredDoctors = await filterDoctors(
            name,
            time,
            specialty
        );

        renderDoctorCards(filteredDoctors);
    } catch (error) {
        console.error("Error filtering doctors:", error);
    }
};

/**
 * Add new doctor
 */
const adminAddDoctor = async (event) => {
    event.preventDefault();

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Admin authentication required.");
            return;
        }

        // Collect availability checkbox values
        const availability = Array.from(
            document.querySelectorAll(
                'input[name="availability"]:checked'
            )
        ).map((checkbox) => checkbox.value);

        const doctor = {
            name: document.getElementById("doctorName").value.trim(),
            specialty: document.getElementById("doctorSpecialty").value,
            email: document.getElementById("doctorEmail").value.trim(),
            password: document.getElementById("doctorPassword").value,
            mobile: document.getElementById("doctorMobile").value.trim(),
            availability
        };

        const result = await saveDoctor(doctor, token);

        if (result.success) {
            alert(result.message || "Doctor added successfully");

            // Close modal
            const modal = document.getElementById("addDoctorModal");
            if (modal) {
                modal.style.display = "none";
            }

            // Refresh doctor list
            await loadDoctorCards();

            // Reset form
            document
                .getElementById("addDoctorForm")
                ?.reset();
        } else {
            alert(result.message || "Failed to add doctor");
        }
    } catch (error) {
        console.error("Error adding doctor:", error);
        alert("Something went wrong while adding the doctor.");
    }
};

/**
 * Event bindings after page load
 */
document.addEventListener("DOMContentLoaded", () => {
    // Load doctors
    loadDoctorCards();

    // Add Doctor Button
    document
        .getElementById("addDocBtn")
        ?.addEventListener("click", () => {
            openModal("addDoctor");
        });

    // Search bar
    document
        .getElementById("searchBar")
        ?.addEventListener("input", filterDoctorsOnChange);

    // Time filter
    document
        .getElementById("filterTime")
        ?.addEventListener("change", filterDoctorsOnChange);

    // Specialty filter
    document
        .getElementById("filterSpecialty")
        ?.addEventListener("change", filterDoctorsOnChange);

    // Add doctor form submit
    document
        .getElementById("addDoctorForm")
        ?.addEventListener("submit", adminAddDoctor);
});

// Export functions if needed elsewhere
export {
    loadDoctorCards,
    renderDoctorCards,
    filterDoctorsOnChange,
    adminAddDoctor
};










//another way----

// const content = document.getElementById("content");
// const searchBar = document.getElementById("searchBar");
// const timeFilter = document.getElementById("timeFilter");
// const specialtyFilter = document.getElementById("specialtyFilter");

// const doctors = [
//   {
//     name: "Dr. Sarah Johnson",
//     specialty: "Cardiologist",
//     availability: "AM"
//   },
//   {
//     name: "Dr. Michael Lee",
//     specialty: "Dentist",
//     availability: "PM"
//   },
//   {
//     name: "Dr. Emily Brown",
//     specialty: "Neurologist",
//     availability: "AM"
//   }
// ];

// function renderDoctors(filteredDoctors) {
//   content.innerHTML = "";

//   filteredDoctors.forEach((doctor) => {
//     const card = document.createElement("div");
//     card.classList.add("doctor-card");

//     card.innerHTML = `
//       <h3>${doctor.name}</h3>
//       <p><strong>Specialty:</strong> ${doctor.specialty}</p>
//       <p><strong>Availability:</strong> ${doctor.availability}</p>
//       <button class="view-btn">View Details</button>
//     `;

//     content.appendChild(card);
//   });
// }

// function filterDoctors() {
//   const searchValue = searchBar.value.toLowerCase();
//   const timeValue = timeFilter.value;
//   const specialtyValue = specialtyFilter.value;

//   const filtered = doctors.filter((doctor) => {
//     const matchesSearch = doctor.name.toLowerCase().includes(searchValue);
//     const matchesTime = !timeValue || doctor.availability === timeValue;
//     const matchesSpecialty =
//       !specialtyValue || doctor.specialty === specialtyValue;

//     return matchesSearch && matchesTime && matchesSpecialty;
//   });

//   renderDoctors(filtered);
// }

// searchBar.addEventListener("input", filterDoctors);
// timeFilter.addEventListener("change", filterDoctors);
// specialtyFilter.addEventListener("change", filterDoctors);

// renderDoctors(doctors);
