'use script';
const MIN = -10000000000
function _point(i, j) {
    this.x = i;
    this.y = j;
    this.score = MIN;
}
var dir = new Array();
dir[0] = new _point(0, 1);
dir[1] = new _point(1, 0);
dir[2] = new _point(1, 1);
dir[3] = new _point(1, -1);
dir[4] = new _point(0, -1);
dir[5] = new _point(-1, 0);
dir[6] = new _point(-1, -1);
dir[7] = new _point(1, -1);
const FIVE = 100000000;
const LIVE_FOUR = 1000000;
const DEAD_FOUR = 50000;
const LIVE_THREE = 10000;
const DEAD_THREE = 15;
const LIVE_TWO = 30;
const DEAD_TWO = 5;
function check_go(place, point, color, start, end, dir_p) {
    var x = point.x;
    var y = point.y;
    for (var i = start; i <= end; ++i) {
        var temp_x = x + i * dir_p.x;
        var temp_y = y + i * dir_p.y;
        if (temp_x < 0 || temp_x >= place.length || temp_y < 0 || temp_y >= place.length || place[temp_x][temp_y] != color) {
            return false;;
        }
    }
    return true;
}

function analyse_score(place, point, color) {
    var score = 0;
    var other_color = 3 - color;
    var blank = 0;

    for (var i = 0; i < 4; ++i) {
        //11111
        if (check_go(place, point, color, 0, 4, dir[i])) {
            score += FIVE;
        }

        //011110
        if (check_go(place, point, color, 0, 3, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 4, 4, dir[i])) {
            score += LIVE_FOUR;
        }

        //11011
        if (check_go(place, point, color, 0, 1, dir[i]) && check_go(place, point, color, 3, 4, dir[i])
            && check_go(place, point, blank, 2, 2, dir[i])) {
            //console.log("*1011");
            score += DEAD_FOUR;
        }

        //01110
        if (check_go(place, point, color, 0, 2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])) {
            score += LIVE_THREE;
        }

        //10101
        if (check_go(place, point, color, 2, 2, dir[i]) && check_go(place, point, color, 4, 4, dir[i])
            && check_go(place, point, color, 0, 0, dir[i])
            && check_go(place, point, blank, 1, 1, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])) {
            score += DEAD_THREE;
        }

        //2011102
        if (check_go(place, point, color, 0, 2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])
            && check_go(place, point, other_color, -2, -2, dir[i]) && check_go(place, point, other_color, 4, 4, dir[i])) {
            score += DEAD_THREE;
        }

        //001100
        if (check_go(place, point, color, 0, 1, dir[i])
            && check_go(place, point, blank, -2, -1, dir[i]) && check_go(place, point, blank, 2, 3, dir[i])) {
            score += LIVE_TWO;
        }

        //001010
        if (check_go(place, point, color, 2, 2, dir[i]) && check_go(place, point, color, 0, 0, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])
            && check_go(place, point, blank, 3, 3, dir[i])
            && (check_go(place, point, blank, -2, -2, dir[i]) || check_go(place, point, blank, 4, 4, dir[i]))) {
            score += LIVE_TWO;
        }
        //010010
        if (check_go(place, point, color, 3, 3, dir[i]) && check_go(place, point, color, 0, 0, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 1, 2, dir[i])
            && check_go(place, point, blank, 4, 4, dir[i])) {
            score += LIVE_TWO;
        }

        //10001
        if (check_go(place, point, color, 4, 4, dir[i]) && check_go(place, point, color, 0, 0, dir[i])
            && check_go(place, point, blank, 1, 3, dir[i])) {
            score += DEAD_TWO;
        }
    }
    for (var i = 0; i < 8; ++i) {
        //10111
        if (check_go(place, point, color, 2, 4, dir[i]) && check_go(place, point, color, 0, 0, dir[i])
            && check_go(place, point, blank, 1, 1, dir[i])) {
            //console.log("*0111");
            score += DEAD_FOUR;
        }


        //211110
        if (check_go(place, point, color, 0, 3, dir[i])
            && check_go(place, point, other_color, -1, -1, dir[i]) && check_go(place, point, blank, 4, 4, dir[i])) {
            score += DEAD_FOUR;
        }

        
        //011010
        if (check_go(place, point, color, 0, 1, dir[i]) && check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 2, 2, dir[i])
            && check_go(place, point, blank, 4, 4, dir[i])) {
            score += LIVE_THREE;
        }



        //21110
        if (check_go(place, point, color, 0, 2, dir[i])
            && check_go(place, point, other_color, -1, -1, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])) {
            score += DEAD_THREE;
        }

        //211010
        if (check_go(place, point, color, 0, 1, dir[i]) && check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, other_color, -1, -1, dir[i]) && check_go(place, point, blank, 2, 2, dir[i])
            && check_go(place, point, blank, 4, 4, dir[i])) {
            score += DEAD_THREE;
        }

        //011012
        if (check_go(place, point, color, 0, 1, dir[i]) && check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 2, 2, dir[i])
            && check_go(place, point, other_color, 4, 4, dir[i])) {
            score += DEAD_THREE;
        }

        //11001
        if (check_go(place, point, color, 0, 1, dir[i]) && check_go(place, point, color, 4, 4, dir[i])
            && check_go(place, point, blank, 2, 3, dir[i])) {
            score += DEAD_THREE;
        }

        //000112
        if (check_go(place, point, color, 0, 1, dir[i])
            && check_go(place, point, other_color, 2, 2, dir[i]) && check_go(place, point, blank, -3, -1, dir[i])) {
            score += DEAD_TWO;
        }
        //001012
        if (check_go(place, point, color, 2, 2, dir[i]) && check_go(place, point, color, 0, 0, dir[i])
            && check_go(place, point, other_color, 3, 3, dir[i])
            && check_go(place, point, blank, -2, -1, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])) {
            score += DEAD_TWO;
        }

        //010012
        if (check_go(place, point, color, -3, -3, dir[i]) && check_go(place, point, color, 0, 0, dir[i])
            && check_go(place, point, other_color, 1, 1, dir[i])
            && check_go(place, point, blank, -2, -1, dir[i]) && check_go(place, point, blank, -4, -4, dir[i])) {
            score += DEAD_TWO;
        }


    }
    //score += place.length - Math.abs(point.x - Math.floor(place.length / 2)) - Math.abs(point.y - Math.floor(place.length / 2));
    return score;
}

