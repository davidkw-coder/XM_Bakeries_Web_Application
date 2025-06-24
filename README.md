# XM_Bakeries_Web_Application
📦 XM Bakery Inventory & Ordering System
🥖 Project Overview
XM Bakery is a bakery management system designed to manage products, track inventory, process customer orders, and generate sales reports.
This project was built using Node.js, Express.js, MySQL, and deployed using Firebase Functions.

🚀 Features
•	✅ User Registration and Login (JWT Authentication)
•	✅ Secure Password Hashing using bcrypt
•	✅ Product Management (CRUD)
•	✅ Product Search, Filter, and Sorting
•	✅ Order Placement with Multiple Products
•	✅ Order Tracking with Delivery Status
•	✅ Real-Time Inventory Tracking
•	✅ Sales Reporting (Total Sales, Best Sellers, Low Stock Alerts)
•	✅ Inventory Threshold Alerts
•	✅ JWT-Protected API Endpoints

🛠️ Technologies Used
•	Backend: Node.js, Express.js
•	Database: MySQL
•	Authentication: JWT (JSON Web Tokens), bcryptjs
•	Deployment: Firebase Functions
•	Tools: Postman, Swagger (OpenAPI 3.0), PM2, Redis (optional), Winston Logger, GitHub, Node-Cron (optional for scheduled tasks)

📂 Project Structure
bash
CopyEdit
xm-bakery-system/
│
├── server.js               # Express Server Entry Point
├── package.json            # Project Configuration
├── /config                 # Database Configurations
├── /controllers            # Business Logic
├── /routes                 # API Routes
├── /models                 # Database Queries
├── /middleware             # JWT and Validation Middleware
├── /functions              # Firebase Functions Setup
│
└── README.md               # Project Documentation

🔐 API Authentication
Most API endpoints require Bearer Token authentication using JWT.
Example:
http
CopyEdit
Authorization: Bearer <your-jwt-token>

📬 API Documentation
•	✅ Postman Collection: Provided in the repository (xm_bakery_postman_collection.json)
•	✅ Swagger Documentation: Provided (xm_bakery_swagger_documentation.json)
You can:
•	Import Postman Collection in Postman directly.
•	Load the Swagger file in Swagger Editor to test endpoints.

🧪 Running the Project Locally
1. Clone the Repository
bash
CopyEdit
git clone https://github.com/your-username/xm-bakery-system.git
cd xm-bakery-system
2. Install Dependencies
bash
CopyEdit
npm install
3. Set Up Environment Variables
Create a .env file:
dotenv
CopyEdit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=xm_bakery_db
JWT_SECRET=your_jwt_secret
4. Start the Server Locally
bash
CopyEdit
npx nodemon server.js
or using:
bash
CopyEdit
npm run dev
5. Deploy to Firebase
bash
CopyEdit
firebase login
firebase init functions
firebase deploy --only functions

📦 Deployment Options
•	Firebase Functions ✅
•	Render.com ✅
•	Heroku ✅
•	VPS with PM2 (Optional)
•	Docker (Optional)

📈 Reports & Alerts
•	Real-time low-stock alerts when inventory drops below the threshold.
•	Sales reports: total sales, best-selling products, low stock items.
•	Scheduled inventory checks using Node-Cron (optional).

📋 API Endpoints Summary
Endpoint	Method	Authentication
/api/auth/register	POST	No
/api/auth/login	POST	No
/api/products	POST	Yes
/api/products	GET	Yes
/api/orders	POST	Yes
/api/orders	GET	Yes
/api/orders/{orderId}/track	GET	Yes
/api/reports/sales	GET	Yes

💻 Testing Tools
•	Postman (API testing)
•	Swagger UI (API documentation)
•	Firebase Emulator (optional for local deployment)

🛡️ Security Considerations
•	Input validation (Recommended to use express-validator)
•	SQL Injection prevention
•	Password hashing using bcrypt
•	JWT token expiration and verification
•	Rate limiting and Helmet (recommended for production)

👥 Contributors
•	Project Developer: [Your Name]

📜 License
This project is licensed under the MIT License.

