// doctorServices.js

import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = `${API_BASE_URL}/doctor`;

/**
 * Get all doctors
 * @returns {Promise<Array>}
 */
export const getDoctors = async () => {
    try {
        const response = await fetch(DOCTOR_API);

        if (!response.ok) {
            throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();

        return data.doctors || data || [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
};

/**
 * Delete a doctor
 * @param {string} id
 * @param {string} token
 * @returns {Promise<{success:boolean,message:string}>}
 */
export const deleteDoctor = async (id, token) => {
    try {
        const response = await fetch(`${DOCTOR_API}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        return {
            success: response.ok,
            message: data.message || "Doctor deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting doctor:", error);

        return {
            success: false,
            message: "Failed to delete doctor"
        };
    }
};

/**
 * Save (Add) a new doctor
 * @param {Object} doctor
 * @param {string} token
 * @returns {Promise<{success:boolean,message:string}>}
 */
export const saveDoctor = async (doctor, token) => {
    try {
        const response = await fetch(DOCTOR_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(doctor)
        });

        const data = await response.json();

        return {
            success: response.ok,
            message: data.message || "Doctor saved successfully"
        };
    } catch (error) {
        console.error("Error saving doctor:", error);

        return {
            success: false,
            message: "Failed to save doctor"
        };
    }
};

/**
 * Filter doctors
 * @param {string} name
 * @param {string} time
 * @param {string} specialty
 * @returns {Promise<Array>}
 */
export const filterDoctors = async (
    name = "",
    time = "",
    specialty = ""
) => {
    try {
        const queryParams = new URLSearchParams();

        if (name) queryParams.append("name", name);
        if (time) queryParams.append("time", time);
        if (specialty) queryParams.append("specialty", specialty);

        const url = queryParams.toString()
            ? `${DOCTOR_API}/filter?${queryParams.toString()}`
            : `${DOCTOR_API}/filter`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to filter doctors");
        }

        const data = await response.json();

        return data.doctors || data || [];
    } catch (error) {
        console.error("Error filtering doctors:", error);
        alert("Unable to filter doctors at this time.");
        return [];
    }
};


//another way-----------

// import { API_BASE_URL } from "../config/config.js";

// const DOCTOR_API = API_BASE_URL + '/doctor'


// // Fetch all doctors
// export async function getDoctors() {
//   try {
//     const response = await fetch(DOCTOR_API);
//     const data = await response.json();
//     return data.doctors || [];
//   } catch (error) {
//     console.error('Error fetching doctors:', error);
//     return [];
//   }
// }

// // Delete a doctor by ID with token
// export async function deleteDoctor(doctorId, token) {
//   try {
//     const response = await fetch(`${DOCTOR_API}/${doctorId}/${token}`, {
//       method: 'DELETE',
//     });
//     const data = await response.json();
//     return {
//       success: response.ok,
//       message: data.message || 'Unknown response from server',
//     };
//   } catch (error) {
//     console.error('Error deleting doctor:', error);
//     return {
//       success: false,
//       message: 'Failed to delete doctor due to a network or server error.',
//     };
//   }
// }

// // Save a new doctor with token
// export async function saveDoctor(doctor, token) {
//   try {
//     const response = await fetch(`${DOCTOR_API}/${token}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(doctor),
//     });
//     const data = await response.json();
//     return {
//       success: response.ok,
//       message: data.message || 'Doctor saved successfully.',
//     };
//   } catch (error) {
//     console.error('Error saving doctor:', error);
//     return {
//       success: false,
//       message: 'Failed to save doctor due to a network or server error.',
//     };
//   }
// }

// // Filter doctors by name, time, and specialty
// export async function filterDoctors(name, time, specialty) {
//   try {
//     const response = await fetch(`${DOCTOR_API}/filter/${name}/${time}/${specialty}`);
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       console.error('Failed to filter doctors:', response.statusText);
//       return { doctors: [] };
//     }
//   } catch (error) {
//     console.error('Error filtering doctors:', error);
//     alert('An error occurred while filtering doctors. Please try again later.');
//     return { doctors: [] };
//   }
// }


