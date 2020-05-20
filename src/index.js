const PORT = process.env.PORT || 3000;

const app = require('./app');

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on('error', (err) => {
    console.log('ERROR: ', err);
  });
