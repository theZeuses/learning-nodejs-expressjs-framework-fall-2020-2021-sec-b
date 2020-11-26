const db = require('./db-secure');

module.exports = {

    validate: function(user, callback){
		var sql = "select * from login where userid=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){
			if(results.length > 0){
				callback(results,true);
			}else{
				callback(results,false);
			}
		});
	},
	insert: function(user, callback){
		var sql="insert into `login` values(?,?,?)";
		//console.log(sql);
		db.execute(sql, [ user.username, user.password, user.type], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql="DELETE FROM `login` WHERE userid=?";
		//console.log(sql);
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	getPass: function(username, callback){
		var sql = "select * from login where userid=?";
		//console.log(sql);
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(result, true);
			}else{
				callback(result, false);
			}
		});
	},
	updatePass: function(user, callback){
		var sql = "UPDATE `login` SET password = ? where userid=?";
		console.log(sql);
		db.execute(sql,[user.password, user.username], function(results){
			if(results.length > 0){
				callback(results,true);
			}else{
				callback(results,false);
			}
		});
	},
}