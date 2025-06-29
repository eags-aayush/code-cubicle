const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 🔁 Global data cache
let cachedReports = [];

// ✅ Connect to MongoDB (webhookdb -> incidents collection)
mongoose.connect('mongodb://localhost:27017/webhookdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');

  // Define schema & model
  const reportSchema = new mongoose.Schema({
    date: String,
    time: String,
    incident_type: String,     // "Issue" or "Suggestion"
    location: String,          // Real address or "Not provided"
    caller_name: String,
    issue_description: String,
    incident_time: String,
    resolved: Boolean
  }, { collection: 'incidents' });

  const Report = mongoose.model('Report', reportSchema);

  // 🧠 Fetch data once on connection
  cachedReports = await Report.find().lean();
  console.log(`📦 Cached ${cachedReports.length} reports`);

})
.catch(err => {
  console.error('❌ MongoDB error:', err);
});

// ✅ GET endpoint uses cached data
app.get('/get-reports', (req, res) => {
  res.json(cachedReports);
});

// 🚀 Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
