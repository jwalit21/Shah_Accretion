// const fs = require('fs');
// const http = require('http');
// const url = require('url');
// const events = require('events');
// const formidable = require('formidable');
// var emitter=new events.EventEmitter();

// http.createServer(function (req,res) {
//     res.writeHead(200,{'Content-Type':'text/html'});
//     var q= url.parse(req.url,true).query;
//     console.log(req.url);
//     var filename = "./"+q.f;
//     console.log(filename);
//     var myEventHandler = function () {
//         console.log('Event invoked');
//     }
//     fs.readFile(filename,function (err,data) {
//         if(err)
//         {
//             res.writeHead(404,{'Content-Type':'text/html'});
//             return res.end("404");
//         }
//         res.writeHead(200,{'Content-Type':'text/html'});
//         res.write(data);
//         return res.end();
//     });

//     if(req.url=='/fileupload')
//     {
//         var form = new formidable.IncomingForm();
//         form.parse(req,function (err,fields,files) {
//             res.write("file uploaded");
//             res.end();
//         });
//     }
//     else
//     {
//         res.writeHead(200,{'Content-Type':'text/html'});
//         res.write('<form action="fileupload" method="post" enctype="multipart/form-data"><br>');
//         res.write('<input type="file" name="filetoupload"><br>');
//         res.write('<input type="submit">');
//         res.write('</form>');
//         return res.end();
//     }

//     emitter.on('custom',myEventHandler);
//     emitter.emit('custom');

// }).listen(8081);

var express = require("express");
var nodemailer = require('nodemailer');
// const formidable = require('formidable');
const path = require('path');

// const path = require('path');
// const cors = require('cors');
// const multer = require('multer');
var bodyParser = require("body-parser");

var app = express();
const port = 8081;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jwalitshah2q@gmail.com',
      pass: '***'
    }
});

