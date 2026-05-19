function renderHeader() {
    const headerDiv = document.getElementById("header");
    if (!headerDiv) return;
  
    // 1. Root page handling (no session UI)
    if (window.location.pathname.endsWith("/")) {
      localStorage.removeItem("userRole");
  
      headerDiv.innerHTML = `
        <header class="header">
          <div class="logo-section">
            <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo" class="logo-img">
            <span class="logo-title">Hospital CMS</span>
          </div>
        </header>
      `;
      return;
    }
  
    // 2. Get session data
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
  
    // 3. Handle invalid/expired session
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
      localStorage.removeItem("userRole");
      alert("Session expired or invalid login. Please log in again.");
      window.location.href = "/";
      return;
    }
  
    // 4. Base header
    let headerContent = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
        <nav>
    `;
  
    // 5. Role-based navigation
    switch (role) {
      case "admin":
        headerContent += `
          <button class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
          <a href="#" onclick="logout()">Logout</a>
        `;
        break;
  
      case "doctor":
        headerContent += `
          <button class="adminBtn" onclick="window.location.href='/pages/doctorDashboard.html'">Home</button>
          <a href="#" onclick="logout()">Logout</a>
        `;
        break;
  
      case "patient":
        headerContent += `
          <button class="adminBtn" id="patientLogin">Login</button>
          <button class="adminBtn" id="patientSignup">Sign Up</button>
        `;
        break;
  
      case "loggedPatient":
        headerContent += `
          <button class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
          <button class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
          <a href="#" onclick="logoutPatient()">Logout</a>
        `;
        break;
  
      default:
        headerContent += `
          <button class="adminBtn" id="patientLogin">Login</button>
          <button class="adminBtn" id="patientSignup">Sign Up</button>
        `;
        break;
    }
  
    // 6. Close tags
    headerContent += `
        </nav>
      </header>
    `;
  
    // 7. Render
    headerDiv.innerHTML = headerContent;
  
    // 8. Attach dynamic listeners
    attachHeaderButtonListeners();
  }
  
    // ### Helper Functions
  
  function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.href = "/";
  }
  
  function logoutPatient() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.href = "/pages/patientDashboard.html";
  }

  //I added this later:  Call the function to render the Header
    renderHeader();