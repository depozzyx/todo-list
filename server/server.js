var mongoose = require('mongoose');


var fs = require('fs');
var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require('body-parser');

// var path = require('path');
// var serveStatic = require('serve-static');
// app.use(serveStatic("../"));
// var port = process.env.PORT || 5000;
// var hostname = '127.0.0.1';
//
// app.listen(port, hostname, () => {
//    console.log(`Server running at http://${hostname}:${port}/`);
//  });

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,useUnifiedTopology: true, dbpath: 'E:/'});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('opened!')
});


var articleSchema = new mongoose.Schema({
	name: String,
	desc: String,
	author: String,
	date: Number,
	rates: { type: [], required: true, default: [] },
	rate: Number,
	
}, { strict: false });
var Article = mongoose.model('Article', articleSchema);

var userSchema = new mongoose.Schema({
	login: String, // @depozzyx
	name: String, // Depozzyx Depozzyx
	password: String,
	date: Number,
	rate: Number,
	useragent: String,
});
var User = mongoose.model('User', userSchema);

// ACCOUNT SYSTEM

app.post('/NewUser',function(req, res) {
	let found = 0
	let clog = req.query.login
	console.log('---')

	if (clog.split(" ").join("") === ''){
		res.status(200).send('not ok')
		return
	}

	User.find(function (err, obj) {
		if (err) return console.error(err);

		for (var i = 0; i < obj.length; i++) {
			if (clog == obj[i].login){
				found = 1
				console.log('found')
				break
			}
		}

		if (found == 1){
			console.log('not ok, found')
			res.status(200).send('found')
			return
		}else{
			var userobj = new User({login: req.query.login,
									name: req.query.name,
									password: req.query.password,
									date: new Date(),
									rate: 0,
								 	useragent: req.headers['user-agent']+' '+req.ip });
			console.log(req.headers['user-agent'])
			userobj.save(function (err, obj) {
			    if (err){
					res.status(200).send('not')
					return console.error(err);
				}
			});
			res.status(200).send('ok')
		}
	})

	// console.log(found)


});

app.post('/CompareUser',function(req, res) {
	let clog = req.query.login
	let cpas = req.query.password
	if (clog.split(" ").join("") === ''){
		res.status(200).send('not ok')
		return
	}
	User.find(function (err, obj) {
		if (err) return console.error(err);
		let found = 0

		for (var i = 0; i < obj.length; i++) {
			if (clog === obj[i].login){
				if (cpas === obj[i].password){
					found = 1
					
					obj[i].useragent = req.headers['user-agent']+' '+req.ip
					obj[i].save(function (err, obj) {
						if (err){
							if (err) return console.error(err);
						}
					});
					console.log(obj[i])

					res.status(200).send([obj[i].name,obj[i].date,obj[i].rate,obj[i]._id])
					break
				}else{
					found = 1
					res.status(200).send('found')				
					break
				}
				
			}
		}
		if (found === 0){
			res.status(200).send('not ok')
		}

	})
});

// ARTICLE SYSTEM
app.post('/PostArticle',function(req, res) {
	let clog = req.query.login
	let cusr = '@@@@@@#$%^&*()__)DFGDFGHG67Ff@%^G@^g6&@'
	let caut = ''
	User.find(function (err, obj) {
		if (err) return console.error(err);
		for (var i = 0; i < obj.length; i++) {
			if (clog === obj[i].login){
				cusr = obj[i].useragent
				caut = obj[i].name
				break
			}
		}
		console.log(cusr, req.headers['user-agent']+' '+req.ip)
		if (cusr === req.headers['user-agent']+' '+req.ip){
			var newe = new Article({name: req.query.name,
									desc: req.query.desc,
									author: caut,
									date: new Date(),
									rates: [],
									rate: 0 });
			console.log('newe',newe)
			newe.markModified("rates")
			newe.save(function (err, newe) {
				if (err) return console.error(err);
				console.log(newe)
			});

			res.status(200).send('ok')
		}else{
			res.status(200).send('not ok')
		}
	})



});

app.post('/GetArticle',function(req, res) {
	Article.find(function (err, articles) {
		if (err) return console.error(err);

		// console.log('---',articles);
		let return_array = []
		for (var i = 0; i < articles.length; i++) {
			return_array.push([articles[i].name,articles[i].desc,articles[i].author,articles[i].date,articles[i].rate,articles[i]._id,articles[i].rates])
		}
		// console.log(return_array)
		res.status(200).send(return_array)
	})
});

app.post('/GetArticleById',function(req, res) {
	var id = req.query.id
	Article.find({ '_id': id },'name desc author date rate',function(err,docs){
        if (err)
            console.log('error occured in the database');
        console.log('->-',docs);
		try{
			let return_array = [docs[0].name,docs[0].desc,docs[0].author,docs[0].date,docs[0].rate,docs[0].rates]
			console.log('---',return_array)
			res.status(200).send(return_array)
		}catch{
			res.status(200).send('not ok')
		}
    });
	// Article.find({ '_id': id }).then(ebooks => res.json(ebooks));
	// console.log(query)
	// Article.find(function (err, articles) {
	// 	if (err) return console.error(err);
	//
	// 	// console.log('---',articles);
	// 	let return_array = []
	// 	for (var i = 0; i < articles.length; i++) {
	// 		return_array.push([articles[i].name,articles[i].desc,articles[i].author,articles[i].date,articles[i].rate,articles[i]._id])
	// 	}
	// 	console.log(return_array)
	// 	res.status(200).send(return_array)
	// })
});

app.listen(3001, function() {

    console.log('App running on port 3001');

});
