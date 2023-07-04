const { Sequelize: SequelizeConn } = require("sequelize");

const Sequelize = new SequelizeConn("toughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  Sequelize.authenticate();
  console.log("Conectado com sucesso!");
} catch (error) {
  console.log(`Erro ao conectar ao banco: ${error}`);
}

module.exports = Sequelize;
