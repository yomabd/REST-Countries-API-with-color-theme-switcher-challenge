document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("back-button");
  const countryFlag = document.getElementById("country-flag");
  const countryName = document.getElementById("country-name");
  const nativeName = document.getElementById("native-name");
  const population = document.getElementById("population");
  const region = document.getElementById("region");
  const subRegion = document.getElementById("sub-region");
  const capital = document.getElementById("capital");
  const topLevelDomain = document.getElementById("top-level-domain");
  const currencies = document.getElementById("currencies");
  const languages = document.getElementById("languages");
  const borderCountries = document.getElementById("border-countries");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  backButton.addEventListener("click", goBack);
  themeToggleBtn.addEventListener("click", toggleTheme);

  function goBack() {
    window.history.back();
  }

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const currentTheme = document.body.classList.contains("dark-mode")
      ? "Light Mode"
      : "Dark Mode";
    themeToggleBtn.innerHTML = `
          <img src="./assets/crescent-icon.svg" alt="Crescent Icon"> ${currentTheme}
      `;
  }

  function displayCountryDetail() {
    const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
    console.log(selectedCountry);

    if (selectedCountry) {
      const flagUrl = selectedCountry.flags.svg;
      const name = selectedCountry.name.common;
      const nativeNameValue = selectedCountry.name.nativeName.common || "N/A";
      const populationValue = selectedCountry.population.toLocaleString();
      const regionValue = selectedCountry.region;
      const subRegionValue = selectedCountry.subregion || "N/A";
      const capitalValue = selectedCountry.capital[0] || "N/A";
      const topLevelDomainValue = selectedCountry.tld[0] || "N/A";
      const currenciesValue = Object.values(selectedCountry.currencies)
        .map((currency) => currency.name)
        .join(", ");
      const languagesValue = Object.values(selectedCountry.languages).join(
        ", "
      );
      const borderCountriesValue = selectedCountry.borders || [];
      // console.log(borderCountriesValue);
      // borderCountriesValue = borderCountriesValue.map();

      countryFlag.src = flagUrl;
      countryName.textContent = name;
      nativeName.textContent = nativeNameValue;
      population.textContent = populationValue;
      region.textContent = regionValue;
      subRegion.textContent = subRegionValue;
      capital.textContent = capitalValue;
      topLevelDomain.textContent = topLevelDomainValue;
      currencies.textContent = currenciesValue;
      languages.textContent = languagesValue;

      // Display border countries
      borderCountries.innerHTML = "";
      if (borderCountriesValue.length > 0) {
        borderCountriesValue.forEach((border) => {
          const borderButton = document.createElement("button");
          borderButton.textContent = border;
          borderButton.classList.add("border-country-button");
          borderButton.addEventListener("click", () =>
            showBorderCountryDetail(border)
          );
          borderCountries.appendChild(borderButton);
        });
      } else {
        borderCountries.textContent = "No border countries";
      }
    } else {
      console.log("Selected country is null or undefined");
    }
  }

  function showBorderCountryDetail(countryCode) {
    // Fetch border country detail and navigate to its detail page
    // You can implement this part as needed
    console.log("Border country code:", countryCode);
  }

  displayCountryDetail();
});
