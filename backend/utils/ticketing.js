import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";
import nodemailer from 'nodemailer';

// Mail Settings
import { HostEmail, HostPassword } from "./config.js";

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


        // Crafting the email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 567,
            secure: false,
            auth: {
                user: HostEmail,
                pass: HostPassword
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: {
                name: 'BDC Admin',
                address: HostEmail
            },
            to: [email],
            subject: 'BDC Conference Ticket',
            text: 'Welcome to BDC 2025!\nAttached below is your ticket',
            attachments: [
                {
                    filename: 'BDC Ticket.pdf',
                    path: filePath,
                    contentType: 'application/pdf'
                }
            ]
        }

        // Sending the email
        const sendMail = async (transporter, mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log('E-mail sent Successfully!');
            } catch (error) {
                console.error('Error: ', error);
            }
        }

        sendMail(transporter, mailOptions);

        // Resolve the promise by sending the file path to the ticket that has been generated
        writestream.on("finish", () => resolve(email));
        writestream.on("error", (err) => reject(err));
    });
}

export default ticketGenerator;
