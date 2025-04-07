const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./api/swaggerConfig');

dotenv.config();
const morgan = require('morgan');
const { connectDB } = require('./api/models/index');
const router = require('./api/routes/index');



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'))
connectDB().then(r => console.log('Connected to DB')).catch(err => console.error(err));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {}));

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(swaggerSpecs);
});

app.use(router);

app.listen(process.env.PORT || 8080, () => {
    console.log(`connected to localhost:${process.env.PORT || 8080}`);
    console.log(`API Docs available at http://localhost:${process.env.PORT || 8080}/api-docs`);
    connectDB();
});

module.exports = app;
