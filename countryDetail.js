// Function to go back to the previous page
function goBack() {
  window.history.back();
}

// Function to ensure DOM is fully loaded before click event happens
document.addEventListener("DOMContentLoaded", function () {
  // Function to go back to the previous page
  function goBack() {
    window.history.back();
  }

  // Function to display country detail on the detail page
  function displayCountryDetail() {
    const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
    const countryDetailsContainer = document.getElementById("country-details");

    if (selectedCountry) {
      // Your existing code to display country detail
    } else {
      console.log("Selected country is null or undefined");
    }
  }

  displayCountryDetail();
});
