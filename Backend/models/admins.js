module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define('admins', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    });
  
    return admin;
  };