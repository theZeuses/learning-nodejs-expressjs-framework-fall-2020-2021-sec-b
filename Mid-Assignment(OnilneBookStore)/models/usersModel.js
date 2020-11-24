const db = require('./db-secure');

module.exports = {

    getById: function(id,callback){
		var sql="SELECT * FROM `users` WHERE userid=?";
		db.getResults(sql,[id], function (result){
			callback(result);
		});

	},
	findOne: function(id, callback){
		var sql="SELECT * FROM `users` WHERE userid=?";
		db.getResults(sql,[id], function (result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});

    },
    getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, null, function(results){
			callback(results);
		});
    },
    insert: function(user, callback){
		var sql="insert into `users` values(?,?,?,?,?,?,?)";
		//console.log(sql);
		db.execute(sql, [ user.username, user.fullname, user.email, user.mobileno, user.bio, user.picture, user.type], function(status){
			callback(status);
		});
    },
    update: function(user, callback){
		var sql="UPDATE `users` set fullname=? , email=?, mobileno=?, bio=?, picture=? WHERE userid=?";
		//console.log(sql);
		db.execute(sql, [ user.fullname, user.email, user.mobileno, user.bio, user.picture, user.username], function(status){
			callback(status);
		});
    },
    delete: function(id, callback){
		var sql="DELETE FROM `users` WHERE userid=?";
		//console.log(sql);
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	getByNamePattern: function(pattern, callback){
		var sql = "select * from users where fullname like '%"+pattern+"%'";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
};