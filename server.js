var express=require('express')
var app=express();
var users=[
    {
        username:"suri",
        password:"123"
},
{
    username:"john",
    password:"456"

}
]

var cors=require('cors');
var bodyparser=require('body-parser')
var cookieParser = require('cookie-parser')
app.use(cors())
app.use(cookieParser())

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.static(__dirname+'/public'))
 
app.get('/login',function(req ,res){
    var x=users.some(function(user){
        if(user.username===req.query.username && user.password===req.query.password){
            return true;
        }  
    })
    if(x===true){
        res.cookie('username',req.query.username)
        res.cookie('password',req.query.password)
        res.sendFile(__dirname+'/home.html')
    }
    else{
        res.redirect('/login.html')
    }

})

app.get('/',function(req,res){
    if(req.query.cookie){
 console.log('received',req.query);
//   res.redirect('/login.html')
 res.sendFile(__dirname+"/home.html")  
    }
})
app.get('/login',function(req ,res){
    console.log("login" ,req.query);
    res.redirect('/login.html')
})

app.get('/add/:a/:b',function(req,res){
    res.send('addition::'+(+req.params.a+ +req.params.b))
})


app.get('/Aboutus',function(req,res){
    if(req.cookies.username){
    console.log('aboutus request received ');
    res.sendFile(__dirname+"/Aboutus.html")  
    }
})

app.get('/Career',function(req,res){
    console.log('career request received');
    res.sendFile(__dirname+"/Career.html")  
})
app.get('/style.css',function(req ,res){
    console.log('css recived');
    res.sendFile(__dirname+'/style.css')
})
app.get('/login',function(req,res){
    console.log('login');
    res.sendFile('/login.html')
})
app.listen(4600);
