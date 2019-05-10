const authMiddleware = require('../../middlewares/auth');

module.exports = (app) => {

    app.use(authMiddleware);

    app.get('/dashboard', (req, res) => {
         res.send('Dashboard inicial da empresa');
    });
 }