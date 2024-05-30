const countryCardsContainer = document.getElementById(
  "country-cards-container"
);
const searchInput = document.getElementById("search-input");
const regionSelect = document.getElementById("region-select");
const themeToggleBtn = document.getElementById("theme-toggle-btn");

let countriesData = [];
let isDarkMode = false;

// Event listeners
searchInput.addEventListener("input", handleSearch);
regionSelect.addEventListener("change", handleFilter);
themeToggleBtn.addEventListener("click", toggleTheme);

// Fetch countries from the API
async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    countriesData = data;
    renderCountries(countriesData);
    attachClickListeners();
  } catch (error) {
    console.log("Error fetching countries:", error);
  }
}

fetchCountries();

// Function to render countries
function renderCountries(countries) {
  countryCardsContainer.innerHTML = countries
    .map((country) => createCountryCard(country))
    .join("");
}

// Function to create country card HTML
function createCountryCard(country) {
  const flagUrl = country.flags.svg;
  const name = country.name.common;
  const population = country.population.toLocaleString();
  const region = country.region;
  const capital = country.capital && country.capital[0];

  return `
    <div class="card">
      <img src="${flagUrl}" alt="${name} flag">
      <div class="card-content">
        <h2>${name}</h2>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Capital:</strong> ${capital || "N/A"}</p>
      </div>
    </div>
  `;
}

// Function to search countries by name
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  renderCountries(filteredCountries);
}

// Function to filter countries by region
function handleFilter() {
  const selectedRegion = regionSelect.value;
  const filteredCountries = countriesData.filter(
    (country) => selectedRegion === "all" || country.region === selectedRegion
  );
  renderCountries(filteredCountries);
}

// Function to toggle between light and dark mode
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  const currentTheme = isDarkMode ? "Light Mode" : "Dark Mode";

  themeToggleBtn.innerHTML = `
    <img src="./assets/crescent-icon.svg" alt="Crescent Icon">
    ${currentTheme}
  `;
}

// Function to show country detail
function showCountryDetail(countryName) {
  const selectedCountry = countriesData.find(
    (country) => country.name.common === countryName
  );
  localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
  window.location.href = "countryDetail.html";
}

// Function to attach click event listeners to each card
function attachClickListeners() {
  const countryCards = document.querySelectorAll(".card");
  countryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const countryName = card.querySelector("h2").textContent;
      showCountryDetail(countryName);
    });
  });
}
