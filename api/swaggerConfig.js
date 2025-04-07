const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {

    definition: {

        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'Abo Mariam Vape Store API Documentation',
            version: '0.2',
            description: 'This is the API Documentation for Abo Mariam Vape Store',
        },
        servers: [
            {
                url: 'https://abomariambackend.vercel.app/',
            },
            {
                url: 'https://abomariamvapestorebackend.onrender.com',
            },
            {
                url: 'http://localhost:8080', // API server URL
            }
        ],
    },
    apis: [path.join(__dirname, './routes/*.js')],


};

const specs = swaggerJsdoc(options);

module.exports = specs;
