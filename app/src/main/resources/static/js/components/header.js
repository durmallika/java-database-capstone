
// Header.js

function renderHeader() {
    const headerDiv = document.getElementById("header");
  
    if (!headerDiv) return;
  
    // Clear session when on homepage
    if (window.location.pathname.endsWith("/")) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");
      return;
    }
  
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
  
    // Handle invalid sessions
    if (
      (role === "loggedPatient" ||
        role === "admin" ||
        role === "doctor") &&
      !token
    ) {
      localStorage.removeItem("userRole");
      alert("Session expired or invalid login. Please log in again.");
      window.location.href = "/";
      return;
    }
  
    let headerContent = "";
  
    // Admin Header
    if (role === "admin") {
      headerContent += `
        <nav class="header-nav">
          <button id="addDocBtn" class="adminBtn">Add Doctor</button>
          <a href="#" id="logoutBtn">Logout</a>
        </nav>
      `;
    }
  
    // Doctor Header
    else if (role === "doctor") {
      headerContent += `
        <nav class="header-nav">
          <a href="/doctor.html" id="doctorHomeBtn">Home</a>
          <a href="#" id="logoutBtn">Logout</a>
        </nav>
      `;
    }
  
    // Patient (not logged in)
    else if (role === "patient" || !role) {
      headerContent += `
        <nav class="header-nav">
          <a href="/login.html" id="loginBtn">Login</a>
          <a href="/signup.html" id="signupBtn">Sign Up</a>
        </nav>
      `;
    }
  
    // Logged-in Patient
    else if (role === "loggedPatient") {
      headerContent += `
        <nav class="header-nav">
          <a href="/patient.html" id="patientHomeBtn">Home</a>
          <a href="/appointments.html" id="appointmentsBtn">Appointments</a>
          <a href="#" id="logoutPatientBtn">Logout</a>
        </nav>
      `;
    }
  
    // Inject header
    headerDiv.innerHTML = headerContent;
    // Attach event listeners
    attachHeaderButtonListeners();
  }
  
//   Attach Event Listeners because elements were dynamically created:

  function attachHeaderButtonListeners() {
    const addDocBtn = document.getElementById("addDocBtn");
    if (addDocBtn) {
      addDocBtn.addEventListener("click", () => {
        openModal("addDoctor");
      });
    }
  
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    }
  
    const logoutPatientBtn = document.getElementById("logoutPatientBtn");
    if (logoutPatientBtn) {
      logoutPatientBtn.addEventListener("click", (e) => {
        e.preventDefault();
        logoutPatient();
      });
    }
  }
  
  // Logout for admin/doctor
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  
    window.location.href = "/";
  }
  
  // Logout for patient
  function logoutPatient() {
    localStorage.removeItem("token");
  
    // Keep patient role so Login/Signup buttons appear
    localStorage.setItem("userRole", "patient");
  
    // window.location.href = "/patient.html";
    window.location.href = "/patientDashboard.html";

    // or, use this other option here...
    // window.location.href = "/";
  }
  
  // Render header when page loads
  document.addEventListener("DOMContentLoaded", renderHeader);
  

//   // Call renderHeader on page load//another way
//   window.addEventListener("DOMContentLoaded", renderHeader);

  












// another way.......------------

// build a renderHeader() function that-
// Checks the current page.
// We don't want to show the role-based header on the homepage

// function renderHeader() {
//   const headerDiv = document.getElementById("header");

//   // 1. Check if on homepage
//   if (window.location.pathname.endsWith("/")) {
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("token");


//     headerDiv.innerHTML = `
//       <header class="header">
//         <div class="logo-section">
//           <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
//           <span class="logo-title">Hospital CMS</span>
//         </div>
//       </header>`;
//     return;
//   }



//   // 2. Get role and token
//   const role = localStorage.getItem("userRole");
//   const token = localStorage.getItem("token");

//   // 3. Handle invalid session //condition to check invalid handle button
//   if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
//     localStorage.removeItem("userRole");
//     alert("Session expired or invalid login. Please log in again.");
//     window.location.href = "/";
//     return;
//   }

//   // 4. Start building header
//   let headerContent = `
//     <header class="header">
//       <div class="logo-section">
//         <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
//         <span class="logo-title">Hospital CMS</span>
//       </div>
//       <nav>`;

//   // 5. Role-based content
//   if (role === "admin") {
//     headerContent += `
//       <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
//       <a href="#" id="logoutLink">Logout</a>`;
//   } else if (role === "doctor") {
//     headerContent += `
//       <button class="adminBtn" onclick="selectRole('doctor')">Home</button>
//       <a href="#" id="logoutLink">Logout</a>`;
//   } else if (role === "patient") {
//     headerContent += `
//       <button id="patientLogin" class="adminBtn">Login</button>
//       <button id="patientSignup" class="adminBtn">Sign Up</button>`;
//   } else if (role === "loggedPatient") {
//     headerContent += `
//       <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
//       <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
//       <a href="#" id="logoutPatientLink">Logout</a>`;
//   }

//   // 6. Close nav and header
//   headerContent += `</nav></header>`;

//   // 7. Inject into DOM
//   headerDiv.innerHTML = headerContent;
//   // 8. Attach event listeners
//   attachHeaderButtonListeners();
// }

// // Logout for admin/doctor
// function logout() {
//   localStorage.removeItem("userRole");
//   localStorage.removeItem("token");
//   window.location.href = "/";
// }

// // Logout for patient
// function logoutPatient() {
//   localStorage.removeItem("token");
//   localStorage.setItem("userRole", "patient");
//   window.location.href = "/";
// }

// // Attach event listeners to dynamic buttons
// function attachHeaderButtonListeners() {
//   const logoutBtn = document.getElementById("logoutLink");
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", logout);
//   }

//   const logoutPatientBtn = document.getElementById("logoutPatientLink");
//   if (logoutPatientBtn) {
//     logoutPatientBtn.addEventListener("click", logoutPatient);
//   }

//   const loginBtn = document.getElementById("patientLogin");
//   if (loginBtn) {
//     loginBtn.addEventListener("click", () => openModal("patientLogin"));
//   }

//   const signupBtn = document.getElementById("patientSignup");
//   if (signupBtn) {
//     signupBtn.addEventListener("click", () => openModal("patientSignup"));
//   }
// }

// // Call renderHeader on page load
// window.addEventListener("DOMContentLoaded", renderHeader);