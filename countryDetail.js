// Function to go back to the previous page
function goBack() {
  window.history.back();
}

// Function to display country detail on the detail page
function displayCountryDetail() {
  const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
  const countryDetailsContainer = document.getElementById("country-details");

  if (selectedCountry) {
    const flagUrl = selectedCountry.flags.svg;
    const name = selectedCountry.name.common;
    const nativeName = selectedCountry.name.nativeName.common;
    const population = selectedCountry.population.toLocaleString();
    const region = selectedCountry.region;
    const subregion = selectedCountry.subregion;
    const capital = selectedCountry.capital && selectedCountry.capital[0];
    const topLevelDomain = selectedCountry.topLevelDomain[0];
    const currencies = Object.values(selectedCountry.currencies)
      .map((currency) => currency.name)
      .join(", ");
    const languages = Object.values(selectedCountry.languages)
      .map((language) => language)
      .join(", ");
    const borders = selectedCountry.borders
      .map((border) => {
        const borderCountry = countriesData.find(
          (country) => country.cca3 === border
        );
        return borderCountry.name.common;
      })
      .join(", ");

    countryDetailsContainer.innerHTML = `
            <div class="country-detail">
                <div class="country-flag">
                    <img src="${flagUrl}" alt="${name} flag">
                </div>
                <div class="country-info">
                    <h2>${name}</h2>
                    <p><strong>Native Name:</strong> ${nativeName}</p>
                    <p><strong>Population:</strong> ${population}</p>
                    <p><strong>Region:</strong> ${region}</p>
                    <p><strong>Subregion:</strong> ${subregion}</p>
                    <p><strong>Capital:</strong> ${capital || "N/A"}</p>
                    <p><strong>Top Level Domain:</strong> ${topLevelDomain}</p>
                    <p><strong>Currencies:</strong> ${currencies}</p>
                    <p><strong>Languages:</strong> ${languages}</p>
                    <p><strong>Borders:</strong> ${borders || "None"}</p>
                </div>
            </div>
        `;
  }
}

displayCountryDetail();
