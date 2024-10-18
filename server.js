const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const budgetSchema = require("./model/budget_schema");
let url = "mongodb://127.0.0.1:27017/budget";

// Middleware
app.use("/", express.static("public"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MongoDB connection setup
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Database connection error:", err));

// Routes
app.get("/budget", (req, res) => {
    budgetSchema.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log("Error fetching data:", err);
            res.status(500).send(err.message);
        });
});

app.post("/postNewBudget", (req, res) => {
    let newData = new budgetSchema(req.body);
    newData.save()
        .then(() => {
            res.send("Data inserted into the database successfully");
        })
        .catch((err) => {
            console.log("Error inserting data:", err);
            res.status(500).send(err.message);
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});