const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reserva', {
    useNewUrlParser: true
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

module.exports = mongoose;