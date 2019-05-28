function init_room() {
    var init = function () {
        $('#local_mode').show();
        $('#ai_mode').show();
        $('#net_mode').show();
        $('#ai_menu').hide();
        $('#net_menu').hide();
        $('#net_color').hide();
        $('#room_list').hide();
    };

    init();
    var hide_room = function () {
        $('#local_mode').hide();
        $('#ai_mode').hide();
        $('#net_mode').hide();
    };
    $('#ai_mode').click(function () {
        hide_room();
        $('#ai_menu').show();
    });

    $('#net_mode').click(function () {
        hide_room();
        $('#net_menu').show();
    });

    $('#create').click(function () {
        $('#net_menu').hide();
        $('#net_color').show();
    })
    $('#net_black').click(function () {
        $.post('create_room', { color: 'black' }, function (data) {
            if (data != -1) {
                window.location.href = '/board.html?type=2&status=0&color=black&room=' + data;
            } else {
                window.location.href = '/index.html';
            }
        })
    });
    $('#net_white').click(function () {
        $.post('create_room', { color: 'white' }, function (data) {
            if (data != -1) {
                window.location.href = '/board.html?type=2&status=0&color=white&room=' + data;
            } else {
                window.location.href = '/index.html';
            }
        })
    });

    var get_room = function () {
        $('#net_menu').hide();
        $('#room_list').show();
        $.post('get_room', function (data) {
            $('#room_info').empty();
            var head = $('<tr></tr>');
            head.append($('<td>房间号</td>'));
            head.append($('<td>黑棋</td>'));
            head.append($('<td>白棋</td>'));
            head.append($('<td>状态</td>'));
            $('#room_info').append(head);
            console.log(data);

            for (var info of data) {
                var info_item = $('<tr></tr>');
                var id = $('<td></td>');
                id.html(info.room_id);
                var black = $('<td></td>');
                black.html(info.room_info.black);
                var white = $('<td></td>');
                white.html(info.room_info.white);
                var state = $('<td></td>');
                var state_label = $('<a></a>');
                state_label.attr('id', 'room' + info.room_id);
                if (info.room_info.black != '' && info.room_info.white != '') {
                    state_label.attr('href', 'javascript:void(0);');
                    state_label.addClass('room_full');
                    state_label.html('房间已满');
                } else {
                    state_label.attr('href', 'javascript:void(0);');
                    state_label.html('加入');
                    state_label.click(function () {
                        var href = '/board.html?type=2&status=1&room=' + info.room_id + '&color=';
                        if (info.room_info.black == '') {
                            href += 'black';
                        } else {
                            href += 'white';
                        }
                        $.post('join', { room_id: info.room_id }, function (data) {
                            console.log($(this));
                            if (data == 1) {
                                window.location.href = href;
                            } else if (data == 0) {
                                get_room();
                            } else if (data == 2) {
                                alert('不可加入自己创建的房间');
                            } else if (data == -1) {
                                window.location.href = '/index.html';
                            }
                        })

                    });
                }
                state.append(state_label);
                info_item.append(id, black, white, state);
                $('#room_info').append(info_item);
            }
        })

    }
    $('.join').click(function () {
        get_room();
    })

    $('.back_to_room').click(function () {
        init();
    });
}