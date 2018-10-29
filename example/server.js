const express = require('express')

const app = express()
app.set('views', './dist')
app.set('view engine', 'pug')

app.use('/static', express.static('./dist'))
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(8080, function() {
  console.log('Server started on port 8080')
})