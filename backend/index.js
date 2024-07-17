const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const port = 3000;
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // Destination folder for uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://which-img:cialabsintern@atlascluster.mytwvuv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define Mongoose Schema for User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// Define Mongoose Schema for Job Application
const jobApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  education: { type: String, required: true },
  skills: { type: String, required: true },
  linkedin: { type: String },
  portfolio: { type: String },
  appliedAt: { type: Date, default: Date.now },
});
const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

// Define Mongoose Schema for Job
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  salary: { type: Number },
});
const Job = mongoose.model("Job", jobSchema);

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes

// User Authentication

// POST /signup - User signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "User creation failed", error: error.message });
  }
});

// POST /login - User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Store user session data
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res
      .status(200)
      .json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// POST /logout - User logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Logout failed", error: err.message });
    }
    res.clearCookie("connect.sid"); // Clear session cookie manually
    res.status(200).json({ message: "Logout successful" });
  });
});

// Job Application

// POST /apply - Apply for a job
app.post("/apply", upload.single("resume"), async (req, res) => {
  const {
    jobId,
    name,
    email,
    mobile,
    experience,
    coverLetter,
    education,
    skills,
    linkedin,
    portfolio,
  } = req.body;
  const resume = req.file ? req.file.filename : null;

  if (!resume) {
    return res.status(400).json({ message: "Resume is required" });
  }

  try {
    const newApplication = new JobApplication({
      jobId,
      // userId: req.session.user._id, // Ensure the user is logged in
      name,
      email,
      mobile,
      experience,
      resume,
      coverLetter,
      education,
      skills,
      linkedin,
      portfolio,
    });
    await newApplication.save();
    res.status(201).json({ message: "Job application submitted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Job application submission failed",
      error: error.message,
    });
  }
});

// Job

// POST /jobs - Add a new job
app.post("/add-new-job", async (req, res) => {
  const { title, company, location, description, salary } = req.body;

  try {
    const newJob = new Job({
      title,
      company,
      location,
      description,
      salary,
    });
    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Job creation failed", error: error.message });
  }
});

// GET /jobs - Retrieve all jobs
app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
});

app.get("/search", async (req, res) => {
  const { company, location, position } = req.query;
  let query = {};

  if (company) {
    query.company = { $regex: company, $options: "i" }; // Case-insensitive search
  }
  if (location) {
    query.location = { $regex: location, $options: "i" };
  }
  if (position) {
    query.position = { $regex: position, $options: "i" };
  }

  try {
    // If no specific query parameters are provided, return all jobs
    const jobs =
      Object.keys(query).length === 0
        ? await Job.find()
        : await Job.find(query);
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
});

// GET /jobs/:id - Retrieve a job by ID
app.get("/jobs/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch job", error: error.message });
  }
});

// PUT /jobs/:id - Update a job by ID
app.put("/jobs/:id", async (req, res) => {
  const jobId = req.params.id;
  const { title, company, location, description, salary } = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { title, company, location, description, salary },
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update job", error: error.message });
  }
});

// DELETE /jobs/:id - Delete a job by ID
app.delete("/jobs/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res
      .status(200)
      .json({ message: "Job deleted successfully", job: deletedJob });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete job", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
