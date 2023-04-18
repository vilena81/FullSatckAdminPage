const express = require('express');

const app = express();
app.use(express.json())
const {routers} = require('./routes/index')


routers(app)

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});