const mongoose = require('../../config/database');

const reservaClienteSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true
    },
    status: {
        type: String,
        required: true,
        default: 'ABERTO'
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        require: true
    },
    numero_pessoas: {
        type: Number,
        require: true
    },
    servico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico',
        require: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true
    },
    dados: Object,
    created_at: Date,
    updated_at: Date
});

const Reserva = mongoose.model('Reserva', reservaClienteSchema);

module.exports = Reserva;