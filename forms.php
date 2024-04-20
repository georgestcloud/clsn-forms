<?php
// Retrieve form data
$fullname = $_POST['fullname'];
$email = $_POST['email'];
$address = $_POST['add'];
$country = $_POST['country'];
$interest = $_POST['interest'];
$remember = isset($_POST['remember']) ? $_POST['remember'] : '';

// Compose the email message
$message = "Full Name: $fullname\n";
$message .= "Email: $email\n";
$message .= "Address: $address\n";
$message .= "Country: $country\n";
$message .= "Interest: $interest\n";
$message .= "Remember Me: " . ($remember ? 'Yes' : 'No') . "\n";

// Set the recipient email addresses (comma-separated list)
$to = "george@candlelightspecialneeds.org, info@candlelightspecialneeds.org"; // Replace with your email addresses

// Set the subject of the email
$subject = "Form Submission";

// Set additional headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send the email
$mailSent = mail($to, $subject, $message, $headers);

// Check if the email was sent successfully
if ($mailSent) {
    echo "Thank you for your submission. We will get back to you shortly.";
} else {
    echo "Error: Unable to send email.";
}
?>
