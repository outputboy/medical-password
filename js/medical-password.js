$(document).ready(function() {
  /*
   * Submit form with serialized form array
   *
   */
  $('#submit-button').click(function(e) {
    // Validate form
    if (!$('#password-reset-form').valid()) {
      return false;
    }

    // Post form values to backend
    $.post(
      '/medical-password/post.php',
      {
        name: $('form#password-reset-form').serializeArray()
      },
      function(output) {
        console.log(output['result']);
      },
      'json'
    );

    e.preventDefault();
  });

  //Validate rules

  $('#password-reset-form').validate({
    rules: {
      new_password: {
        required: true,
        minlength: 8,
        passwordStrengthCheck: true
      },
      confirm_password: {
        equalTo: '#new_password'
      }
    },
    messages: {
      new_password: {
        required:
          'New password must be minimum 8 characters with at least one uppercase, lowercase, and special character',
        min: 'New password must be minimum 8 characters',
        passwordStrengthCheck:
          'Please enter at least one uppercase, lowercase, and special character'
      },
      confirm_password: {
        equalTo: 'New password and Confirm Password do not match'
      }
    },
    // Append error to relative class
    errorPlacement: function(error, element) {
      if (element.attr('name') == 'new_password') {
        error.appendTo($('.new-password-error'));
      } else if (element.attr('name') == 'confirm_password') {
        error.appendTo($('.confirm-password-error'));
      }
    },
    // Alter error class border colours
    showErrors: function(errorMap, errorList) {
      // Check if field include any errors
      let new_pass = true;
      let confirm_pass = true;
      for (let i = 0; i < errorList.length; i++) {
        if (errorList[i].element.name == 'new_password') {
          new_pass = false;
        } else if (errorList[i].element.name == 'confirm_password') {
          confirm_pass = false;
        }
      }

      // Append color based on error field
      if (new_pass) {
        $('.new-password-error').css('border-top', '2px solid #8AA5D0');
      } else {
        $('.new-password-error').css('border-top', '2px solid #dc3545');
      }
      if (confirm_pass) {
        $('.confirm-password-error').css('border-top', '2px solid #8AA5D0');
      } else {
        $('.confirm-password-error').css('border-top', '2px solid #dc3545');
      }

      this.defaultShowErrors();
    }
  });
});
// Added password strength check
$.validator.addMethod('passwordStrengthCheck', function(value, element, param) {
  if (!/[!@#$%^&*()_=\[\]{};':"\\|,.<>\/?+-]/.test(value)) {
    return false;
  } else if (!/[A-Z]/.test(value)) {
    return false;
  } else if (!/[a-z]/.test(value)) {
    return false;
  }

  return true;
});
