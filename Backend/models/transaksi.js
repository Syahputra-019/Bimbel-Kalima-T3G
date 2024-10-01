module.exports = (sequelize, Sequelize) => {
    const transaksi = sequelize.define('transaksi', {
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
      amount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'completed', 'failed']
      },
      transaction_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  
    return transaksi;
  };