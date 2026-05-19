/*
Import getAllAppointments to fetch appointments from the backend.
Import createPatientRow to generate a table row for each appointment.
*/
import { getAllAppointments } from "../services/appointmentService.js";
import { createPatientRow } from "../components/createPatientRow.js";

/*
Get the table body where appointment rows will be rendered.
*/
const tableBody = document.querySelector("#appointments-table-body");

/*
Initialize selectedDate with today's date in YYYY-MM-DD format.
*/
let selectedDate = new Date().toISOString().split("T")[0];

/*
Retrieve the authentication token from localStorage.
*/
const token = localStorage.getItem("token");

/*
Initialize patientName as null.
This value is used as an optional filter when searching appointments.
*/
let patientName = null;

/*
Search bar event listener:
- Triggered whenever the user types in the search field.
- Updates patientName based on the input value.
- Reloads appointments using the updated filter.
*/
document.querySelector("#search-bar").addEventListener("input", (e) => {
const value = e.target.value.trim();

patientName = value !== "" ? value : null;

loadAppointments();
});

/*
"Today" button event listener:
- Resets selectedDate to today's date.
- Updates the date picker value.
- Reloads today's appointments.
*/
document.querySelector("#today-btn").addEventListener("click", () => {
selectedDate = new Date().toISOString().split("T")[0];

document.querySelector("#date-picker").value = selectedDate;

loadAppointments();
});

/*
Date picker event listener:
- Updates selectedDate whenever the user selects a new date.
- Reloads appointments for the selected date.
*/
document.querySelector("#date-picker").addEventListener("change", (e) => {
selectedDate = e.target.value;

loadAppointments();
});

/*
Function: loadAppointments
Purpose:
Fetch and display appointments based on:
- selectedDate
- optional patientName filter
*/
async function loadAppointments() {
try {
/*
Step 1:
Fetch appointments from the backend.
*/
const appointments = await getAllAppointments(
selectedDate,
patientName,
token
);

/*
Step 2:
Clear existing table rows before rendering new data.
*/
tableBody.innerHTML = "";

/*
Step 3:
Display a fallback message if no appointments are found.
*/
if (!appointments || appointments.length === 0) {
tableBody.innerHTML = `
<tr>
<td colspan="5" class="text-center py-4">
No appointments found for this date.
</td>
</tr>
`;

return;
}

/*
Step 4:
Loop through appointments and render rows.
*/
appointments.forEach((appointment) => {
const patient = {
id: appointment.patient?.id,
name: appointment.patient?.name,
phone: appointment.patient?.phone,
email: appointment.patient?.email,
};

/*
Generate a table row using createPatientRow.
*/
const row = createPatientRow(patient, appointment);

/*
Append the generated row to the table body.
*/
tableBody.appendChild(row);
});
} catch (error) {
console.error("Error loading appointments:", error);

/*
Step 5:
Display an error message if fetching fails.
*/
tableBody.innerHTML = `
<tr>
<td colspan="5" class="text-center py-4 text-danger">
Error loading appointments. Try again later.
</td>
</tr>
`;
}
}

/*
DOMContentLoaded event:
- Initializes the page layout.
- Loads today's appointments by default.
*/
document.addEventListener("DOMContentLoaded", () => {
renderContent();
loadAppointments();
});

