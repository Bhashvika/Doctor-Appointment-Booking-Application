const express = require("express");
const connectDB = require("./config/db");
const { userrouter } = require("./Routes/userroute");
const router = require("./Routes/BookingRoute");
const bodyParser = require("body-parser");
const AddDoctorRouter = require("./Routes/AddDoctorRoute");
const { Doctorrouter } = require("./Routes/DoctorRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Serve uploaded images
app.use("/images", express.static("uploads")); // Correctly serve the uploaded images

// Routes
app.use("/api", userrouter);
app.use("/api", router);
app.use("/api", AddDoctorRouter);
app.use("/api", Doctorrouter);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
server.timeout = 1780000;
