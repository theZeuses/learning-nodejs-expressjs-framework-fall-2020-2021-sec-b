const db = require('./db-secure');

module.exports = {
    insert: function(book, callback){
		var sql="insert into books(name, author, price, quantity, category, details, picture) values(?,?,?,?,?,?,?)";
		//console.log(sql);
		db.execute(sql, [ book.name, book.author, book.price, book.quantity, book.category, book.details, book.picture ], function(status){
			callback(status);
		});
	},
	update: function(book, callback){
		var sql="update books set name=?, author=?, price=?, quantity=?, category=?, details=?, picture=? where bookid=?";
		//console.log(sql);
		db.execute(sql, [ book.name, book.author, book.price, book.quantity, book.category, book.details, book.picture, book.bookid ], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		var sql="DELETE FROM `books` WHERE bookid=?";
		//console.log(sql);
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	getAllAvailable: function(callback){
		var sql = "select * from books where quantity > 0";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}, 
	getAll: function(callback){
		var sql = "select * from books";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}, 
	getByCategory: function(category, callback){
		var sql = "select * from books where category=? and quantity > 0";
		db.getResults(sql, [category], function(results){
			callback(results);
		});
	},
	getById: function(id, callback){
		var sql = "select * from books where bookid=?";
		db.getResults(sql, [id], function(results){
			callback(results);
		});
	}
};