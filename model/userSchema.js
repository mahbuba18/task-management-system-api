// import { DataTypes, Sequelize } from "sequelize";

// export const createUserModel =async (sequelize) => {
//     const User = sequelize.define("users", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//             validate: {
//                 isEmail: true,
//             },
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     }, {
//         timestamps: true, // Adds createdAt and updatedAt timestamps
//     });

//     return User;
// };
import { DataTypes } from 'sequelize';

export const createUserModel = async (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100), 
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255), 
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true, 
  });

  return User;
};