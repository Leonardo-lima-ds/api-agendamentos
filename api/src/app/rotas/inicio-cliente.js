const authMiddleware = require('../../middlewares/auth');

module.exports = (app) => {

   app.use(authMiddleware);
   
   app.get('/inicio', (req, res) => {
        res.send('Pagina incial do cliente');
   });
}