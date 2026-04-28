/*eslint-disable no-undef */
console.log("✅ SERVER FILE LOADED");
require("dotenv").config({ path: __dirname + "/.env" });
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
const Order = require("./models/Order");
const PORT = Number(process.env.PORT) || 8000;
const PUBLIC_ORIGIN = (
  process.env.PUBLIC_ORIGIN || `http://localhost:${PORT}`
).replace(/\/$/, "");

const uploadDir = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static(uploadDir, {
  setHeaders: (res, path) => {
    res.set("Access-Control-Allow-Origin", "*");
  }
}));

app.get("/", (_req, res) => {
  res.send("Backend Running 🚀");
});

app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const newProduct = new Product({
      name,
      price,
      image: `${PUBLIC_ORIGIN}/uploads/${req.file.filename}`,
      category,
    });

    await newProduct.save();

    res.json({ message: "Product added", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", async (_req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    res.json({
      message: "Image uploaded",
      imageUrl: `${PUBLIC_ORIGIN}/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
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
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (_req, res) => {
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
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== CREATE ORDER =====
app.post("/api/orders", async (req, res) => {
  try {
    console.log("🔥 ORDER RECEIVED:", req.body);

    const newOrder = new Order(req.body);
    await newOrder.save();

    res.status(201).json({ message: "Order saved" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected to lisa_db"))
  .catch((err) => console.log(err));

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT, "PUBLIC_ORIGIN=", PUBLIC_ORIGIN);
});
