const authMiddleware = require('../../middlewares/auth');
const Reserva = require('../models/reserva-client');
const Servicos = require('../models/servico-empresa');

module.exports = (app) => {

    // Autenticação com token obrigatória
    app.use(authMiddleware);

    app.get('/servicos-disponiveis', async (req, res) => {
        Servicos.find().populate('empresa').then((retorno) => {

            for(let i = 0; i < retorno.length; i++) {

                //Se eu tenho serviços cadastrados e eles tem capacidade de atendimento
                if (parseInt(retorno[i].capacidade_atendimento) > parseInt(retorno[i].total_reservas)) {
                   return res.status(200).json(retorno);
                } 
                else {
                    return res.status(200).json({ message: 'Capacidade máxima atingida'})
                }

            }

        },
         (erro) => {
            res.status(512).json({ error: erro })
        })
    });


    //Retorna reservas usuário que ainda estão abertas
    app.get('/reservas-abertas', async (req, res) => {
        Reserva.find({ usuario: req.userId, $and: [{ status: 'ABERTO'}] }).populate(['empresa', 'usuario']).then((retorno) => {
            return res.status(200).json(retorno);
        },
         (erro) => {
            res.status(512).json({ error: erro })
        })
    });

    //Retorna todos os agendamentos abertos na enpresa
    app.get('/reservas-abertas/empresa', async (req, res) => {
        Reserva.find({ empresa: req.userId, $and: [{ status: 'ABERTO'}] }).populate(['empresa', 'usuario']).then((retorno) => {
            res.status(200).json(retorno);
        },
         (erro) => {
            res.status(512).json({ error: erro })
        })
    });

    //Retorna todas as reservas já feitas pelo usuário
    app.get('/historico', async (req, res) => {
        Reserva.find({ usuario: req.userId }).populate('empresa').then((retorno) => {
            res.status(200).json(retorno);
        },
            (erro) => {
            res.status(512).json({ error: erro })
        })
    });

    //Cria uma nova reserva
    app.post('/reserva', async (req, res) => {

        let { quantidade_pessoas } = req.body;

        try {
            // Cria uma reserva com o userId passada na requisição
            await Reserva.create({ ...req.body, usuario: req.userId }).then( async (retorno) => {
                
                console.log(retorno.servico);

                await Servicos.findByIdAndUpdate(
                    retorno.servico,
                    {
                        $inc: {
                            total_reservas: parseInt(quantidade_pessoas)
                        },
                    },
                        
                    { new: true }

                );

                return res.status(200).json(retorno);
            });
        }
        catch (err) {
            return res.status(512).json({ error: 'Falha ao tentar realizar a reserva.'});
        }

     });

     //Atualiza reserva
     app.put('/alterar-reserva/:id', async (req, res) => {
        try {
            // Cria uma reserva com o userId passada na requisição
            await Reserva.findOneAndUpdate({ ...req.body, usuario: req.params.id }).then((retorno) => {
                return res.status(200).json(retorno);
            });
        }
        catch (err) {
            return res.status(512).json({ error: 'Falha ao tentar alterar a reserva.'});
        }
    });

    //Cancela reserva reserva através de uma alteração do status
    app.put('/cancelar-reserva/:id', async (req, res) => {
        try {
            // Cria uma reserva com o userId passada na requisição
            await Reserva.findByIdAndUpdate({ _id: req.params.id }, { status: 'CANCELADO' }).then((retorno) => {
                 return res.status(200).json(retorno);
            });
        }
        catch (err) {
            return res.status(512).json({ error: 'Falha ao tentar alterar a reserva.'});
        }
    });
 }