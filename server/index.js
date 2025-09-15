// server/index.js
import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcryptjs"; // safer for Windows
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "plantdb",
});

db.connect((err) => {
  if (err) console.error("DB connection failed:", err);
  else console.log("Connected to DB");
});

app.listen(3002, () => console.log("Server running on port 3002"));

const JWT_SECRET = "your_secret_key_here"; // Change to something strong

// ---------------- REGISTER ----------------
app.post("/register", async (req, res) => {
  const { Username, Password, Email } = req.body;
  const hashedPassword = await bcrypt.hash(Password, 10);

  const SQL = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
  db.query(SQL, [Email, Username, hashedPassword], (err, result) => {
    if (err) return res.send({ error: err });

    // Generate token for dashboard access
    const token = jwt.sign({ id: result.insertId, username: Username }, JWT_SECRET, { expiresIn: "1h" });
    res.send({ message: "User registered successfully", token });
  });
});

// ---------------- LOGIN ----------------
app.post("/login", (req, res) => {
  const { LoginUserName, LoginPassword } = req.body;

  const SQL = "SELECT * FROM users WHERE username = ?";
  db.query(SQL, [LoginUserName], async (err, results) => {
    if (err) return res.send({ error: err });
    if (results.length === 0) return res.send({ message: "Credentials are incorrect" });

    const user = results[0];
    const match = await bcrypt.compare(LoginPassword, user.password);
    if (!match) return res.send({ message: "Credentials are incorrect" });

    // Generate token for dashboard access
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.send({ message: "Login successful", token });
  });
});

// ---------------- PROTECTED DASHBOARD ----------------
app.get("/dashboard", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expect: Bearer <token>
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.send({ message: `Welcome ${user.username} to your dashboard!` });
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
});
