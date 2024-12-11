import nodemailer from 'nodemailer';
// Mail Settings
import { HostEmail, HostPassword } from "./config.js";

const sendEmail = (pdfStream, email) => {
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
                content: pdfStream,
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
}

export default sendEmail;