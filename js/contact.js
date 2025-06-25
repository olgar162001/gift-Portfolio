function contact_form() {
    
    var form = $('#form')[0];
    var data = new FormData(form);

    // Disable the submit button
    $("#btn").prop("disabled", true);

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "PHP_Function/contact.php",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 800000,
        success: function (response) {
            $("#btn").prop("disabled", false); // Re-enable the button after response

            // Check for success or error
            if (response.trim() === "1") { // Adjust if backend returns specific response
                $("#error").hide(); // Hide error message if visible
                $("#success").show().html("Thank you! Your message has been sent.");
                $("#form").trigger("reset"); // Reset the form

                // Automatically hide success message after 5 seconds
                setTimeout(function() {
                    $("#success").fadeOut("slow");
                }, 5000);

            } else {
                $("#success").hide(); // Hide success message if visible
                $("#error").show().html("There was an issue sending your message. Please try again.");

                // Automatically hide error message after 5 seconds
                setTimeout(function() {
                    $("#error").fadeOut("slow");
                }, 5000);
            }
        },
        error: function () {
            $("#btn").prop("disabled", false); // Re-enable the button in case of error
            $("#success").hide();
            $("#error").show().html("There was an issue sending your message. Please try again.");

            // Automatically hide error message after 5 seconds
            setTimeout(function() {
                $("#error").fadeOut("slow");
            }, 5000);
        }
    });
}
