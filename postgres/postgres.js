// import { Sequelize} from 'sequelize';
// import { createUserModel } from '../model/userSchema.js';


// const sequelize = new Sequelize('', 'root', '', {
//     host: 'localhost',
//     dialect:  'postgres'
//   });

//  let UserModel=null; 

// const connection=async()=>{
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
        
//         UserModel= await createUserModel(sequelize );
//         await sequelize.sync( );
//         console.log("Database Synced")
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }

// }


// export{
//     connection,
//     UserModel
// }
import { Sequelize } from 'sequelize';
import { createUserModel } from '../model/userSchema.js';

const sequelize = new Sequelize('postgres://postgres:priya@localhost:5432/task_manager', {
  dialect: 'postgres',
  host: 'localhost'
});
let UserModel = null;

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Initialize the User model
        UserModel = await createUserModel(sequelize);
        await sequelize.sync(); // Syncing the model with the database
        console.log("Database Synced");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export { 
    connection, 
    UserModel 
};