const airports = [
  { code: "IST", city: "Istanbul" },
  { code: "ESB", city: "Ankara" },
  { code: "ADB", city: "Izmir" },
  { code: "AYT", city: "Antalya" },
  { code: "SAW", city: "Istanbul - Sabiha Gökçen" },
];

const flightsData = {
  flights: [
    {
      origin: "IST",
      destination: "ANK",
      departureTime: "08:00",
      arrivalTime: "09:15",
      airline: "Airline A",
      price: 100,
      baggageAllowance: "15kg",
    },
    {
      origin: "LAX",
      destination: "JFK",
      departureTime: "10:00",
      arrivalTime: "18:30",
      airline: "Airline B",
      price: 300,
      baggageAllowance: "2 pieces",
    },
    {
      origin: "CDG",
      destination: "SFO",
      departureTime: "15:45",
      arrivalTime: "18:05",
      airline: "Airline C",
      price: 400,
      baggageAllowance: "20kg",
    },
    {
      origin: "DXB",
      destination: "LHR",
      departureTime: "23:00",
      arrivalTime: "03:00",
      airline: "Airline D",
      price: 250,
      baggageAllowance: "30kg",
    },
    {
      origin: "HND",
      destination: "SIN",
      departureTime: "01:00",
      arrivalTime: "07:00",
      airline: "Airline E",
      price: 350,
      baggageAllowance: "25kg",
    },
    
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  
  const searchButton = document.getElementById("searchButton");
  const selectedInfoList = document.getElementById("selectedInfoList");
  const selectedInfoPanel = document.getElementById("selectedInfoPanel");

  
  if (searchButton) {
    searchButton.addEventListener("click", searchFlights);
  } else {
    console.error("searchButton elementi bulunamadı.");
  }

  if (selectedInfoList && selectedInfoPanel) {
    
  } else {
    console.error(
      "selectedInfoList veya selectedInfoPanel elementi bulunamadı."
    );
  }

 
});

function prepareAirportsList(inputId) {
  const listElement = document.getElementById(inputId + "List");
  airports.forEach((airport) => {
    addAirportToDropdown(airport, listElement, inputId);
  });
}

function addAirportToDropdown(airport, listElement, inputId) {
  let airportDiv = document.createElement("div");
  airportDiv.textContent = `${airport.city} (${airport.code})`;
  airportDiv.classList.add("airport-item");
  airportDiv.onclick = function () {
    document.getElementById(inputId).value = airportDiv.textContent;
    listElement.classList.add("hidden");
  };
  listElement.appendChild(airportDiv);
}
function filterAirports(inputId) {
  const input = document.getElementById(inputId);
  const filter = input.value.toUpperCase();
  const airportsListDiv = document.getElementById(inputId + "List");
  airportsListDiv.innerHTML = "";

  const filteredAirports = airports.filter(
    (airport) =>
      airport.city.toUpperCase().includes(filter) ||
      airport.code.toUpperCase().includes(filter)
  );

  if (filteredAirports.length) {
    airportsListDiv.classList.remove("hidden");
    filteredAirports.forEach((airport) => {
      let airportDiv = document.createElement("div");
      airportDiv.textContent = `${airport.city} (${airport.code})`;
      airportDiv.classList.add("airport-item");
      airportDiv.onclick = function () {
        input.value = airportDiv.textContent;
        airportsListDiv.classList.add("hidden");
      };
      airportsListDiv.appendChild(airportDiv);
    });
  } else {
    airportsListDiv.classList.add("hidden");
  }
}

function setTripType(tripType) {
  var returnDateGroup = document.getElementById("returnDateGroup");
  var oneWayButton = document.getElementById("oneWayButton");
  var roundTripButton = document.getElementById("roundTripButton");

  if (tripType === "oneWay") {
    returnDateGroup.style.display = "none";
    oneWayButton.classList.add("active");
    roundTripButton.classList.remove("active");
  } else {
    returnDateGroup.style.display = "block";
    oneWayButton.classList.remove("active");
    roundTripButton.classList.add("active");
  }
}

function searchFlights() {
  var fromAirport = document.getElementById("departureAirport").value;
  var toAirport = document.getElementById("arrivalAirport").value;

  if (!fromAirport || !toAirport) {
    alert("Lütfen kalkış ve varış havaalanı bilgilerini giriniz.");
    return;
  }
  showLoading(true);
  document.getElementById("loading").classList.remove("hidden");

  setTimeout(function () {
    displayFlights();
    showLoading(false);
    showSelectedInfo();
    document.getElementById("loading").classList.add("hidden");
  }, 2000);
}

function displayFlights() {
  const flightResultsDiv = document.getElementById("flightResults");
  flightResultsDiv.innerHTML = ""; 
  flightsData.flights.forEach((flight) => {
    const flightDiv = document.createElement("div");
    flightDiv.classList.add("flight-result-item");
    flightDiv.innerHTML = `
      <div class="flight-detail">
        <span class="airline">${flight.airline}</span>
        <span class="times">${flight.departureTime} — ${flight.arrivalTime}</span>
        <span class="route">${flight.origin} > ${flight.destination}</span>
        <span class="price">${flight.price} TL</span>
        <span class="baggage">${flight.baggageAllowance}</span>
      </div>
    `;
    flightResultsDiv.appendChild(flightDiv);
  });

  flightResultsDiv.classList.remove("hidden");
}
function createInfoPanel() {
  
}


document.addEventListener("DOMContentLoaded", function () {
  
  var searchButton = document.getElementById("searchButton");
  if (searchButton) {
    searchButton.addEventListener("click", searchFlights);
  } else {
    console.error("searchButton elementi bulunamadı.");
  }
});
function showSelectedInfo() {
  const infoPanel = document.getElementById("selectedInfoPanel");
  const infoList = document.getElementById("selectedInfoList");

  if (infoPanel && infoList) {
    const departureAirport = document.getElementById("departureAirport").value;
    const arrivalAirport = document.getElementById("arrivalAirport").value;
    const departureDate = document.getElementById("departureDate").value;

    infoList.innerHTML = `
      <li>Kalkış Havaalanı: ${departureAirport}</li>
      <li>Varış Havaalanı: ${arrivalAirport}</li>
      <li>Kalkış Tarihi: ${departureDate}</li>
    `;

    infoPanel.classList.remove("hidden");
  } else {
    console.error(
      "selectedInfoList veya selectedInfoPanel elementi bulunamadı."
    );
  }
}
function attachEventListeners() {
  
  document
    .getElementById("departureAirport")
    .addEventListener("click", function () {
      showAirports("departureAirport");
    });

  document
    .getElementById("arrivalAirport")
    .addEventListener("click", function () {
      showAirports("arrivalAirport");
    });
}

function showAirports(inputId) {
  const input = document.getElementById(inputId);
  const dropdown = document.getElementById(inputId + "Dropdown");
  if (!dropdown) {
    console.error("Dropdown elementi bulunamadı: " + inputId + "Dropdown");
    return;
  }

  
  airports.forEach((airport) => {
    const option = document.createElement("div");
    option.className = "dropdown-option";
    option.textContent = `${airport.city} (${airport.code})`;
    option.onclick = function () {
      input.value = option.textContent; 
      dropdown.classList.add("hidden"); 
    };
    dropdown.appendChild(option); 
  });

  
  dropdown.classList.remove("hidden");
}


document
  .getElementById("departureAirport")
  .addEventListener("click", function () {
    showAirports("departureAirport");
  });

document
  .getElementById("arrivalAirport")
  .addEventListener("click", function () {
    showAirports("arrivalAirport");
  });
function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
}
