
# 🚀 Journey Planner

A smart and interactive web-based travel assistant that helps users plan trips between major Indian cities by finding the shortest route, estimating travel time and cost based on the mode of transport, displaying destination highlights, and fetching real-time weather information.

---

## 🗺️ Features

- 🌍 **Route Finder**: Uses Dijkstra's algorithm to calculate the shortest path between selected cities.
- 🚌 **Transport Modes**: Supports Car, Bike, Bus, and Train with configurable speed and cost.
- 📍 **Interactive Map**: Visualizes the travel route and city markers using Leaflet.js and OpenStreetMap.
- 📷 **Famous Places**: Displays popular attractions and tourist images of the destination city.
- 🌤️ **Live Weather**: Fetches real-time weather details for the destination using OpenWeatherMap API.
- 🌗 **Dark Mode**: Built-in light and dark theme toggle for comfortable viewing.
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile experiences.

---

## 📂 Project Structure

```
📁 Journey-Planner
├── index.html        # Main HTML structure
├── style.css         # CSS styles and dark mode support
├── script.js         # JavaScript logic (routing, weather, images, UI)
└── images/           # Folder containing city and tourist spot images
```

---

## 🛠️ Tech Stack

- **HTML5, CSS3, JavaScript (Vanilla JS)**
- **Leaflet.js** for map rendering
- **OpenStreetMap** for map tiles
- **OpenWeatherMap API** for weather data
- **Google Fonts** for UI typography

---

## 🚧 How It Works

1. Select source and destination cities from dropdowns.
2. Choose your preferred mode of transport.
3. Click **Find Route**.
4. The application:
   - Computes the shortest route using Dijkstra’s algorithm.
   - Displays distance, travel time, and estimated cost.
   - Renders the route on an interactive map.
   - Shows tourist places and city images.
   - Fetches and displays live weather data.

---

## 🌦️ Weather API Setup

> **Note**: You need to use a valid OpenWeatherMap API key.

To update the API key:

1. Open `script.js`
2. Replace the placeholder API key:
```js
const apiKey = 'your_api_key_here';
```

---

## 📸 Adding More Cities or Places

To add new cities or tourist images:

- Update the `cityCoordinates` and `graph` objects in `script.js`.
- Add new entries in the `famousPlaces` object with image URLs and descriptions.
- Place corresponding images in the `images/` folder.

---

## 💡 Future Enhancements

- 🔍 Search bar for city selection.
- 🧭 Multiple waypoint route planning.
- 🏨 Hotel and restaurant recommendations.
- 🗓️ Trip scheduling and reminders.

---

## 📃 License

This project is open for educational and personal use.

---

## 🙌 Acknowledgements

- [Leaflet.js](https://leafletjs.com/)
- [OpenWeatherMap](https://openweathermap.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- Icon emojis by [Twemoji](https://twemoji.twitter.com/)
