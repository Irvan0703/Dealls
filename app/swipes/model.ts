import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/db';
import User from '../users/model';

class Swipe extends Model {
    public id!: number;
    public swiperId!: number;
    public swipedUserId!: number;
    public type!: 'like' | 'pass';
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Swipe.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        swiperId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        swipedUserId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        type: {
            type: DataTypes.ENUM('like', 'pass'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Swipe',
        tableName: 'swipes',
    }
);

// Relasi
User.hasMany(Swipe, { foreignKey: 'swiperId', as: 'swipesMade', onDelete: 'CASCADE' });
User.hasMany(Swipe, { foreignKey: 'swipedUserId', as: 'swipesReceived', onDelete: 'CASCADE' });
Swipe.belongsTo(User, { foreignKey: 'swiperId', as: 'swiper' });
Swipe.belongsTo(User, { foreignKey: 'swipedUserId', as: 'swipedUser' });

export default Swipe;