function send_mail(mailoptions_param) {
    transporter.sendMail(mailoptions_param, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

function makeToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i<length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

// const PATH = './uploads';

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, PATH);
//     },
//     filename: (req, file ,cb) => {
//         cb(null,file.fieldname+'-'+Date.now())
//     }
// });

// let upload = multer({
//     storage : storage
// });

// parse application/x-www-form-urlencoded
// extended=true uses "qs" library (query String library)
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//for cross platoform file upload request
// app.use(cors())

// parse application/json
app.use(bodyParser.json());

//var cors = require('cors');
//app.use(cors());

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

var mongoose = require("mongoose");
const { parse } = require("path");

mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/emp_db", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect("mongodb://localhost:27017/shah_accretion_db");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", mongoConnected);

function mongoConnected() {
    console.log("Mongoose connected successfully");

    var Organization_Users_Schema = new mongoose.Schema({
        org_id: Number,
        organization_name: String,
        director_name: String,
        email: String,
        password: String,
        mobile: String,
        website_link: String,
        facebook_link: String,
        linkedin_link: String,
        instagram_link: String,
        logo: String,
    },{collection: "Organization_Users",});

    var Employee_Users_Schema = new mongoose.Schema({
        emp_id: Number,
        org_id: Number,
        first_name: String,
        last_name: String,
        email: String,
        mobile: String,
        password: String,
        address: String,
        date_of_birth: String,
        date_of_join: String,
        blood_group: String,
        photo: String,
    },{collection: "Employee_Users",});

    var Todos_Schema = new mongoose.Schema({
        todo_id : Number,
        emp_username: String,
        org_id: Number,
        title: String,
        task : String,
        date_of_issue: String,
        date_of_due: String,
        finished: Boolean,
        finished_date: String,
    },{collection: "Todos",});

    var Organization_Users = mongoose.model("Organization_User",Organization_Users_Schema);
    var Employee_Users = mongoose.model("Employee_User",Employee_Users_Schema);
    var Todos = mongoose.model("Todos",Todos_Schema);

    // app.post('/api/upload', upload.single('image'), function (req, res) {
    //     if (!req.file) {
    //       console.log("No file is available!");
    //       return res.send({
    //         success: false
    //       });
      
    //     }
    //     else {
    //       console.log('File is available!');
    //       return res.send({
    //         success: true
    //       })
    //     }
    // });

    // app.post("/file_upload",(req,res) => {
    //     var filepath = ""
    //     var form = new formidable.IncomingForm();
    //     form.parse(req);
    //     form.on("fileBegin",(name,file)=>{
    //         filepath = path.join(__dirname)+file.name
    //         //file.path = filepath;
    //         console.log(filepath);
    //     });
    //     form.on('end',()=>{
    //         res.send({
    //             "msg": "ok"
    //         });
    //     });
    // });

    app.post("/organization/registration", (req, res) => {
        var newOrg = new Organization_Users(req.body);
        var new_org_id = 0;

        Organization_Users.find({email: newOrg.email,},(err, user) => 
        {
            if (err){
                res.status(404);
                res.send({msg: "Unable to register a organization"});
            }
            else{
                if (user.length == 0){
                    Organization_Users.find().sort("-org_id").limit(1).exec(function (error, org_max){
                        new_org_id = org_max[0].org_id + 1;
                        newOrg.org_id = new_org_id;
                        newOrg.save(function (err)
                        {
                            if (err){
                                res.status(404);
                                res.send({msg: "Unable to register a organization"});
                            }else{
                                console.log("Organization added!");
                                res.send({msg: "Organization registered successfully! please login!", org_id: new_org_id.toString()});
                            }
                        });
                    });
                }
                else{
                    res.send({msg: "An Organization is already registered with this email!!",error_msg: "true"});
                }
            }
        });
    });

    app.post("/organization/login", (req, res) => {
        var org = new Organization_Users(req.body);

        Organization_Users.find({email: org.email, password: org.password},(err, user) => 
        {
            if (err){
                res.status(404);
                res.send({msg: "Unable to login!!"});
            }
            else{
                if (user.length == 0){
                    console.log("Invalid credentials!");
                    res.send({msg: "Invalid credentials! please login again!", error_msg: "true"});
                }
                else{
                    console.log("successfully logged in!");
                    res.send({user : user[0]});
                }
            }
        });
    });

    app.post("/employee/login", (req, res) => {
        var emp = new Employee_Users(req.body);

        Employee_Users.find({email: emp.email, org_id: emp.org_id, password: emp.password},(err, user) => 
        {
            if (err){
                res.status(404);
                res.send({msg: "Unable to login!!"});
            }
            else{
                if (user.length == 0){
                    console.log("Invalid credentials!");
                    res.send({msg: "Invalid credentials! please login again!", error_msg: "true"});
                }
                else{
                    console.log("successfully logged in!");
                    res.send({user : user[0]});
                }
            }
        });
    });

    app.post("/organization/employees/add", (req, res) => {
        var newEmp = new Employee_Users(req.body);
        var new_emp_id = 0;

        Employee_Users.find({email: newEmp.email,},(err, user) => 
        {
            if (err){
                res.status(404);
                res.send({msg: "Unable to add a employee!"});
            }
            else{
                if (user.length == 0){
                    Employee_Users.find().sort("-emp_id").limit(1).exec(function (error, emp_max){
                        console.log(emp_max)
                        new_emp_id = emp_max[0].emp_id + 1;
                        newEmp.emp_id = new_emp_id;
                        newEmp.save(function (err)
                        {
                            if (err){
                                res.status(404);
                                res.send({msg: "Unable to add a employee!"});
                            }else{
                                console.log("Employee added!");
                                res.send({msg: "Employee added successfully!", emp: newEmp});
                            }
                        });
                    });
                }
                else{
                    res.send({msg: "An Employee is alreay registered with this email!!",error_msg: "true"});
                }
            }
        });
    });



    app.get("/organization/employees", (req,res) => {
        Employee_Users.find(function (err,employees) {
            if (err) {	
                console.log("Error occured while getting all employees!")			
				res.send(err);
			}
			else {
				console.log("All employees returned!");
				res.status(200);
				res.send(employees);
			}
        }); 
    });

    app.get("/organization/employees/:id", (req, res) => {
		Employee_Users.find( {emp_id : parseInt(req.params.id)}, function(err, emp) {
			if (err) {
				console.log("Unable to find an employee");
				res.status(400);
				res.send(err);
			}
			else {
				if (Array.isArray(emp)) {
					if (emp.length == 0) {
						console.log("Unable to find an employee")
						res.send({ "msg" : "Unable to find an employee"})						
					}

					else {
						console.log("Employee record returned");
						console.log(emp);
						res.send(emp);
					}
				}
			}			
		});
    });
    
    app.delete("/organization/employees/:id", (req,res)=> {
        console.log(parseInt(req.params.id));
        Employee_Users.remove({emp_id: parseInt(req.params.id)} , function(err,emp){
            if(err){
                res.status(400);
                res.send(err);
            }
            else{
                console.log("Employee removed ",emp);
                res.send({"msg": "Employee deleted successfully!"});
            }
        });
    });

    app.put("/organization/employees/", (req,res) => {
        Employee_Users.update({emp_id: req.body.emp_id}, req.body, {new : true} , function(err,emp){
            if (err) {
                res.status(400);
                res.send(err);
            }
            else{
                res.status(200);
                res.send({"msg": "Employee updated successfully!" });
            }
        });
    });

    app.put("/organization/profile/", (req,res) => {

        Organization_Users.update({org_id: req.body.org_id}, req.body, {new : true} , function(err,emp){
            if (err) {
                res.status(400);
                res.send(err);
            }
            else{
                res.status(200);
                res.send({"msg": "Organization data updated successfully!" });
            }
        });
    });

    app.delete("/organization/:id", (req,res)=> {
        console.log(parseInt(req.params.id));
        Employee_Users.deleteMany({org_id: parseInt(req.params.id)} , function(err,emp){
            if(err){
                res.status(400);
                res.send(err);
            }
            else{
                console.log("Employees of organization removed");
                Todos.deleteMany({org_id: parseInt(req.params.id)}, function(err, todo){
                    if(err){
                        res.status(400);
                        res.send(err)
                    }
                    else{
                        Organization_Users.remove({org_id: parseInt(req.params.id)} , function(err,org){
                            if(err){
                                res.status(400);
                                res.send(err);
                            }
                            else{
                                console.log("Organization account deleted");
                                res.send({"msg": "Organization account deleted successfully"})                        
                            }
                        });
                    }
                });
            }
        });
    });

    app.get("/organization", (req,res) => {
        Organization_Users.find(function (err,orgs) {
            if (err) {
                console.log("Error occured while getting all organization!")			
				res.send(err);
			}
			else {
				console.log("All organizations returned!");
				res.status(200);
				res.send(orgs);
			}
        }); 
    });

    app.get("/todos", (req,res) => {
        Todos.find(function (err,todos) {
            if (err) {
                console.log("Error occured while getting all todos!")			
				res.send(err);
			}
			else {
				console.log("All todos returned!");
				res.status(200);
				res.send(todos);
			}
        }); 
    });

    app.post("/todos", (req, res) => {
        var newTodo = new Todos(req.body);
        var new_todo_id = 0;

        Todos.find().sort("-todo_id").limit(1).exec(function (error, todo_max){
            console.log(todo_max)
            new_todo_id = todo_max[0].todo_id + 1;
            newTodo.todo_id = new_todo_id;
            newTodo.save(function (err)
            {
                if (err){
                    res.status(404);
                    res.send({msg: "Unable to add a todo!"});
                }else{
                    console.log("Todo added!");
                    res.send({msg: "Todo added successfully!", todo: newTodo});
                }
            });
        });

    });

    app.get("/todos/:id", (req, res) => {
		Todos.find( {todo_id : parseInt(req.params.id)}, function(err, todo) {
			if (err) {
				console.log("Unable to find a Todo");
				res.status(400);
				res.send(err);
			}
			else {
				if (Array.isArray(todo)) {
					if (todo.length == 0) {
						console.log("Unable to find a todo!")
						res.send({ "msg" : "Unable to find a todo"})						
					}

					else {
						console.log("Todo record returned");
						console.log(todo);
						res.send(todo);
					}
				}
			}			
		});
    });

    app.put("/todos", (req,res) => {
        Todos.update({todo_id: req.body.todo_id}, req.body, {new : true} , function(err,emp){
            if (err) {
                res.status(400);
                res.send(err);
            }
            else{
                res.status(200);
                res.send({"msg": "Todo updated successfully!" });
            }
        });
    });

    app.delete("/todos/:id", (req,res)=> {
        console.log(parseInt(req.params.id));
        Todos.remove({todo_id: parseInt(req.params.id)} , function(err,todo){
            if(err){
                res.status(400);
                res.send(err);
            }
            else{
                console.log("Todo deleted");
                res.send({"msg": "Todo has deleted successfully"})                        
            }
        });
    });

    app.post("/forgot-password", (req, res) => {
        var fp = req.body;
        console.log(fp.emp)
        console.log(fp.org)
        console.log(fp.is_employee)

        var token = makeToken(9)
        var reciever_email
        if(fp.is_employee)
            reciever_email = fp.emp.email
        else    
            reciever_email = fp.org.email
        console.log("Reciever is ",reciever_email)

        var mailOptions = {
            from: 'jwalitshah2q@gmail.com',
            to: 'jwalitshah2q@gmail.com',
            subject: 'Shah Accretion Reset password Token validation',
            text: 'That was easy! And this the one time TOKEN : ' + token
        };

        send_mail(mailOptions);

        res.send({"msg":"token is sent","token":token})

    });


}

app.listen(port);
