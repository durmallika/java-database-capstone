const adminBtn = document.getElementById("adminBtn");
const patientBtn = document.getElementById("patientBtn");
const doctorBtn = document.getElementById("doctorBtn");

const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

function openModal(content) {
  modalContent.innerHTML = content;
  modalOverlay.classList.remove("hidden");
}

function closeModalHandler() {
  modalOverlay.classList.add("hidden");
}

adminBtn.addEventListener("click", () => {
  openModal(`
    <h2>Admin Login</h2>
    <p>Admin authentication form will appear here.</p>
  `);
});

patientBtn.addEventListener("click", () => {
  openModal(`
    <h2>Patient Login</h2>
    <p>Patient authentication form will appear here.</p>
  `);
});

doctorBtn.addEventListener("click", () => {
  openModal(`
    <h2>Doctor Login</h2>
    <p>Doctor authentication form will appear here.</p>
  `);
});

closeModal.addEventListener("click", closeModalHandler);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModalHandler();
  }
});