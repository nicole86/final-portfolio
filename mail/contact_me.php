<?php
require '../vendor/autoload.php';
$sendgrid = new SendGrid(getenv('SENDGRID_USERNAME'), getenv('SENDGRID_PASSWORD'));

$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

echo '$name - $email_address \n';

$email = new SendGrid\Email();
$email->addTo('brower.nicole86@gmail.com')
    ->setFrom($email)
    ->setSubject('Website Contact Form: ' + $name)
    ->setHtml(
      'You have received a new message from your website contact form.<br>
      Here are the details:<br><br>
      Name: ' . $name . '<br><br>
      Email: ' . $email . '<br><br>
      Phone: ' . $phone . '<br><br>
      Message:<br>' . $message
);

$sendgrid->send($email);
return true;
// error_reporting(-1);
//
// // Check for empty fields
// if(empty($_POST['name'])  		||
//    empty($_POST['email']) 		||
//    empty($_POST['phone']) 		||
//    empty($_POST['message'])	||
//    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
//    {
// 	echo "No arguments Provided!";
// 	return false;
//    }
//
// $name = $_POST['name'];
// $email_address = $_POST['email'];
// $phone = $_POST['phone'];
// $message = $_POST['message'];
//
// // Create the email and send the message
// $to = 'brower.nicole86@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
// $email_subject = "Website Contact Form:  $name";
// $email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
// $headers = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
// $headers .= "Reply-To: $email_address";
// mail($to,$email_subject,$email_body,$headers);
// return true;
?>
