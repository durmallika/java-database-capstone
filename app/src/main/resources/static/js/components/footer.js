// 1. Define the reusable function 
//VVI- Call this on every page that needs a footer.

function renderFooter() {

//    2. Access the footer container 
//   [VVI- //Make sure each HTML page has this container present.]
  const footer = document.getElementById("footer");

  // Exit if footer container doesn't exist
  if (!footer) return;

  
  // 3. Inject HTML content
  footer.innerHTML = `
    <footer class="footer">
      <div class="footer-container">

        <div class="footer-logo">
          <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo">
          <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div class="footer-column">
            <h4>Support</h4>
            <a href="#">Account</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>
          <div class="footer-column">
            <h4>Legals</h4>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Licensing</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// 4. Call the function when the file loads
renderFooter();




//new/ another way //the above is older work

// Footer.js

// function renderFooter() {
//     const footer = document.getElementById("footer");
  
//     // Exit if footer container doesn't exist
//     if (!footer) return;
  
//     footer.innerHTML = `
//       <footer class="footer">
//         <div class="footer-container">
  
//           <!-- Branding -->
//           <div class="footer-brand">
//             <h4>Healthcare Appointment System</h4>
//             <p>© Copyright 2026. All Rights Reserved.</p>
//           </div>
  
//           <!-- Company Links -->
//           <div class="footer-column">
//             <h4>Company</h4>
//             <a href="#">About</a>
//             <a href="#">Careers</a>
//             <a href="#">Press</a>
//           </div>
  
//           <!-- Support Links -->
//           <div class="footer-column">
//             <h4>Support</h4>
//             <a href="#">Account</a>
//             <a href="#">Help Center</a>
//             <a href="#">Contact</a>
//           </div>
  
//           <!-- Legal Links -->
//           <div class="footer-column">
//             <h4>Legals</h4>
//             <a href="#">Terms</a>
//             <a href="#">Privacy Policy</a>
//             <a href="#">Licensing</a>
//           </div>
  
//         </div>
//       </footer>
//     `;
//   }
  
//   // Render footer when the script loads
//   renderFooter();