function analyse_place(place, color) {
    var score = MIN;
    for (var i = 0; i < place.length; ++i) {
        for (var j = 0; j < place.length; ++j) {
            if (place[i][j] == color) {
                var temp = analyse_score(place, new _point(i, j), color);
                if (temp > score) {
                    score = temp;
                }
            }
        }
    }
    return score;
}

function analyse(place, color, point) {
    var score = 0;
    var tmp_place = place[point.x][point.y];
    place[point.x][point.y] = color;
    score += analyse_place(place, color);
    //place[point.x][point.y] = 3-color;
    score -= analyse_place(place, 3 - color);
    place[point.x][point.y] = 3 - color;
    //score += analyse_place(place, 3-color);
    place[point.x][point.y] = tmp_place;
    return score;
}

function sort_analyse(place, point) {
    var score = 0;
    var tmp_place = place[point.x][point.y];
    place[point.x][point.y] = 1;
    score += analyse_place(place, 1)/2;
    place[point.x][point.y] = 2;
    score += analyse_place(place, 2);
    //score += analyse_place(place, 3-color);
    place[point.x][point.y] = tmp_place;
    return score;
}

function get_step(place) {
    var count = 0;
    for (var i = 0; i < place.length; ++i) {
        for (j = 0; j < place.length; ++j) {
            if (place[i][j] != 0) {
                ++count;
            }
        }
    }
    return count;
}

function check_set_location(place, point) {
    for (var i = 0; i < 8; ++i) {
        temp_x = point.x + dir[i].x * 2;
        temp_y = point.y + dir[i].y * 2;
        if (temp_x < 0 || temp_x >= place.length || temp_y < 0 || temp_y >= place.length) {
            continue;
        }
        if (!check_go(place, point, 0, 1, 2, dir[i])) {
            return true;
        }
    }
    return false;
}

function analyse_location(point, place) {
    var score = place.length - Math.abs(point.x - Math.floor(place.length / 2)) - Math.abs(point.y - Math.floor(place.length / 2));
    return score;
}

function get_point_by_location(place) {
    var point = new _point(0, 0);
    var len = place.length;
    for (var i = 0; i < len; ++i) {
        for (var j = 0; j < len; ++j) {
            if (place[i][j] == 0) {
                var temp = analyse_location(new _point(i, j), place);
                //console.log({i:i,j:j,score:temp});
                if (temp > point.score) {
                    point.x = i;
                    point.y = j;
                    point.score = temp;
                }
            }

        }
    }
    return point;
}

function get_point_by_score(place, color) {
    var point = new _point(0, 0);
    for (var i = 0; i < place.length; ++i) {
        for (var j = 0; j < place.length; ++j) {
            if (place[i][j] == 0 && check_set_location(place, new _point(i, j))) {
                var temp = analyse(place, color, new _point(i, j));
                if (temp > point.score) {
                    point.x = i;
                    point.y = j;
                    point.score = temp;
                }
            }
        }
    }
    return point;
}

function alpha_beta(place, depth, alpha, beta, color) {
    var comp = function (p1, p2) {
        return p2.score - p1.score;
    }
    var point = new _point(0, 0);
    var step = get_step(place);
    if (step <= 1) {
        point = get_point_by_location(place);
        return point;
    }
    if (depth == 0) {
        return get_point_by_score(place, color);
    }
    var point_arr = new Array();
    for (var i = 0; i < place.length; ++i) {
        for (var j = 0; j < place.length; ++j) {
            if (place[i][j] == 0 && check_set_location(place, new _point(i, j))) {
                var temp = new _point(i, j);
                temp.score = sort_analyse(place, temp);
                point_arr[point_arr.length] = temp;
            }
        }
    }
    point_arr.sort(comp);
    var max_score = point_arr[0].score;
    for (var k = 0; k < point_arr.length; ++k) {
        var i = point_arr[k].x;
        var j = point_arr[k].y;
        if (point_arr[k].score >= FIVE) {
            point.score = temp.score;
            point.x = i;
            point.y = j;
            break;
        }
        if (max_score >= point_arr[k].score * 500) {
            break;
        }
        place[i][j] = color;
        var temp = alpha_beta(place, depth - 1, -beta, -alpha, 3 - color);
        temp.score *= -1;
        place[i][j] = 0;
        if (temp.score > point.score) {
            //console.log({ step: step, i: i, j: j, score: temp.score });
            point.score = temp.score;
            point.x = i;
            point.y = j;
        }
        alpha = Math.max(alpha, point.score);
        if (temp.score >= beta) {
            return temp;
        }
    }
    return point;
}

function next_step(place, color_str) {
    var point = new _point();
    var my_color;
    var human_color;
    if (color_str == 'black') {
        human_color = 1;
    } else {
        human_color = 2;
    }
    my_color = 3 - human_color;
    point = alpha_beta(place, 2, MIN / 10, -MIN / 10, my_color);
    return { r: point.x, c: point.y };
}
exports.next_step = next_step;


