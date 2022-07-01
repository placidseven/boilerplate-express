let express = require('express');
let bodyParser = require('body-parser');
let app = express();

//Middleware are functions that intercept route handlers, adding some kind of information. A middleware needs to be mounted using the method app.use(path, middlewareFunction). The first path argument is optional. If you don’t pass it, the middleware will be executed for all requests.
//An HTML server usually has one or more directories that are accessible by the user. You can place the static assets needed by your application (stylesheets, scripts, images) there.
//In Express, you can put in place this functionality using the middleware express.static(path), where the path parameter is the absolute path of the folder containing the assets.
let absolutePath = express.static(__dirname + "/public")
app.use("/public", absolutePath);

//Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, next().
app.use(function (req, res, next) {
  console.log(req.method +" "+ req.path +" - "+ req.ip);
  next();
});

//Middleware can be mounted at a specific route using app.METHOD(path, middlewareFunction). Middleware can also be chained within a route definition.
app.get('/now', function (req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res) {
  res.json({time: req.time});
});

absolutePath = __dirname + "/views/index.html"
app.get('/', (req, res) => {
  //res.send('Hello Express')
  res.sendFile(absolutePath)
});

app.get('/json', (req, res) => {
  let message = "Hello json"
  if(process.env.MESSAGE_STYLE === "uppercase"){
    message = message.toUpperCase();  
  }
  res.json({"message": message});
});

//Route parameters are named segments of the URL, delimited by slashes (/). Each segment captures the value of the part of the URL which matches its position. The captured values can be found in the req.params object.
app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word});
});

app.get("/name", (req, res) => {
    //res.json({name: req.query.first});
  res.json({name: `${req.query.first} ${req.query.last}`});
});

app.post("/name", function(req, res){
  res.json({name: `${req.body.first} ${req.body.last}`});
});
























 module.exports = app;
