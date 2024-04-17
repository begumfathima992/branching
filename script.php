<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  echo 'This is a PHP script for handling form submissions. Please submit your data using a POST request.';
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);

// Assuming you have a function to send email, replace 'sendEmail' with your actual email sending function
if (sendEmail($data)) {
  http_response_code(200);
  echo json_encode(array('message' => 'Email sent successfully'));
} else {
  http_response_code(500);
  echo json_encode(array('message' => 'Failed to send email'));
}

// Function to send email
function sendEmail($data) {
  $to = 'your@email.com';
  $subject = 'Contact Form Submission';
  $message = 'Name: ' . $data['name'] . '\n';
  $message .= 'Email: ' . $data['email'] . '\n';
  $message .= 'Phone: ' . $data['phone'] . '\n';
  $message .= 'Message: ' . $data['message'];

  return mail($to, $subject, $message);
}
?>
