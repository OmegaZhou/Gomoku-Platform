'use script';
var mysql = require('mysql');
var jsonfile = require('jsonfile');
var config_file = 'config.json';

exports = module.exports= function () {
    var conn;
    conn=mysql.createConnection(jsonfile.readFileSync(config_file));
    var query=function(sql,para,callback){
        conn.query(sql,para,function(err,data){
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            console.log(data);
            callback(data);
        })
    }
    this.sign_up=function(name,password,callback){
        query('call SIGN_UP(?,?,@state);',[name,password],function(data){
            callback({is_success:data[0][0]['is_success']});
        });
    }
    this.sign_in=function(name,password,callback){
        query('call SIGN_IN(?,?,@state);',[name,password],function(data){
            callback({is_success:data[1][0]['is_success'],user_id:data[0][0]['id']});
        });
    }
}
