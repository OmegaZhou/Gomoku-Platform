const LOCAL = 0;
const AI = 1;
const HUMAN = 2;
function Game() {
    var board = new Board();
    var init = function () {
        $('#win_message').hide();
        board.clear();
        board.init();
    }
    this.start_local_game = function () {
        init();
        $('#black_name').html('Local User 1');
        $('#white_name').html('Local User 2');
        var call_back = function (r, c, color) {
            board.set_go(r, c, color);
            board.end_wait();
            var r = board.judge_result();
            if (r != 0) {
                win(r)
                return;
            }
            if (color == 'black') {
                board.wait_set('white', call_back);
            } else {
                board.wait_set('black', call_back);
            }
        }
        board.wait_set('black', call_back);
    }
    this.start_with_ai = function (human_color) {
        init();
        var other_color;
        if (human_color == 'black') {
            other_color = 'white';
        } else {
            other_color = 'black';
        }

        $.post('get_name',function(data){
            if(data.success){
                $('#'+human_color+'_name').html(data.name);
                $('#'+other_color+'_name').html('AI');
            }else{
                window.location.href='/index.html'
            }
            
        });

        var get_place = function () {
            $.post('get_place', { user_id: 0, place: board.get_board(),color:human_color }, function (data) {
                other_place(data.r, data.c, 0);
            })
        }
        var other_place = function (r, c, state) {

            board.set_go(r, c, other_color);
            var re = board.judge_result();
            if (re != 0) {
                win(re);
                return;
            }
            board.wait_set(human_color, my_place);
        }
        var my_place = function (r, c, color) {
            board.set_go(r, c, color);
            board.end_wait();
            var re = board.judge_result();
            if (re != 0) {
                win(re);
                return;
            }
            get_place();
        }
        if (human_color == 'white') {
            get_place();
        } else {
            board.wait_set(human_color, my_place);
        }
    }

    this.start_net_game = function (color, status) {
        $('#back_button').hide();
        const CREATE = 0;
        const JOIN = 1;
        var other_color;
        if (color == 'white') {
            other_color = 'black';
        } else {
            other_color = 'white';
        }

        const address = window.location.hostname + ':51659';
        var socket = io.connect(address);
        var room_id = get_url_para('room');
        var end_wait = function () {
            init();
            socket.on('other_turn', function (data) {
                if (data.state == -1) {
                    disconnect();
                    return;
                }
                board.set_go(data.r, data.c, other_color);
                var re = board.judge_result();
                if (re != 0) {
                    win(re);
                    return;
                }
                board.wait_set(color, function (r, c, color) {
                    board.set_go(r, c, color);
                    board.end_wait();
                    socket.emit('set_go', { room_id: room_id, color: color, r: r, c: c });
                    var re = board.judge_result();
                    if (re != 0) {
                        win(re);
                        return;
                    }
                });
            });

            if (color == 'black') {
                board.wait_set(color, function (r, c, color) {
                    board.set_go(r, c, color);
                    board.end_wait();
                    socket.emit('set_go', { room_id: room_id, color: color, r: r, c: c });
                    var re = board.judge_result();
                    if (re != 0) {
                        win(re);
                        return;
                    }
                });
            }
        }


        socket.emit('room_info', { room_id: room_id, color: color });

        if (status == CREATE) {
            $('#message').html('等待对手');
            $('#win_message').show();
            
        } else {
            $('#message').html('正在加入');
        }

        socket.on('ok', function (data) {
            end_wait();
            $('#back_button').show();
            $('#black_name').html(data.black);
            $('#white_name').html(data.white);
        })
        socket.on('end',function(data){
            init();
            disconnect();
        });
        socket.on('no_room',function(data){
            show_message('房间不存在');
        });
    }

    function show_message(str){
        $('#message').html(str);
        $('#win_message').show();
        $('#back_button').hide();
    }
    function disconnect() {
        show_message('对手掉线');
    }



    function win(state) {
        if (state == 1) {
            show_message('黑棋胜利');
        } else if (state == 2) {
            show_message('白棋胜利');
        } else if(state==-1){
            show_message('平局')
        }else{
            return;
        }
    }
}