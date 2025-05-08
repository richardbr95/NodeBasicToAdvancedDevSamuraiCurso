import Sequelize, { Model, Op } from "sequelize";

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
      },
      {
        scopes: {
          active: {
            where: {
              status: "ACTIVE",
            },
            order: ["createdAt"],
          },
          samurai: {
            where: {
              name: "Dev Samurai",
            },
          },
          created(date) {
            return {
              where: {
                createdAt: { [Op.gte]: date },
              },
            };
          },
        },
        sequelize,
        // timestamps: true,
        underscored: true, // Isso vai fazer o Sequelize usar _ no lugar de camelCase
        name: {
          singular: "customer",
          plural: "customers",
        },
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Contact);
  }
}
export default Customer;
