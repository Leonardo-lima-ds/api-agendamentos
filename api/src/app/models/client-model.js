const mongoose = require('../../config/database');
const bcrypt = require('bcryptjs');

const clienteSchema = new mongoose.Schema({
    tipo: {
        type: Number,
        default: 1
    },
    nome: {
        type: String,
        uppercase: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    cpf: {
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

// Criptografa senha antes de salvar
clienteSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

//Variável que será exportada
const Client = mongoose.model('Cliente', clienteSchema);

module.exports = Client;