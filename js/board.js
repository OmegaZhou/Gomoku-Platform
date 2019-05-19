function Board() {
    var size = Math.min($(window).height(), $(window).width()) / 5 * 4;
    var go_num = 15;
    var go_mask = new Array();
    this.is_wait = false;
    this.callback;

    get_go_id = function (r, c) {
        return '#go' + r + '_' + c;
    }
    this.end_wait = function () {
        this.is_wait = false;
        for (var i = 0; i < go_num; ++i) {
            for (var j = 0; j < go_num; ++j) {
                var item = get_go_id(i, j);
                if (go_mask[i][j] == 0) {
                    $(item).removeClass('black white');
                }
                $(item).removeClass('wait_go');
                $(item).unbind('click');
            }
        }
    }
    this.wait_set = function (color, callback = this.set_go) {
        this.is_wait = true;
        var func = this.end_wait;
        for (var i = 0; i < go_num; ++i) {
            for (var j = 0; j < go_num; ++j) {
                var item = get_go_id(i, j);
                if (go_mask[i][j] == 0) {
                    $(item).addClass('wait_go ' + color);
                    $(item).click({ 'r': i, 'c': j, 'color': color }, function (event) {
                        if (go_mask[event.data.r][event.data.c] == 0) {
                            callback(event.data.r, event.data.c, event.data.color);
                        }
                    })
                }
            }
        }
    }


    this.set_go = function (r, c, color) {
        if (go_mask[r][c] != 0) {
            alert('false');
        } else {

            var go_id = get_go_id(r, c);
            $(go_id).removeClass('unset');
            $(go_id).removeClass('black');
            $(go_id).removeClass('white');
            $(go_id).addClass('set ' + color);
            if (color == 'black') {
                go_mask[r][c] = 1;
            } else {
                go_mask[r][c] = 2;
            }
        }
    }

    this.clear = function () {
        $('#game_bg').empty();
        go_mask = new Array();
    }

    //Black win return 1,White win return 2,else return 0
    this.judge_result = function () {
        for (var i = 0; i < go_num; ++i) {
            for (var j = 0; j < go_num; ++j) {
                if (go_mask[i][j] != 0) {
                    var color = go_mask[i][j];
                    if (i + 4 < go_num) {
                        var flag = 1;
                        for (var k = 0; k < 5; ++k) {
                            if (go_mask[i + k][j] != color) {
                                flag = 0;
                                break;
                            }
                        }
                        if (flag == 1) {
                            return color;
                        }
                    }



                    if (j + 4 < go_num) {
                        var flag = 1;
                        for (var k = 0; k < 5; ++k) {
                            if (go_mask[i][j + k] != color) {
                                flag = 0;
                                break;
                            }
                        }
                        if (flag == 1) {
                            return color;
                        }
                    }

                    if (i + 4 < go_num && j - 4 >= 0) {
                        var flag = 1;
                        for (var k = 0; k < 5; ++k) {
                            if (go_mask[i + k][j - k] != color) {
                                flag = 0;
                                break;
                            }
                        }
                        if (flag == 1) {
                            return color;
                        }
                    }

                    if (i + 4 < go_num && j + 4 < go_num) {
                        var flag = 1;
                        for (var k = 0; k < 5; ++k) {
                            if (go_mask[i + k][j + k] != color) {
                                flag = 0;
                                break;
                            }
                        }
                        if (flag == 1) {
                            return color;
                        }
                    }
                }
            }
        }
        return 0;
    }
    this.get_board = function () {
        return go_mask;
    }
    this.init = function () {

        $('#game_bg').width(size);
        $('#game_bg').height(size);
        for (var i = 0; i < go_num; ++i) {
            var temp = new Array();
            for (var j = 0; j < go_num; ++j) {
                temp[j] = 0;
            }
            go_mask.push(temp);
        }

        var board = $('<div></div>');
        board.attr('class', 'board');
        for (var i = 0; i < go_num; ++i) {
            var board_row = $('<div></div>');
            board_row.addClass('board_row');
            for (var j = 0; j < go_num; ++j) {
                var board_go = $('<div></div>');
                board_go.addClass('item unset');
                board_go.attr('id', 'go' + i + '_' + j);
                board_row.append(board_go);
            }
            board.append(board_row);
        }

        var board_line = $('<div></div>');
        board_line.addClass('board board_line')
        for (var i = 0; i < go_num - 1; ++i) {
            var board_row = $('<div></div>');
            board_row.addClass('board_row');
            for (var j = 0; j < go_num - 1; ++j) {
                var board_go = $('<div></div>');
                board_go.addClass('item right_border top_border');
                if (i == go_num - 2) {
                    board_go.addClass('bottom_border');
                }
                if (j == 0) {
                    board_go.addClass('left_border');
                }
                board_row.append(board_go);
            }
            board_line.append(board_row);
        }

        $('#game_bg').append(board_line, board);
    }
}