'use script';
function next_step(place,color){
    for(var i=0;i<place.length;++i){
        for(var j=0;j<place[i].length;++j){
            if(place[i][j]==0){
                return {'r':i,'c':j};
            }
        }
    }
}
exports.next_step=next_step;