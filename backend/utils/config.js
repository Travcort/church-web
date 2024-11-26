import dotenv from 'dotenv';
dotenv.config()

// Port
const PORT = process.env.SERVER_PORT;

const HostEmail = process.env.EMAIL_HOST;
const HostPassword = process.env.EMAIL_HOST_PASSWORD;

export { PORT, HostEmail, HostPassword };