// Import the base API URL from the config file
import { API_BASE_URL } from "../config";

// Define a constant DOCTOR_API to hold the full endpoint for doctor-related actions
const DOCTOR_API = `${API_BASE_URL}/doctor`;

/*
Function: getDoctors
Purpose: Fetch the list of all doctors from the API
*/
export const getDoctors = async () => {
try {
// Use fetch() to send a GET request to the DOCTOR_API endpoint
const response = await fetch(DOCTOR_API);

// Convert the response to JSON
const data = await response.json();

// Return the 'doctors' array from the response
return data.doctors || [];
} catch (error) {
// If there's an error, log it and return an empty array
console.error("Error fetching doctors:", error);
return [];
}
};

/*
Function: deleteDoctor
Purpose: Delete a specific doctor using their ID and an authentication token
*/
export const deleteDoctor = async (doctorId, token) => {
try {
// Use fetch() with the DELETE method
const response = await fetch(
`${DOCTOR_API}/delete/${doctorId}/${token}`,
{
method: "DELETE",
}
);

// Convert the response to JSON
const data = await response.json();

// Return success status and message
return {
success: data.success || false,
message: data.message || "Doctor deleted successfully",
};
} catch (error) {
// Log error and return default failure response
console.error("Error deleting doctor:", error);

return {
success: false,
message: "Failed to delete doctor",
};
}
};

/*
Function: saveDoctor
Purpose: Save (create) a new doctor using a POST request
*/
export const saveDoctor = async (doctor, token) => {
try {
// Use fetch() with the POST method
const response = await fetch(`${DOCTOR_API}/save/${token}`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},

// Convert the doctor object to JSON in the request body
body: JSON.stringify(doctor),
});

// Parse the JSON response
const data = await response.json();

// Return success and message
return {
success: data.success || false,
message: data.message || "Doctor saved successfully",
};
} catch (error) {
// Catch and log errors
console.error("Error saving doctor:", error);

// Return failure response
return {
success: false,
message: "Failed to save doctor",
};
}
};

/*
Function: filterDoctors
Purpose: Fetch doctors based on filtering criteria
*/
export const filterDoctors = async (name, time, specialty) => {
try {
// Use fetch() with the GET method
const response = await fetch(
`${DOCTOR_API}/filter/${name}/${time}/${specialty}`
);

// Check if the response is OK
if (response.ok) {
// Parse and return the doctor data
const data = await response.json();
return data;
} else {
// Log error and return empty doctors array
console.error("Failed to filter doctors");

return {
doctors: [],
};
}
} catch (error) {
// Catch errors, alert user, and return default result
console.error("Error filtering doctors:", error);
alert("Something went wrong while filtering doctors.");

return {
doctors: [],
};
}
};