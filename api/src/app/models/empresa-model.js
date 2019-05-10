const mongoose = require('../../config/database');
const bcrypt = require('bcryptjs');

const empresaSchema = new mongoose.Schema({
    tipo: {
        type: Number,
        default: 2
    },
    razao_social: {
        type: String,
        uppercase: true,
        require: true
    },
    responsavel: {
        type: String,
        uppercase: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    cnpj: {
        type: String,
        unique: true,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

empresaSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Empresa = mongoose.model('Empresa', empresaSchema);

module.exports = Empresa;