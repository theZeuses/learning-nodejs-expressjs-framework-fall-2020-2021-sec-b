const db = require('./db-secure');

module.exports = {

    getById: function(id,callback){
		var sql="SELECT * FROM `orders` WHERE orderid=?";
		db.getResults(sql,[id], function (result){
			callback(result);
		});

	},
    getAll: function(callback){
		var sql = "select * from orders";
		db.getResults(sql, null, function(results){
			callback(results);
		});
    },
    insert: function(order, callback){
		var sql="insert into `orders`(customerid, quantity, total, payment, city, date) values(?,?,?,?,?,?)";
		//console.log(sql);
		db.execute(sql, [ order.userid, order.quantity, order.total, order.payment, order.city, order.date], function(status){
			callback(status);
		});
    },
    delete: function(id, callback){
		var sql="DELETE FROM `orders` WHERE orderid=?";
		//console.log(sql);
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
};