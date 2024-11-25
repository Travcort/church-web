# Instructions

1. Fork the whole Repository
2. Clone to your local Machine
3. In the base folder run ```npm install```
4. Specify ```SERVER_PORT=<port of choice>``` where to run the server from in the environment variables
5. Database credentials in the environment variables:

        HOST = "localhost" // Runs locally for now
        USER = "" // your SQL server username    
        PASSWORD = "" // your SQL Server Password
        DATABASE = "bdc_2025" // Use this as is for now

6. Run the following SQL Queries to create the table:

        -- Create the table
        CREATE DATABASE bdc_2025;

        -- Create the Table to store registration details
        CREATE TABLE registrations (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          church_name VARCHAR(100),
          phone VARCHAR(15) NOT NULL,
          boarding_status ENUM('Boarder', 'Daytime') NOT NULL,
          role ENUM('Delegate', 'Pastor', 'Deacon', 'BDC Committee') NOT NULL DEFAULT 'Delegate';
          unique_id VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
7. Start the development server by typing ```npm run dev``` in the Base Directory
8. Navigate to ```localhost:<port>``` in the browser and try registering