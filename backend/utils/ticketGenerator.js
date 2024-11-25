import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";

async function ticketGenerator({ name, email, churchName, phone, boardingStatus, role, uniqueID }) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = `tickets/${uniqueID}.pdf`;
        
        // Constant to track the progression of the writeStream 
        const writestream = createWriteStream(filePath)

        doc.pipe(writestream);

        doc.fontSize(20).text("Believers Dominion Conference 2025", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Name: ${name}`);
        doc.text(`Email: ${email}`);
        doc.text(`Church Name: ${churchName}`);
        doc.text(`Phone: ${phone}`);
        doc.text(`Boarding Status: ${boardingStatus}`);
        doc.text(`Role/Position: ${role}`);
        doc.text(`Unique ID: ${uniqueID}`);

        doc.end();

        // Resolve the promise by sending the file path to the ticket that has been generated
        writestream.on("finish", () => resolve(filePath));
        writestream.on("error", (err) => reject(err));
    });
}

export default ticketGenerator;
