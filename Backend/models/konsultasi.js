module.exports = (sequelize, Sequelize) => {
    const konsultasi = sequelize.define('konsultasi', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      konsultant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Konsultans',
          key: 'id'
        }
      },
      consultation_time: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.TEXT
      }
    });
  
    return konsultasi;
  };