import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          field: "create_at",
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "update_at",
        },
      },

      {
        sequelize,
        underscored: true,
        tableName: "users", // Nome correto da tabela
        // timestamps: true,
        name: {
          singular: "user",
          plural: "users",
        },
      }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: "file_id" });
  }
  async checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
