const express = require("express");
const router = express.Router();
const Job = require("../Models/Job");

router.get("/", async (req, res) => {
    const keywordsRaw = req.query.keywords;

    if (!keywordsRaw) {
        return res.status(400).json({ message: "No keywords provided" });
    }

    const keywords = keywordsRaw
        .split(",")
        .map(k => k.trim().toLowerCase());
    
    try {
        const jobs = await Job.find({});

        const matchedJobs = jobs.filter(job => {
            const text = (
                (job.title || "") + 
                " " + (job.description || "") +
                " " + (job.location || "")
            ).toLowerCase();

            return keywords.some(keyword => text.includes(keyword));
        });

        res.json(matchedJobs);
    } catch (err) {
        console.error("Error in recommendation:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;