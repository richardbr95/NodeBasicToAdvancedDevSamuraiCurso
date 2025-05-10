import Sequelize, { Model } from "sequelize";

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: "files",
        createdAt: "create_at", // Define o nome personalizado para created_at
        updatedAt: "update_at", // Define o nome personalizado para updated_at
        // timestamps: true,
        underscored: true, // Isso vai fazer o Sequelize usar _ no lugar de camelCase
        name: {
          singular: "file",
          plural: "files",
        },
      }
    );
  }
  static associate(models) {
    this.hasMany(models.User);
  }
}
export default File;
