const express = require('express');
const PORT = 3001;
const app = express();
const cors = require('cors')
const {routers} = require('./routes/index')


app.use(express.json())
app.use(cors())
routers(app)

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
app.get('/', (req, res) => {
  const data = { message: 'Добро пожаловать на страницу регистрации!' };
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});