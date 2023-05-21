const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'PROJECT 2',
    description: 'No much to say about this API, because I am still thinking what it is going to do'
  },
  host: 'localhost:8080',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);