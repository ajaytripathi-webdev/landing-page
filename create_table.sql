CREATE TABLE IF NOT EXISTS partner_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    city VARCHAR(50) NOT NULL,
    nature_of_business VARCHAR(50) NOT NULL,
    years_in_business VARCHAR(20) NOT NULL,
    store_size VARCHAR(50) NOT NULL,
    submission_date DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 