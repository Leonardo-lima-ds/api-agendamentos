const authMiddleware = require('../../middlewares/auth');
const Servico = require('../models/servico-empresa');

module.exports = (app) => {

    app.use(authMiddleware);

    //Criaçaão de novo serviço
    app.post('/servico', async (req, res) => {

        try {

            await Servico.create(req.body).then((retorno) => {
                return res.status(200).json(retorno);
            });

        }
        catch (err) {
            return res.status(512).json({ error: 'Falha ao tentar criar novo serviço '});
        }

    });
 }