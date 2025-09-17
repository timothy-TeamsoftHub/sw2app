require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');
const { security } = require('./src/security');
security(app);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SW2 backend running on port ${PORT}`));