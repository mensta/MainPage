$(function() {
    function loginHandler() {
        var loginblock = $('.login-screen')
          , registerbtn = $('.registerbtn')
          , loginbtn = $('.loginbtn')
          , simpleReg = $('.simpleReg')
          , haveAcc = $('.haveAcc')
          , passResetBtn = $('.passwordRecovery')
          , loginForm = $('#login-formDiv')
          , registerForm = $('#register-formDiv')
          , passRecovery = $('#passRecovery')
          , authLoginBtn = $('#submitLogin');
        simpleReg.click(function(e) {
            e.preventDefault();
            loginblock.show();
            loginForm.hide();
            passRecovery.hide();
            registerForm.show();
        });
        registerbtn.click(function(e) {
            loginblock.show();
            loginForm.hide();
            passRecovery.hide();
            registerForm.show();
        });
        loginbtn.click(function(e) {
            loginblock.show();
            registerForm.hide();
            passRecovery.hide();
            loginForm.show();
        });
        haveAcc.click(function(e) {
            e.preventDefault();
            loginblock.show();
            registerForm.hide();
            passRecovery.hide();
            loginForm.show();
        });
        passResetBtn.click(function(e) {
            e.preventDefault();
            loginblock.show();
            registerForm.hide();
            loginForm.hide();
            passRecovery.show();
        });
        authLoginBtn.click(function(e) {
            $(this).addClass('btn-loading btn-load-green');
        });
    }
    loginHandler();
    /*
    $("#login-form").click(function(e) {
        username=$("#login-name").val();
        password=$("#login-pass").val();
        e.preventDefault();
          console.log(username);
         $.ajax({
           type: "POST",
           url: "engine/modules/login.php",
            data: "login-name="+username+"&login-pass="+password,
            success: function(html){ 
            console.log('success?');
            console.log(html);   
            if(html=='true')    {
             //$("#add_err").html("right username or password");
             //window.location="dashboard.php";
            }
            else    {
            $("#add_err").css('display', 'inline', 'important');
             $("#add_err").html("<img src='images/alert.png' />Wrong username or password");
            }
           },
           beforeSend:function()
           {
            $("#add_err").css('display', 'inline', 'important');
            $("#add_err").html("<img src='images/ajax-loader.gif' /> Loading...")
           }
          });
        });
*/
  
    $("#login-form").submit(function() {
        var form = $(this);
        var data = form.serialize();
       // var data = $("#login-form").serialize();
        $.ajax({
            type: 'POST',
            url: 'engine/modules/login.php',
            data: data,
            beforeSend: function() {
                $("#loginError").fadeOut();
                $("#submitLogin").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; Logging in ...');
                //form.find('button[type="submit"]').attr('disabled', 'disabled').addClass('btn-loading btn-load-green');
                
            },
            success: function(data) {
                console.log(data);
                if (data === "fail") {
                    $("#loginError").fadeIn();
                    //$('#formMessageLog').show().find('.message-text').html(data['error']);
                    setTimeout(function(){
                        $("#submitLogin").replaceWith('<button type="submit" class="btn btn-primary btn-large btn-block" id="submitLogin" name="submitLogin" style="background-color: #00a8ff;">login</button>');
                    },700);
                } else {
                    if (data === "success") {
                        $("#registerSuccess").fadeOut();
                        $("#loginError").fadeOut();
                        $("#loginSuccess").fadeIn();
                    setTimeout(function(){
                        location.href = "/account";
                    },1500);
                    }
                }
            },
            complete: function(data) {
                form.find('button[type="submit"]').prop('disabled', false).removeClass('btn-loading btn-load-green');
            }
        });
        return false;
    });


    $("#register-form").submit(function() {
        var form = $(this);
        var data = form.serialize();
        console.log('reg form');
        $.ajax({
            type: 'POST',
            url: 'engine/modules/register.php',
            //dataType: 'json',
            data: data,
            beforeSend: function(data) {
                $('#registerFail').fadeOut();
                //form.find('button[type="submit"]').attr('disabled', 'disabled').addClass('btn-loading btn-load-primary');
            },
            success: function(data) {
                console.log(data);
                if (data === "success") {
                    $('#registerFail').fadeOut();
                    console.log('IS SUCC');
                    $("#registerSuccess").fadeIn();
                    setTimeout(function(){
                        $('#register-formDiv').hide();
                        $('#login-formDiv').show();
                        usernameReg=$("#register-form #login-name").val();
                        $("#login-name").val(usernameReg);
                     //   $("#registerSuccess").hide();
                      //  $("#registerSuccess").show();
                    },700);
                    form.find('.append-icon,.social-btn,button').remove();
                    //$('#loginForm .clearfix, #loginForm .social-btn').remove();
                    //$('#haveAcc').addClass('btn btn-lg btn-success btn-block').text('Авторизация');                        
                   // $('#registerSuccess').show().addClass('register-done').removeClass('alert-danger').addClass('alert-success').find('.message-text').html(data);
                } else {
                    console.log('NO SUCC')
                    $('#registerFail').fadeIn().html(data);
                    //$('#formMessageReg').show().find('.message-text').html(data['error']);
                }
            },
            complete: function(data) {
                //form.find('button[type="submit"]').prop('disabled', false).removeClass('btn-loading btn-load-primary');
            }
        });
        return false;
    });

    $("#passRecoveryForm").submit(function() {
        var form = $(this);
        var data = form.serialize();
        $.ajax({
            type: 'POST',
            url: '/engine/ajax/reset_pass.php',
            dataType: 'json',
            data: data,
            beforeSend: function(data) {
                form.find('button[type="submit"]').attr('disabled', 'disabled').addClass('btn-loading btn-load-green');
            },
            success: function(data) {
                if (data['error']) {
                    $('#passRecoveryMSG').show().find('.message-text').html(data['error']);
                    form.find('button[type="submit"]').prop('disabled', false).removeClass('btn-loading btn-load-green');
                } else if (data['success']) {
                    $('#passRecoveryForm').html('<div class="alert alert-success form-message">' + data['success'] + '</div>');
                    setTimeout(function() {
                        location.reload();
                    }, 3000);
                }
            },
            complete: function(data) {
                form.find('button[type="submit"]').removeClass('btn-loading btn-load-green');
            }
        });
        return false;
    });
});
