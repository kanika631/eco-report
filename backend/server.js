const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kani345",
    database: "eco_report"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("MySQL connected successfully");
    }
});

app.get("/", (req, res) => {
    res.send("Eco Report Backend is Running");
});

app.post("/api/issues", (req, res) => {

    const { issue, description } = req.body;

    const sql = "INSERT INTO issues (issue, description) VALUES (?, ?)";

    db.query(sql, [issue, description], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Failed to save issue"
            });
        }

        res.json({
            message: "Issue saved successfully"
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});