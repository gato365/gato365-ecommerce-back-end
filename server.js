const express = require('express');
const routes = require('./routes');
// Access connection to sequelize
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
      console.log("Listening on http://localhost:" + PORT)
  });
});
