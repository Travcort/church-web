import express from 'express';
const app = express();

// Environment Variables
import { PORT } from './utils/config.js';

// Path
import path from 'path';
const __dirname = path.resolve();
// Static Files
app.use(express.static(path.join(__dirname, "frontend")))

// Parse incoming JSON requests
app.use(express.json());

// Routes
import registerRoute from './routes/register.js';

// Registration
app.use("/api/register", registerRoute);

// Start the server on port 5000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
