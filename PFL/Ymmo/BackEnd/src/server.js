require('dotenv').config();
const app = require('./app');
const bootstrapAdmin = require('./shared/bootstrap/adminBootstrap');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await bootstrapAdmin();
    app.listen(PORT, () => {
      console.log(` Ymmo API démarrée sur http://localhost:${PORT}`);
      console.log(` Environnement : ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error("Impossible de démarrer l'API:", error);
    process.exit(1);
  }
})();
