let express = require('express');
let app = express();

let absolutePath = __dirname + "/views/index.html"
let middleware = express.static(__dirname + "/public")

console.log("Hello World")

app.use(function middleware(req, res, next) {
  console.log(req.method +" "+ req.path +" - "+ req.ip);
  next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  //res.send('Hello Express')
  res.sendFile(absolutePath)
});

app.use("/public", middleware);

app.get('/now', function middleware(req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res) {
  res.json({time: req.time});
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

app.get("/name", function(req, res) {
    //res.json({name: req.query.first});
  res.json({name: `${req.query.first} ${req.query.last}`});
});


























 module.exports = app;
