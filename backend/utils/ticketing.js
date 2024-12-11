import PDFDocument from "pdfkit";
import { PassThrough } from "stream";
import sendEmail from "./mailing.js";

async function ticketGenerator({ name, email, churchName, phone, boardingStatus, role, uniqueID }) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        
        // Generate Emails on the fly
        const pdfStream = new PassThrough();

        doc.pipe(pdfStream);

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

        // Resolve the promise by passing the email address of the attendee and sending the email itself
        pdfStream.on("finish", () => {
            resolve(email);
            sendEmail(pdfStream, email);
        });
        pdfStream.on("error", (err) => reject(err));
    });
}

export default ticketGenerator;
