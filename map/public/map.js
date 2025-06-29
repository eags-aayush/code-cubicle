document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ map.js loaded');
  const LOCATIONIQ_API_KEY = 'pk.dd82e50dab62e8671c15878a51a18046';

  const map = L.map('map', {
    maxBounds: [
      [6.5546079, 68.1113787],  // SW India
      [35.6745457, 97.395561],  // NE India
    ],
    maxBoundsViscosity: 1.0
  }).setView([20.5937, 78.9629], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const icons = {
    issue: L.icon({
      iconUrl: './static/images/issue.png',
      iconSize: [20, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    }),
    suggestion: L.icon({
      iconUrl: './static/images/suggestion.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    }),
    user: L.icon({
      iconUrl: './static/images/current-location.png',
      iconSize: [20, 30],
      iconAnchor: [10, 30],
      popupAnchor: [0, -30]
    })
  };

  // Show user's location
  function showUserLocation() {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      console.log(`User location: ${lat}, ${lng}`);

      L.marker([lat, lng], { icon: icons.user })
        .addTo(map)
        .bindPopup('You are here')
        .openPopup();

      map.setView([lat, lng], 12);
    }, err => {
      console.error('Error getting user location:', err.message);
    });
  }

  // Geocode with debug logs
  async function geocodeAddress(address) {
  const cleanAddress = address.trim().replace(/\s+/g, ' ');
  console.log(`Geocoding with LocationIQ: "${cleanAddress}"`);

  const url = `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(cleanAddress)}&format=json&countrycodes=in&limit=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('LocationIQ response:', data);

    if (!data || data.length === 0) return null;

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    console.log(`Got coords from LocationIQ: ${lat}, ${lon}`);
    return { lat, lon };
  } catch (error) {
    console.error('LocationIQ geocoding error:', error);
    return null;
  }
}


  // Load and plot reports with debug logs
  async function loadReports() {
  console.log('Fetching reports...');
  try {
    const res = await fetch('/get-reports');
    if (!res.ok) {
      console.error('Fetch failed:', res.status);
      return;
    }
    const reports = await res.json();
    console.log('Reports received:', reports);

    for (const [index, report] of reports.entries()) {
      // Ignore dummy or invalid locations
      if (!report.location || report.location.trim().toLowerCase().includes('test') || report.location.trim().toLowerCase() === 'not provided') {
        console.log(`Skipping dummy/invalid location at report #${index}:`, report.location);
        continue;
      }

      const locationTrimmed = report.location.trim();
      const coords = await geocodeAddress(locationTrimmed);
      if (!coords) {
        console.log(`Geocoding failed for report #${index} at location:`, locationTrimmed);
        continue;
      }

      const type = (report.incident_type || 'Issue').toLowerCase();
      const icon = icons[type] || icons.issue;
      const desc = report.issue_description || 'No description';

      console.log(`Placing marker #${index} at ${coords.lat}, ${coords.lon} of type ${type}`);

      L.marker([coords.lat, coords.lon], { icon })
        .addTo(map)
        .bindPopup(`<strong>${report.incident_type}</strong><br>${desc}`);
    }
  } catch (err) {
    console.error('Error loading reports:', err);
  }
}

  showUserLocation();
  loadReports();
});
