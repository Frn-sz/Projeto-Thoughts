const { Sequelize: SequelizeConn } = require("sequelize");

const Sequelize = new SequelizeConn("thoughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: '3306'
});

try {
  Sequelize.authenticate();
  console.log("Conectado com sucesso!");
} catch (error) {
  console.log(`Erro ao conectar ao banco: ${error}`);
}

module.exports = Sequelize;