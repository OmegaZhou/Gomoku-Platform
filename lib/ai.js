'use script';

function _point(i, j) {
    this.x = i;
    this.y = j;
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
    const FIVE = 10000000;
    const LIVE_FOUR = 100000;
    const DEAD_FOUR = 5000;
    const LIVE_THREE = 1000;
    const DEAD_THREE = 200;
    const LIVE_TWO = 400;
    const DEAD_TWO = 50;
    for (var i = 0; i < 8; ++i) {
        //*1111
        if (check_go(place, point, color, 1, 4, dir[i])) {
            score += FIVE;
        }
        //1*111
        if (check_go(place, point, color, -1, -1, dir[i]) && check_go(place, point, color, 1, 3, dir[i])) {
            score += FIVE;
        }
        //11*11
        if (check_go(place, point, color, -2, -1, dir[i]) && check_go(place, point, color, 1, 2, dir[i])) {
            score += FIVE;
        }

        //0*1110
        if (check_go(place, point, color, 1, 3, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 4, 4, dir[i])) {
            score += LIVE_FOUR;
        }
        //01*110
        if (check_go(place, point, color, 1, 2, dir[i]) && check_go(place, point, color, -1, -1, dir[i])
            && check_go(place, point, blank, -2, -2, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])) {
            score += LIVE_FOUR;
        }


        //*1011
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, 3, 4, dir[i])
            && check_go(place, point, color, 2, 2, dir[i])) {
            //console.log("*1011");
            score += DEAD_FOUR;
        }
        //1*011
        if (check_go(place, point, color, -1, -1, dir[i]) && check_go(place, point, color, 2, 3, dir[i])
            && check_go(place, point, color, 1, 1, dir[i])) {
            //console.log("1*011");
            score += DEAD_FOUR;
        }
        //*0111
        if (check_go(place, point, color, 2, 4, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])) {
            //console.log("*0111");
            score += DEAD_FOUR;
        }
        //10*11
        if (check_go(place, point, color, 1, 2, dir[i]) && check_go(place, point, color, -2, -2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i])) {
            //console.log("10*11");
            score += DEAD_FOUR;
        }
        //101*1
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, -1, -1, dir[i])
            && check_go(place, point, color, -3, -3, dir[i]) && check_go(place, point, blank, -2, -2, dir[i])) {
            //console.log("101*1");
            score += DEAD_FOUR;
        }
        //1011*
        if (check_go(place, point, color, -2, -1, dir[i]) && check_go(place, point, color, -4, -4, dir[i])
            && check_go(place, point, blank, -3, -3, dir[i])) {
            //console.log("1011*");
            score += DEAD_FOUR;
        }
        //2*1110
        if (check_go(place, point, color, 1, 3, dir[i])
            && check_go(place, point, other_color, -2, -2, dir[i]) && check_go(place, point, blank, 4, 4, dir[i])) {
            score += DEAD_FOUR;
        }
        //21*110
        if (check_go(place, point, color, 1, 2, dir[i]) && check_go(place, point, color, -1, -1, dir[i])
            && check_go(place, point, other_color, -2, -2, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])) {
            score += DEAD_FOUR;
        }
        //211*10
        if (check_go(place, point, color, -2, -1, dir[i]) && check_go(place, point, color, 1, 1, dir[i])
            && check_go(place, point, blank, -3, -3, dir[i]) && check_go(place, point, other_color, 2, 2, dir[i])) {
            score += DEAD_FOUR;
        }
        //2111*0
        if (check_go(place, point, color, -3, -1, dir[i])
            && check_go(place, point, blank, 1, 1, dir[i]) && check_go(place, point, other_color, -4, -4, dir[i])) {
            score += DEAD_FOUR;
        }



        //0*1100
        if (check_go(place, point, color, 1, 2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 3, 4, dir[i])) {
            score += LIVE_THREE;
        }
        //01*100
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, -1, -1, dir[i])
            && check_go(place, point, blank, 2, 3, dir[i]) && check_go(place, point, blank, -2, -2, dir[i])) {
            score += LIVE_THREE;
        }
        //011*00
        if (check_go(place, point, color, -2, -1, dir[i])
            && check_go(place, point, blank, 1, 2, dir[i]) && check_go(place, point, blank, -3, -3, dir[i])) {
            score += LIVE_THREE;
        }
        //0*1010
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 2, 2, dir[i])
            && check_go(place, point, blank, 4, 4, dir[i])) {
            score += LIVE_THREE;
        }
        //01*010
        if (check_go(place, point, color, -1, -1, dir[i]) && check_go(place, point, color, 2, 2, dir[i])
            && check_go(place, point, blank, -2, -2, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])
            && check_go(place, point, blank, 3, 3, dir[i])) {
            score += LIVE_THREE;
        }
        //0110*0
        if (check_go(place, point, color, -3, -2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, -4, -4, dir[i])
            && check_go(place, point, blank, 1, 1, dir[i])) {
            score += LIVE_THREE;
        }


        //2*1100
        if (check_go(place, point, color, 1, 2, dir[i])
            && check_go(place, point, other_color, -1, -1, dir[i]) && check_go(place, point, blank, 3, 4, dir[i])) {
            score += DEAD_THREE;
        }
        //21*100
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, -1, -1, dir[i])
            && check_go(place, point, blank, 2, 3, dir[i]) && check_go(place, point, other_color, -2, -2, dir[i])) {
            score += DEAD_THREE;
        }
        //211*00
        if (check_go(place, point, color, -2, -1, dir[i])
            && check_go(place, point, blank, 1, 2, dir[i]) && check_go(place, point, other_color, -3, -3, dir[i])) {
            score += DEAD_THREE;
        }
        //2*1010
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, other_color, -1, -1, dir[i]) && check_go(place, point, blank, 2, 2, dir[i])
            && check_go(place, point, blank, 4, 4, dir[i])) {
            score += DEAD_THREE;
        }
        //21*010
        if (check_go(place, point, color, -1, -1, dir[i]) && check_go(place, point, color, 2, 2, dir[i])
            && check_go(place, point, other_color, -2, -2, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])
            && check_go(place, point, blank, 3, 3, dir[i])) {
            score += DEAD_THREE;
        }
        //2110*0
        if (check_go(place, point, color, -3, -2, dir[i])
            && check_go(place, point, other_color, -1, -1, dir[i]) && check_go(place, point, blank, -4, -4, dir[i])
            && check_go(place, point, blank, 1, 1, dir[i])) {
            score += DEAD_THREE;
        }
        //0*1012
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 2, 2, dir[i])
            && check_go(place, point, other_color, 4, 4, dir[i])) {
            score += DEAD_THREE;
        }
        //01*012
        if (check_go(place, point, color, -1, -1, dir[i]) && check_go(place, point, color, 2, 2, dir[i])
            && check_go(place, point, blank, -2, -2, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])
            && check_go(place, point, other_color, 3, 3, dir[i])) {
            score += DEAD_THREE;
        }
        //0110*2
        if (check_go(place, point, color, -3, -2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, -4, -4, dir[i])
            && check_go(place, point, other_color, 1, 1, dir[i])) {
            score += DEAD_THREE;
        }
        //*1001
        if (check_go(place, point, color, 1, 1, dir[i]) && check_go(place, point, color, 4, 4, dir[i])
            && check_go(place, point, blank, 2, 3, dir[i])) {
            score += DEAD_THREE;
        }
        //1*001
        if (check_go(place, point, color, -1, -1, dir[i]) && check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, blank, 1, 2, dir[i])) {
            score += DEAD_THREE;
        }
        //1100*
        if (check_go(place, point, color, -4, -3, dir[i])
            && check_go(place, point, blank, -2, -1, dir[i])) {
            score += DEAD_THREE;
        }
        //*0101
        if (check_go(place, point, color, 2, 2, dir[i]) && check_go(place, point, color, 4, 4, dir[i])
            && check_go(place, point, blank, 1, 1, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])) {
            score += DEAD_THREE;
        }
        //10*01
        if (check_go(place, point, color, -2, -2, dir[i]) && check_go(place, point, color, 2, 2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])) {
            score += DEAD_THREE;
        }
        //20*1102
        if (check_go(place, point, color, 1, 2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 3, 3, dir[i])
            && check_go(place, point, other_color, -2, -2, dir[i]) && check_go(place, point, other_color, 4, 4, dir[i])) {
            score += DEAD_THREE;
        }
        //201*102
        if (check_go(place, point, color, -1, -1, dir[i]) && check_go(place, point, color, 1, 1, dir[i])
            && check_go(place, point, blank, -2, -2, dir[i]) && check_go(place, point, blank, 2, 2, dir[i])
            && check_go(place, point, other_color, -3, -3, dir[i]) && check_go(place, point, other_color, 3, 3, dir[i])) {
            score += DEAD_THREE;
        }

        //00*100
        if (check_go(place, point, color, 1, 1, dir[i])
            && check_go(place, point, blank, -2, -1, dir[i]) && check_go(place, point, blank, 2, 3, dir[i])) {
            score += LIVE_TWO;
        }
        //00*010
        if (check_go(place, point, color, 2, 2, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])
            && check_go(place, point, blank, 3, 3, dir[i])
            && (check_go(place, point, blank, -2, -2, dir[i]) || check_go(place, point, blank, 3, 3, dir[i]))) {
            score += LIVE_TWO;
        }
        //0*0010
        if (check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 1, 2, dir[i])
            && check_go(place, point, blank, 4, 4, dir[i])) {
            score += LIVE_TWO;
        }

        //0001*2
        if (check_go(place, point, color, -1, -1, dir[i])
            && check_go(place, point, other_color, 1, 1, dir[i]) && check_go(place, point, blank, -4, -2, dir[i])) {
            score += DEAD_TWO;
        }
        //000*12
        if (check_go(place, point, color, 1, 1, dir[i])
            && check_go(place, point, other_color, 2, 2, dir[i]) && check_go(place, point, blank, -3, -1, dir[i])) {
            score += DEAD_TWO;
        }
        //0010*2
        if (check_go(place, point, color, -2, -2, dir[i])
            && check_go(place, point, other_color, 1, 1, dir[i])
            && check_go(place, point, blank, -4, -3, dir[i]) && check_go(place, point, blank, -1, -1, dir[i])) {
            score += DEAD_TWO;
        }
        //00*012
        if (check_go(place, point, color, 2, 2, dir[i])
            && check_go(place, point, other_color, 3, 3, dir[i])
            && check_go(place, point, blank, -2, -1, dir[i]) && check_go(place, point, blank, 1, 1, dir[i])) {
            score += DEAD_TWO;
        }
        //0100*2
        if (check_go(place, point, color, -3, -3, dir[i])
            && check_go(place, point, other_color, 1, 1, dir[i])
            && check_go(place, point, blank, -2, -1, dir[i]) && check_go(place, point, blank, -4, -4, dir[i])) {
            score += DEAD_TWO;
        }
        //0*0012
        if (check_go(place, point, color, 3, 3, dir[i])
            && check_go(place, point, other_color, 4, 4, dir[i])
            && check_go(place, point, blank, -1, -1, dir[i]) && check_go(place, point, blank, 1, 2, dir[i])) {
            score += DEAD_TWO;
        }
        //*0001
        if (check_go(place, point, color, 4, 4, dir[i]) && check_go(place, point, blank, 1, 3, dir[i])) {
            score += DEAD_TWO;
        }
    }
    score += place.length - Math.abs(point.x - Math.floor(place.length / 2)) - Math.abs(point.y - Math.floor(place.length / 2));
    return score;
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
    var score=-1000000000
    for (var i = 0; i < place.length; ++i) {
        for (var j = 0; j < place.length; ++j) {
            if (place[i][j] == 0) {
                var temp = analyse_score(place, new _point(i, j), my_color) / 2;
                //console.log({ I: i, J: j });
                //console.log(temp);
                temp += analyse_score(place, new _point(i, j), 3 - my_color);
                //console.log(temp);
                if (temp > score) {
                    point.x = i;
                    point.y = j;
                    score = temp;
                }
            }
        }
    }
    return { r: point.x, c: point.y };
}
exports.next_step = next_step;


