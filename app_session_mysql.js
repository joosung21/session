var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: '43ljfahdgio@jdjfkdsl!870',
  resave: false,
  saveUninitialized: true,
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '111111',
    database: 'todolist'
  })
  // cookie: { secure: true }
}))
app.get('/count', function(req, res){
  if(req.session.count) {
    req.session.count++
  } else {
    req.session.count = 1
  }
  res.send('count: ' + req.session.count)
})
app.get('/auth/login', function(req, res){
  var output =`
    <h1>Login</h1>
    <form action="/auth/login" method="POST">
      <p><input type="text" name="username" placeholder="아이디"></p>
      <p><input type="password" name="password" placeholder="비밀번호"></p>
      <p><input type="submit" value="로그인"></p>
    </form>
  `
  res.send(output)
})
app.post('/auth/login', function(req, res){
  var user = {
    username: 'jayahn',
    password: '780405',
    displayName: 'Jay Ahn'
  }
  var uname = req.body.username
  var pwd = req.body.password
  if(uname === user.username && pwd === user.password){
    req.session.displayName = user.displayName
    res.redirect('/welcome')
  } else {
    res.send('Who are you? <a href="/auth/login">login</a?')
  }
})
app.get('/welcome', function(req, res){
  if(req.session.displayName){
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">Logout</a>
    `)
  } else {
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
    `)
  }
})
app.get('/auth/logout', function(req,res){
  delete req.session.displayName
  res.redirect('/welcome')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
