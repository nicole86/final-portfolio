
$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

  //           var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
  //
  //           var requestBody = toSend;
  //           var emptyRequest = require('sendgrid-rest').request;
  //           var requestPost = JSON.parse(JSON.stringify(emptyRequest));
  //           requestPost.method = 'POST';
  //           requestPost.path = '/v3/mail/send';
  //
  //           var helper = require('sendgrid').mail
  //
  // var from_email = new helper.Email(email)
  // var to_email = new helper.Email("brower.nicole86@gmail.com")
  // var subject = "Website Contact Form: " + name;
  // var content = new helper.Content("text/plain", "You have received a new message from your website contact form.\n\n.Here are the details:\n\nName: " + name + "\n\nEmail:" + email + "\n\nPhone: " + phone + "\n\nMessage:\n" + message);
  // var mail = new helper.Mail(from_email, subject, to_email, content)
  //
  // var json = mail.toJSON();
  //           requestPost.body = json;
  //           sg.API(requestPost, function (response) {
  //               console.log(response.statusCode)
  //               console.log(response.body)
  //               console.log(response.headers)
  //           });


            $.ajax({
                url: "mail/contact.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false
                // success: function() {
                //     // Enable button & show success message
                //     $("#btnSubmit").attr("disabled", false);
                //     $('#success').html("<div class='alert alert-success'>");
                //     $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                //         .append("</button>");
                //     $('#success > .alert-success')
                //         .append("<strong>Your message has been sent. </strong>");
                //     $('#success > .alert-success')
                //         .append('</div>');
                //
                //     //clear all fields
                //     $('#contactForm').trigger("reset");
                // },
                // error: function() {
                //     // Fail message
                //     $('#success').html("<div class='alert alert-danger'>");
                //     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                //         .append("</button>");
                //     $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                //     $('#success > .alert-danger').append('</div>');
                //     //clear all fields
                //     $('#contactForm').trigger("reset");
                // },
            }).done(function(data){
              console.log(data);
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
