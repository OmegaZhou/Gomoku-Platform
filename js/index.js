function init_index_page() {
    var init=function(){
        $('#message').html('');
        $('#sign_in').show();
        $('#sign_up').show();
        $('#second').hide();
        $('#confirm').hide();
        $('#back').hide();
        $('#user_password').val('');
        $('#user_name').val('');
        $('#second_password').val('');
    };
    var check=function(){
        if($('#user_password').val()==''||$('#user_name').val()==''){
            $('#message').html('<font color="red">密码或用户名不能为空</font>');
            return false;
        }
        $('#message').html('');
        return true;
    }
    init();
    $('#sign_in').click(function () {
        if(check()==false){
            return;
        }
        
        $.post('/signin', { name: $('#user_name').val(), password: $('#user_password').val() }, function (data) {
            if (data.is_success == 1) {
                window.location.href='/room.html';
            }else{
                $('#message').html('<font color="red">密码或用户名错误</font>');
                return;
            }
        });
    });
    $('#sign_up').click(function () {
        $('#sign_in').hide();
        $('#sign_up').hide();
        $('#second').show();
        $('#confirm').show();
        $('#back').show();
    });
    $('#back').click(function () {
        init();
    });
    $('#confirm').click(function(){
        if(check()==false){
            return;
        }
        if($('#user_password').val().length<6){
            $('#message').html('<font color="red">密码长度不能小于6个字符</font>');
            return;
        }
        if($('#user_password').val()!=$('#second_password').val()){
            $('#message').html('<font color="red">密码不一致</font>');
            return;
        }
        $('#message').html('');
        $.post('/signup', { name: $('#user_name').val(), password: $('#user_password').val() }, function (data) {
            console.log(data);
            if (data == 1) {
                $('#message').html('<font color="green">注册成功</font>');
                $('#confirm').hide();
            }else{
                $('#message').html('<font color="red">用户名已存在</font>');
            }
        });
    });
}

