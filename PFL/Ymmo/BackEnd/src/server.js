require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Ymmo API démarrée sur http://localhost:${PORT}`);
  console.log(` Environnement : ${process.env.NODE_ENV}`);
});