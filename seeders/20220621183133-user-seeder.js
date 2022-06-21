'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('users', [
            {
                role_id: 1,
                first_name: 'Edgar',
                last_name: 'Eldy',
                tel: '75 923 546',
                email: 'admin@gmail.com',
                address: 'Queens',
                username: 'admin',
                password: '123456',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                role_id: 1,
                first_name: 'John',
                last_name: 'Doe',
                tel: '75 458 312',
                email: 'user@gmail.com',
                address: 'Sans Francisco',
                username: 'user',
                password: '123456',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
