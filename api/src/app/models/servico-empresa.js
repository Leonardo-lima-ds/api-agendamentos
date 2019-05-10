const mongoose = require('../../config/database');

const servicoEmpresaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        require: true
    },
    capacidade_atendimento: {
        type: Number,
        require: true
    },
    total_reservas: {
        type: Number,
        default: 0
    },
    dados: Object,
    created_at: Date,
    updated_at: Date
});

const Servico = mongoose.model('Servico', servicoEmpresaSchema);

module.exports = Servico;