<?php
require '../vendor/autoload.php';
require '../vendor/sendgrid/smtpapi/lib/Smtpapi.php';
require '../vendor/sendgrid/smtpapi/lib/Smtpapi/Header.php';

use Smtpapi\Header;

$transport = \Swift_SmtpTransport::newInstance('smtp.sendgrid.net', 587);

$sendgrid_username = getenv('SENDGRID_USERNAME');
$sendgrid_password = getenv('SENDGRID_PASSWORD');

$transport->setUsername($sendgrid_username);
$transport->setPassword($sendgrid_password);

$mailer = \Swift_Mailer::newInstance($transport);
$message = new \Swift_Message();

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$message->setTo(array('brower.nicole86@gmail.com'));
$message->setFrom($email);
$message->setSubject('Website Contact Form: ' + $name);
$message->setBody(
  'You have received a new message from your website contact form.<br>
  Here are the details:<br><br>
  Name: ' . $name . '<br><br>
  Email: ' . $email . '<br><br>
  Phone: ' . $phone . '<br><br>
  Message:<br>' . $message
);

$header = new Header();
$message_headers = $message->getHeaders();
$message_headers->addTextHeader(HEADER::NAME, $header->jsonString());

try {
    $response = $mailer->send($message);
    print_r($response);
} catch(\Swift_TransportException $e) {
    print_r('Bad username / password');
}
?>
