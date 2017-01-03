var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()
app.use(cookieParser('asdfasfwgw234'))

var products = {
  1:{title:'Labtop'},
  2:{title:'Macbook Pro'}
}
app.get('/products', function(req, res){
  var output = ''
  for(var id in products){
    output += `
      <li>
        <a href="/cart/${id}">${products[id].title}</a>
      </li>`
  }
  res.send(`
    <h1>Products</h1>
    <ul>${output}</ul>
    <a href="/cart">Cart</a>
    `)
})

app.get('/cart/:id', function(req, res){
  var id = req.params.id
  if(req.cookies.cart){
    var cart = req.cookies.cart
  } else {
    var cart = {}
  }
  if(!cart[id]){
    cart[id] = 0
  }
  cart[id] = parseInt(cart[id]) + 1
  res.cookie('cart', cart)
  res.redirect('/cart')
})

app.get('/cart', function(req, res){
  var cart = req.cookies.cart
  if(!cart) {
    res.send('Empty')
  } else {
    var output = ''
    for(var id in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`
    }
  }
  res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Produts List</a>
    `)
})

app.get('/count', function (req, res) {
  if(req.signedCookies.count){
    var count = parseInt(req.signedCookies.count)
  } else {
    var count = 0
  }
  count = count + 1
  res.cookie('count', count, {signed:true})
  res.send('count:' + count)
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
