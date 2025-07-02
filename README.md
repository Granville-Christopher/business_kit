# Business - AI Sales Funnel Kit Web Application

## Description
This is a Node.js Express web application that provides a free AI Sales Funnel Kit for creators and freelancers. Users can enter their name and email to receive a curated sales kit via email. The app uses EJS for templating, Tailwind CSS for styling, and Nodemailer for sending emails.

## Features
- Responsive landing page with a form to collect user name and email.
- Sends a personalized email with a free AI Sales Kit including funnels, ChatGPT prompts, and a sales checklist.
- Uses Nodemailer with SMTP for reliable email delivery.
- Integrates FontAwesome icons for social media links (Instagram and TikTok).
- Fixed social media icons at the bottom of the page linking to official websites.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd business
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MAIL_HOST=smtp.example.com
   MAIL_USER=your-email@example.com
   MAIL_PASS=your-email-password
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

- Fill in your name and email on the landing page form.
- Click "SEND ME THE AI KIT" to receive the sales kit via email.
- Social media icons for Instagram and TikTok are fixed at the bottom of the page linking to their official websites.

## Project Structure

- `index.js` - Main server setup and route registration.
- `routes/mailroute.js` - Defines routes for rendering the page and sending emails.
- `controller/emailcontroller.js` - Handles email sending logic using Nodemailer.
- `config/nodemailer.js` - Nodemailer transporter configuration.
- `views/index.ejs` - EJS template for the landing page.
- `public/` - Static assets including CSS and JavaScript files.

## Dependencies

- express
- ejs
- nodemailer
- dotenv
- nodemon (development)

## License

This project is licensed under the ISC License.

## Author

Granville Bucci Christopher
