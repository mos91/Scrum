ENTER_KEY_CODE = 13;

ValidateFields = function(data){
    var result = {};
    var password, email;
    
    if ((email = $('input#email').val()) && (password = $('input#password').val())){
        result.password = MD5(MD5(password));
        result.email = email;
        result.remember = data.remember;
    }
    else {
        result['error'] = 'empty password or email field';
    }
        
    return result;
}

MakeLoginRequest = function(data){
    $.ajax({ 
            url : 'Authorization.php',
            data : data,
            type : "POST",
            dataType : 'json',
            beforeSend : function(jqXHR, settings)
            {
                $('.login_form').hide();
                $('.login-process').show();
            },
            complete : function(jqXHR, textStatus)
            {
                var data = jqXHR.data;

                if (data && data.success)
                {
                    $('.login-success').show();
                    $('#purchase_reports,#property_rating').removeClass('disabled');
                    $('#purchase_reports a').attr('href', 'purchase_reports.php');
                    $('#property_rating a').attr('href', 'property_rating.php');
                    $('#join').addClass('disabled');
                    $('#join a').removeAttr('href')
                }
                else
                {
                    $('.login-error').show();
                }
                $('.login-process').hide();
            },
            success : function(data, textStatus, jqXHR)
            {
                if (data && data.success)
                {
                    $('.admin-string').hide();
                    if (document.cookie.match(/is_admin/)){
                        $('.admin-string').show();
                    }
                }  
                else
                {
                    $('.login-error > span').html(data.error);
                }
                jqXHR.data = data;  
            },
            error : function(jqXHR)
            {
                $('.login-error > span').html(jqXHR.status);
            }
        })
}

Login = function(event)
{ 
    var data = event.data;
    result = ValidateFields(data);
    if (!result.error){
        MakeLoginRequest(result);
    }
    else{
        $('.login_form').hide();
        $('.login-error').show();
        $('.login-error > span').html(result.error);
    }
}

bindLoginFormHandlers = function()
{
    var remember = ($('#remember_check:checked') && $('#remember_check:checked').length)? true : false;
    $('.btn_login').on('click',function(event){ 
            event.data = { 
                email : $('#email').val(), 
                password : $('#password').val(),
                remember : remember
            };
            Login(event);
    });
        
    $('.cancel-link').on('click', function(event){
        $('.login-error').hide();
        $('.login_form').show();
        $('#password').attr('value','');
    });

    $('#password').on('keydown', function(event){
        var remember = ($('#remember_check:checked') && $('#remember_check:checked').length)? true : false;
        if (event.which == ENTER_KEY_CODE)//ENTER
        {
            event.data = { email : $('#email').val(), 
                password : $('#password').val(), 
                remember : remember
            };
            Login(event);
        }
    });   

    if (document.cookie.match(/is_admin/)){
        $('.admin-string').show();
    }
}

