// ================== INITIALIZATION ==================
let map;
let routeLayer = L.layerGroup(); // Initialize layer group globally

// City coordinates
const cityCoordinates = {
  Delhi: { lat: 28.6139, lng: 77.2090 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Agra: { lat: 27.1767, lng: 78.0081 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
  Dehradun: { lat: 30.3165, lng: 78.0322 },
  Mumbai: { lat: 19.0760, lng: 72.8777 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Guwahati: { lat: 26.1445, lng: 91.7362 },
  Ujjain: { lat: 23.1793, lng: 75.7849 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Amritsar: { lat: 31.6340, lng: 74.8723 }
};

// Road network graph
const graph = {
  Delhi: { Jaipur: 270, Agra: 233, Dehradun: 250, Amritsar: 450 },
  Jaipur: { Delhi: 270, Agra: 240, Lucknow: 505, Ahmedabad: 660, Ujjain: 585 },
  Agra: { Delhi: 233, Jaipur: 240, Lucknow: 335 },
  Lucknow: { Jaipur: 505, Agra: 335, Kolkata: 990 },
  Dehradun: { Delhi: 250, Amritsar: 450 },
  Amritsar: { Delhi: 450, Dehradun: 450, Ujjain: 1070 },
  Ujjain: { Jaipur: 585, Amritsar: 1070, Mumbai: 655 },
  Ahmedabad: { Jaipur: 660, Mumbai: 530 },
  Mumbai: { Ahmedabad: 530, Ujjain: 655, Bangalore: 985 },
  Bangalore: { Mumbai: 985, Kolkata: 1870 },
  Kolkata: { Lucknow: 990, Bangalore: 1870, Guwahati: 980 },
  Guwahati: { Kolkata: 980 }
};

// Famous places data with image paths
const famousPlaces = {
  Delhi: {
    description: "Red Fort, India Gate, Qutub Minar, Lotus Temple, Humayun's Tomb,Akshardham Temple, Chandni Chowk, Gurudwara Bangla Sahib, and Lodhi Garden. ",
    images: ["images/del1.jpg", "images/del2.jpg", "images/delhi.jpg","images/akshar.jpg","images/chandni.jpg","images/qutub.jpg"]
  },
  Jaipur: {
    description: "Hawa Mahal, Amer Fort, City Palace, Jantar Mantar, Jal Mahal",
    images: ["images/jai1.jpg", "images/jai2.jpg", "images/jaipur.jpg", "images/jaipur.jpg"]
  },
  Agra: {
    description: "Taj Mahal, Agra Fort, Mehtab Bagh, Fatehpur Sikri",
    images: ["images/agra.jpg", "images/agra1.jpg","images/agra_fort.jpg", "images/agra2.jpg"]
  },
 Dehradun: {
    description: "Sahastradhara,Malsi dear park,Robber's cave,FRI Dehradun, Tapkeshwar Mahadev Mandir, Rispana River,Rolling monastery",
    images: ["images/deh1.jpg", "images/deh2.jpg","images/deh3.jpg", "download.jpg","deh5.jpg"]
  },
  Mumbai: {
    description: "the Gateway of India, Marine Drive, Chhatrapati Shivaji Maharaj Terminus, and the Elephanta Caves",
    images: ["images/mumbai1.jpg", "images/mumbai2.jpg","images/mumbai3.jpg", "images/mumbai4.jpg"]
  },
  Amritsar: {
    description: "Golden temple, Jallianwala bagh, The Partition museum, Gobingarh fort,shri Akal Takht Sahib",
    images: ["images/am.jpg", "images/am1.jpg","images/am2.jpg", "images/am3.jpg","images/am4.jpg"]
  },
  Ahmedabad: {
    description: "Mahatma Gandhi Sabarmati Ashram, Sidi Saiyyed Masjid, Sarkhej Roza, Kankaria Lake, Sabarmati Riverfront, Nehru Bridge, Bhadra Fort",
    images: ["images/a1.jpg", "images/a2.jpg","images/a3.jpg", "images/a4.jpg","images/a5.jpg"]
  },
  Guwahati: {
    description: "Maa Kamakhya temple, Assam State Zoo cum Botanical Garden, Umananda Temple,  Srimanta Sankardev Kalakshetra,Brahmaputra River",
    images: ["images/g1.jpg", "images/g2.jpg","images/g3.jpg", "images/g4.jpg","images/g5.jpg"]
  },
  Kolkata: {
    description: "Victoria memorial, Howrah bridge, Dakshineshwar kali, New market kolkata",
    images: ["images/kolkata1.jpg", "images/kolkata2.jpg","images/kolkata3.jpg", "images/kolkata4.jpg","images/kolkata5.jpg"]
  },
  Ujjain: {
    description: "Mahakaleshwar mahadev,Mahakal lok corridor,Kaal Bhairav temple,Ved shala",
    images: ["images/ujj.jpg", "images/uj2.jpg","images/uj3.jpg", "images/uj4.jpg","images/uj5.jpg"]
  }
};

// Transport modes data
const transportModes = {
  car: { name: "Car", costPerKm: 8, speed: 50, icon: "🚗" },
  bike: { name: "Bike", costPerKm: 5, speed: 45, icon: "🏍️" },
  bus: { name: "Bus", costPerKm: 2, speed: 40, icon: "🚌" },
  train: { name: "Train", costPerKm: 1.5, speed: 60, icon: "🚆" }
};

// ================== MAP FUNCTIONS ==================
function initMap() {
  if (map) return;
  
  map = L.map('map').setView([20.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  routeLayer.addTo(map); // Add route layer to map
}

function showRouteOnMap(path) {
  // Clear previous route
  routeLayer.clearLayers();
  
  // Create array of LatLng points
  const latlngs = path.map(city => {
    const coords = cityCoordinates[city];
    return coords ? L.latLng(coords.lat, coords.lng) : null;
  }).filter(Boolean);

  // Add polyline if we have at least 2 points
  if (latlngs.length > 1) {
    L.polyline(latlngs, {
      color: '#3498db',
      weight: 5,
      opacity: 0.7
    }).addTo(routeLayer);
  }

  // Add markers for each city
  path.forEach((city, index) => {
    const coords = cityCoordinates[city];
    if (!coords) return;
    
    const marker = L.marker([coords.lat, coords.lng]).addTo(routeLayer);
    marker.bindPopup(`
      <b>${city}</b><br>
      ${index === 0 ? 'Starting point' : 
        index === path.length-1 ? 'Destination' : 'Via point'}
    `);
  });

  // Fit map to bounds if we have points
  if (latlngs.length > 0) {
    map.fitBounds(L.latLngBounds(latlngs), { padding: [50, 50] });
  }
}

// ================== CORE FUNCTIONS ==================
function dijkstra(graph, start, end) {
  const distances = {};
  const prev = {};
  const pq = new Set(Object.keys(graph));

  // Initialize distances
  for (const node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    prev[node] = null;
  }

  while (pq.size > 0) {
    // Find node with smallest distance
    let minNode = null;
    for (const node of pq) {
      if (minNode === null || distances[node] < distances[minNode]) {
        minNode = node;
      }
    }

    // If we reached the end or no more nodes
    if (minNode === end || distances[minNode] === Infinity) break;
    pq.delete(minNode);

    // Update distances to neighbors
    for (const neighbor in graph[minNode]) {
      const alt = distances[minNode] + graph[minNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = minNode;
      }
    }
  }

  // Reconstruct path
  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return distances[end] === Infinity ? null : { path, distance: distances[end] };
}

async function loadDestinationImages(city, container) {
  container.innerHTML = '';
  
  if (!famousPlaces[city]?.images?.length) {
    container.innerHTML = '<p class="no-images">No images available</p>';
    return;
  }

  for (const imgName of famousPlaces[city].images) {
    const img = document.createElement('img');
    img.alt = city;
    img.loading = "lazy";
    img.src = imgName;
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    };
    
  console.log("Loading image:", img.src);
    container.appendChild(img);
  }
}

async function fetchWeather(city, weatherDiv) {
  const apiKey = 'a840372b457cb1f0ec739672d891abbf';
  weatherDiv.innerHTML = '<div class="weather-loading">Loading weather...</div>';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    weatherDiv.innerHTML = `
      <div class="weather-card">
        <h3>${city} Weather</h3>
        <div class="weather-main">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
          <div>
            <span class="temp">${Math.round(data.main.temp)}°C</span>
            <span class="desc">${data.weather[0].description}</span>
          </div>
        </div>
        <div class="weather-details">
          <div>Feels like: ${Math.round(data.main.feels_like)}°C</div>
          <div>Humidity: ${data.main.humidity}%</div>
          <div>Wind: ${data.wind.speed} m/s</div>
        </div>
      </div>
    `;
  } catch (error) {
    weatherDiv.innerHTML = `
      <div class="weather-error">
        Failed to load weather data
        <button onclick="fetchWeather('${city}', this.parentElement)">
          Retry
        </button>
      </div>
    `;
  }
}

function calculateTravelCost(distance, mode) {
  const modeData = transportModes[mode];
  const timeHours = distance / modeData.speed;
  return {
    totalCost: Math.round(distance * modeData.costPerKm),
    travelTime: {
      hours: Math.floor(timeHours),
      minutes: Math.round((timeHours % 1) * 60)
    }
  };
}

// ================== MAIN FUNCTION ==================
async function findShortestPath() {
  // Initialize map if not already done
  if (!map) initMap();
  
  const source = document.getElementById('source').value;
  const destination = document.getElementById('destination').value;
  const transportMode = document.getElementById('transportMode').value;
  const resultDiv = document.getElementById('result');
  const weatherDiv = document.getElementById('weather');
  const imageContainer = document.getElementById('imageContainer');
  const sidebar = document.getElementById('sidebar');

  // Clear previous results
  resultDiv.innerHTML = '';
  weatherDiv.innerHTML = '';
  imageContainer.innerHTML = '';

  // Validate inputs
  if (!source || !destination) {
    alert('Please select both source and destination');
    return;
  }
  if (source === destination) {
    alert('Source and destination cannot be same');
    return;
  }

  // Find shortest path
  const shortest = dijkstra(graph, source, destination);
  if (!shortest) {
    resultDiv.innerHTML = '<p>No path found between these cities</p>';
    return;
  }

  // Calculate travel details
  const cost = calculateTravelCost(shortest.distance, transportMode);

  // Display results
  resultDiv.innerHTML = `
    <h2>Route from ${source} to ${destination}</h2>
    <p><strong>Path:</strong> ${shortest.path.join(' → ')}</p>
    <p><strong>Distance:</strong> ${shortest.distance} km</p>
    <p><strong>Travel Time (${transportModes[transportMode].name}):</strong> 
       ${cost.travelTime.hours}h ${cost.travelTime.minutes}m</p>
    <p><strong>Estimated Cost:</strong> ₹${cost.totalCost}</p>
    <h3>Famous Places in ${destination}:</h3>
    <p>${famousPlaces[destination]?.description || 'No information available'}</p>
  `;

  // Update map and other elements
  showRouteOnMap(shortest.path);
  await fetchWeather(destination, weatherDiv);
  await loadDestinationImages(destination, imageContainer);
  sidebar.style.display = 'flex';
}

// ================== EVENT LISTENERS ==================
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  
  document.getElementById('findRouteBtn').addEventListener('click', findShortestPath);
  
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('darkModeToggle');
    btn.textContent = document.body.classList.contains('dark-mode') 
      ? '☀️ Light Mode' 
      : '🌙 Dark Mode';
  });
  
  document.getElementById('toggleSidebarBtn').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
  });
});