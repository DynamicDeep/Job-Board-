const API_URL = "http://localhost:5000/api/jobs"; // Your backend API

export const fetchJobs = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch jobs");
        }
        return await response.json(); // Convert response to JSON
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return []; // Return empty array if there’s an error
    }
};
    