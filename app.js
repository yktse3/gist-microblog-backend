const express = require('express');
const app = express();
const cors = require('cors');
const loginRouter = require('./routes/login');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use('/login', loginRouter);

app.listen(3100);
console.log(`Server is up and running!`);