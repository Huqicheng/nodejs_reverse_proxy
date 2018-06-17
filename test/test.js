var express  = require('express');
var app1      = express();
var app2      = express();
var app3      = express();


app1.use("/", function(req, res) {
    res.send("server1: 3001");
});

app1.listen(3001);


app2.use("/", function(req, res) {
    res.send("server2: 3002");
});

app2.listen(3002);



