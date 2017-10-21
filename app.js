var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use(express.static(__dirname + 'public'));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');




var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017/registration';

app.get('/register',function(req,res) {
    res.render('RegistrationForm.html');
});

/*


app.get('/RandomCheck',function(req,res){
    res.status(200).send({"status":1});
});
*/
	

//register URL
app.post('/register', function (req, res) {
	if(req.body == null ){
		res.end("error");
	}
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	var securityQuestionOne = req.body.securityOne;
	var securityQuestionOneAnswer = req.body.answerOne;
	var securityQuestionTwo = req.body.securityTwo;
	var securityQuestionTwoAnswer = req.body.answerTwo;
  	var mobile = req.body.mobile;
  	var address = req.body.address;
  	var interest = req.body.interest; 

  	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
		if (err) {
		    console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
		    console.log('Connection established to', url);
			var collection = db.collection('users');
			var user = {username: username, password: password, email: email, mobile: mobile, address: address, interest: interest, securityQuestionOne: securityQuestionOne, answerOne: securityQuestionOneAnswer, securityQuestionTwo: securityQuestionTwo, answerTwo: securityQuestionTwoAnswer};
		    
		    // Insert some users
		    collection.insert([user], function (err, result) {
				if (err) {
				    console.log(err);
				} else {
				    console.log('Inserted document into the "users" collection. The documents inserted with "_id" are:', result);
				}
				db.close();
		  	});
		}
		
	});
	res.setHeader('Access-Control-Allow-Origin', '*');
   	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  	res.end("Record successfully saved in MongoLab!");
});

app.listen(3000);