const { Sequelize: SequelizeConn } = require("sequelize");

const Sequelie = new SequelizeConn("toughts", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  Sequelie.authenticate();
  console.log("Conectado com sucesso!");
} catch (error) {
  console.log(`Erro ao conectar ao banco: ${error}`);
}

module.exports = Sequelie;
