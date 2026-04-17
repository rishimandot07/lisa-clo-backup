/*eslint-disable no-undef */
console.log("🔥🔥 THIS IS THE REAL SERVER FILE");

require("dotenv").config({ path: __dirname + "/.env" });
console.log("ENV CHECK:", process.env.MONGO_URI);

console.log("ENV:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const Product = require("./models/Product");

console.log("🔥 SERVER FILE LOADED");
console.log("SERVER STARTED CORRECT FILE");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

app.use("/images", express.static("uploads")); 
const upload = multer({ storage: storage });

app.use(cors({origin:"*"}));
app.use(express.json());
app.use("/uploads", express.static("backend/uploads"));

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const newProduct = new Product({
      name,
      price,
      image: `http://localhost:8000/uploads/${req.file.filename}`, 
      category
    });

    await newProduct.save();

    res.json({ message: "Product added", product: newProduct });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", async (req, res) => { 
  console.log("PRODUCTS ROUTE HIT");
  const products = await Product.find();
  res.json(products);
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Image uploaded",
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "Signup successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.json({
      message: "User saved successfully",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected to lisa_db"))
  .catch(err => console.log(err));


 const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});