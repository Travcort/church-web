import { Router } from "express";
const router = Router();
import db from "../db.js";
import ticketGenerator from "../utils/ticketing.js";

router.post("/", async (req, res) => {
    const { name, email, churchName, phone, boardingStatus, role } = req.body;

    // Validate input
    if (!name || !email || !phone || !boardingStatus || !role) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // To rethink
    const uniqueID = `BDC-${Date.now()}`;

    // Transaction to manage DB connection
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Generate the PDF ticket
        const ticketPath = await ticketGenerator({
            name,
            email,
            churchName,
            phone,
            boardingStatus,
            role,
            uniqueID,
        });

        // Insert registration into the database
        await connection.query(
            "INSERT INTO registrations (name, email, church_name, phone, boarding_status, role, unique_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, email, churchName || null, phone, boardingStatus, role, uniqueID]
        );

        await connection.commit(); // Commit the transaction

        // Respond with success
        res.status(200).json({
            message: "Registration successful!",
            ticketPath,
            uniqueID,
        });
    } catch (error) {
        // Let's say for some reason the operation fails midway
        await connection.rollback();
        // console.error("Error:", error);

        // To implement better error handling
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email is already registered!" });
        }
        else {
            res.status(500).json({ message: "An error occurred!", error: error.message });
        }
    } finally {
        connection.release(); // Always release the connection
    }
});

export default router;
