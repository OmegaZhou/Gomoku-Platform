function init_room(){
    var init=function(){
        $('#local_mode').show();
        $('#ai_mode').show();
        $('#net_mode').show();
        $('#ai_menu').hide();
    };
    init();
    var hide_room=function(){
        $('#local_mode').hide();
        $('#ai_mode').hide();
        $('#net_mode').hide();
    };
    $('#ai_mode').click(function(){
        hide_room();
        $('#ai_menu').show();
    });
    $('.back_to_room').click(function(){
        init();
    });
}