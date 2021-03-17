const Sequelize = require('sequelize');

const FilmModel = require('./models/films');
const UserModel = require('./models/users');

const sequelize = new Sequelize('moviesys', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const Film = FilmModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

sequelize.sync({force: false}).then(()=>{
    console.log('Tablas Sincronizadas');
});

module.exports = {
    Film,
    User
}