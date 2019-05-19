const LOCAL = 0;
const AI = 1;
const HUMAN = 2;
function Game() {
    var board = new Board();
    this.start_local_game = function () {
        board.clear();
        board.init();
        var call_back = function (r, c, color) {
            board.set_go(r, c, color);
            board.end_wait();
            var r = board.judge_result();
            if (r != 0) {
                win(r)
                board.clear();
                board.init();
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
        board.clear();
        board.init();
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
                win(r);
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
            alert('Black win');
        } else {
            alert('White win');
        }
    }
}