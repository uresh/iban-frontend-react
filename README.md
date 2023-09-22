# iban-frontend-react

IBAN Validation Web Application built with React.js

# IBAN Validation Web Application (React Frontend)

Welcome to the IBAN Validation Web Application built with React.js. This web app allows users to verify the validity of IBAN (International Bank Account Number) numbers. It includes user registration and login features, IBAN validation, data storage in the database, and an admin dashboard to view and manage entered IBAN numbers.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Design Document](https://github.com/uresh/iban-frontend-react/blob/c793dc626928ffd6b0eb3f9876b892915d911016/IBAN%20Validation%20System%20Design%20Document.pdf)

## Getting Started

Follow these steps to set up and run the IBAN Validation Web Application on your local machine.

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js and npm (Node Package Manager)
- Git
- [IBAN Backend API](https://github.com/uresh/iban-backend-laravel) (Make sure the backend is set up and running)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/uresh/iban-frontend-react.git

   ```

2. Change to the project directory::

   ```bash
   cd iban-frontend-react

   ```

3. Create a .env file in the project root directory:

   ```bash
   touch .env

   ```

4. Open the .env file and set the VITE_API_BASE_URL variable to the URL of your IBAN backend API. For example:

   ```bash
   VITE_API_BASE_URL=http://localhost/iban-backend-laravel/public

   ```

5. Save and close the .env file.

6. Install dependencies:

   ```bash
   npm install

   ```

7. Start the development server:

   ```bash
   npm run dev

   ```

The React app will be available at http://localhost:3000.

Usage

- Register or log in to access the IBAN validation feature.
- Enter an IBAN number to validate.
- Validated IBAN numbers will be saved in the database.

### Admin Login :

- The admin user allows you to:
  - View a paginated list displaying all the entered IBAN numbers by users.
- Admin users should log in using the following credentials:
  - Username: admin@example.com
  - Password: admin@123
  
## License
This project is licensed under the MIT License.
