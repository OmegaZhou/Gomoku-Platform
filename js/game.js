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
        var get_place = function () {
            $.post('get_place', { user_id: 0, place: board.get_board() }, function (data) {
                other_place(data.r, data.c, 0);
            })
        }
        var other_place = function (r, c, state) {
            var other_color;
            if (human_color == 'black') {
                other_color = 'white';
            } else {
                other_color = 'black';
            }
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

    function win(state) {
        if (state == 1) {
            $('#message').html('Black win');
        } else if (state == 2) {
            $('#message').html('White win');
        }else{
            return;
        }
        $('#win_message').show();
    }
}