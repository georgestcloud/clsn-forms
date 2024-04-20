const http = require('http');
const querystring = require('querystring');
const nodemailer = require('nodemailer');

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'chinakageorge.i@gmail.com', // Your Gmail address
    pass: 'madeoffaith1996' // Your Gmail password or app-specific password
  }
});

// Create a HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit-form') {
    let body = '';

    // Collect the request body
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // When the request body is fully received
    req.on('end', () => {
      const formData = querystring.parse(body);

      // Compose the email message
      const message = `
        Full Name: ${formData.fullname}
        Email: ${formData.email}
        Address: ${formData.add}
        Country: ${formData.country}
        Interest: ${formData.interest}
        Remember Me: ${formData.remember ? 'Yes' : 'No'}
      `;

      // Set the recipient email address (your email address)
      const to = 'george@candlelightspecialneeds.org'; // Replace with your email address
      const subject = 'Form Submission';

      // Send the email
      transporter.sendMail({
        from: 'chinakageorge.i@gmail.com', // Sender's email address (your Gmail address)
        to,
        subject,
        text: message
      }, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Error: Unable to send email.');
        } else {
          console.log('Email sent:', info.response);
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Thank you for your submission. We will get back to you shortly.');
        }
      });
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');
  }
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
