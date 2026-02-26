const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const routes = require('./routes/index');
const path = require('path');
require('dotenv').config();
require('./models/relations');
const app = express();

const port = process.env.PORT || 3000;

sequelize
    .sync()
    .then(() => console.log("E-commerce DB synced"))
    .catch(console.error);

app.use(cors({
    origin: '*',
    credentials: true,
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js and PostgreSQL project!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});