const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'PROJECT 2',
    description: 'No much to say about this API, because I am still thinking what it is going to do. For instance, it is going to be a collection of favorite books'
  },
  host: 'cse341-project-2-rx9t.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);