module.exports = (sequelize, Sequelize) => {
    const konsultans = sequelize.define('konsultans', {
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
      },
      specialization: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      }
    });
  
    return konsultans;
  };