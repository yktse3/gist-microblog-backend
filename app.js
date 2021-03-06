const express = require('express');
const app = express();
const cors = require('cors');
const loginRouter = require('./routes/login');
const articlesRouter = require('./routes/articles');
const commentsRouter = require('./routes/comments');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use('/login', loginRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);

app.listen(3100);
console.log(`Server is up and running!`);
