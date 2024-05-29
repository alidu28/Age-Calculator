const dayInput = document.getElementById("Day");
const monthInput = document.getElementById("Month");
const yearInput = document.getElementById("Year");

const calculateButton = document.querySelector(".hr-icon img");
calculateButton.addEventListener("click", validateInputs);

function formatAge(value) {
    return value.toString().padStart(2, "0")
}

function updateOutputElements(ageYears, ageMonths, ageDays) {
  const yearsOutput = document.querySelector("text-box > h1:nth-child(1) > span");
  const monthsOutput = document.querySelector("text-box > h1:nth-child(2) > span");
  const daysOutput = document.querySelector("text-box > h1:nth-child(3) > span");

  yearsOutput.textContent = formatAge(ageYears);
  monthsOutput.textContent = formatAge(ageMonths);
  daysOutput.textContent = formatAge(ageDays);
}

dayInput.addEventListener("input", validateInputs);
monthInput.addEventListener("input", validateInputs);
yearInput.addEventListener("input", validateInputs);

function validateInputs() {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Validate day
  if (day < 1 || day > 31 || isNaN(day)) {
    // Handle invalid day input
    return;
  }
  // Validate month
  if (month < 1 || month > 12 || isNaN(month)) {
    // Handle invalid month input
    return;
  }
  // Validate year
  const currentYear = new Date().getFullYear();
  if (year < currentYear - 150 || year > currentYear || isNaN(year)) {
    // Handle invalid year input
    return;
  }

  // All inputs are valid, proceed with age calculation
  calculateAge(day, month, year);
}

function calculateAge(day, month, year) {
  // Get the current date and time
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentDay = currentDate.getDate();

  // Calculate age in the years, months, and days
  let ageYears = currentYear - year;
  let ageMonths = currentMonth - month;
  let ageDays = currentDay - day;

  // Handle cases where input month/day is greate than current month/day
  if (ageDays < 0) {
    ageMonths--;
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    ageDays = daysInLastMonth + ageDays;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths = 12 + ageMonths;
  }

  // Update the output elements with the calculated age
  updateOutputElements(ageYears, ageMonths, ageDays);
}
