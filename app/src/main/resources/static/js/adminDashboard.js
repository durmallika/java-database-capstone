const content = document.getElementById("content");
const searchBar = document.getElementById("searchBar");
const timeFilter = document.getElementById("timeFilter");
const specialtyFilter = document.getElementById("specialtyFilter");

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    availability: "AM"
  },
  {
    name: "Dr. Michael Lee",
    specialty: "Dentist",
    availability: "PM"
  },
  {
    name: "Dr. Emily Brown",
    specialty: "Neurologist",
    availability: "AM"
  }
];

function renderDoctors(filteredDoctors) {
  content.innerHTML = "";

  filteredDoctors.forEach((doctor) => {
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    card.innerHTML = `
      <h3>${doctor.name}</h3>
      <p><strong>Specialty:</strong> ${doctor.specialty}</p>
      <p><strong>Availability:</strong> ${doctor.availability}</p>
      <button class="view-btn">View Details</button>
    `;

    content.appendChild(card);
  });
}

function filterDoctors() {
  const searchValue = searchBar.value.toLowerCase();
  const timeValue = timeFilter.value;
  const specialtyValue = specialtyFilter.value;

  const filtered = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchValue);
    const matchesTime = !timeValue || doctor.availability === timeValue;
    const matchesSpecialty =
      !specialtyValue || doctor.specialty === specialtyValue;

    return matchesSearch && matchesTime && matchesSpecialty;
  });

  renderDoctors(filtered);
}

searchBar.addEventListener("input", filterDoctors);
timeFilter.addEventListener("change", filterDoctors);
specialtyFilter.addEventListener("change", filterDoctors);

renderDoctors(doctors);
