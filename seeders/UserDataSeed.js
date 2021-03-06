const adminSeed = [
    {
        email: "mcd.admin@mail.com",
        password: "admin123",
        firstName: "Martin",
        lastName: "Cappi",
        roleId: 1,
    },
    {
        email: "al.admin@mail.com",
        password: "admin123",
        firstName: "Antonio",
        lastName: "Ludueña",
        roleId: 1,
    },
    {
        email: "bp.admin@mail.com",
        password: "admin123",
        firstName: "Benjamin",
        lastName: "Potobsky",
        roleId: 1,
    },
    {
        email: "fr.admin@mail.com",
        password: "admin123",
        firstName: "Fernanda",
        lastName: "Ramirez",
        roleId: 1,
    },
    {
        email: "ig.admin@mail.com",
        password: "admin123",
        firstName: "Ignacio",
        lastName: "Garcia",
        roleId: 1,
    },
    {
        email: "ja.admin@mail.com",
        password: "admin123",
        firstName: "Juan",
        lastName: "Abal",
        roleId: 1,
    },
    {
        email: "li.admin@mail.com",
        password: "admin123",
        firstName: "Luciano",
        lastName: "Ibarra",
        roleId: 1,
    },
    {
        email: "mca.admin@mail.com",
        password: "admin123",
        firstName: "Marcos",
        lastName: "Caballero",
        roleId: 1,
    },
    {
        email: "mch.admin@mail.com",
        password: "admin123",
        firstName: "Michel",
        lastName: "Chamarez",
        roleId: 1,
    },
    {
        email: "hf.admin@mail.com",
        password: "admin123",
        firstName: "Hugo",
        lastName: "Foncea",
        roleId: 1,
    },
    {
        email: "er.admin@mail.com",
        password: "admin123",
        firstName: "Emmanuel",
        lastName: "Ranone",
        roleId: 1,
    },
];

const regularSeed = [
    {
        email: "mcd.user@mail.com",
        password: "user123",
        firstName: "Martin",
        lastName: "Cappi",
        roleId: 2,
    },
    {
        email: "al.user@mail.com",
        password: "user123",
        firstName: "Antonio",
        lastName: "Ludueña",
        roleId: 2,
    },
    {
        email: "bp.user@mail.com",
        password: "user123",
        firstName: "Benjamin",
        lastName: "Potobsky",
        roleId: 2,
    },
    {
        email: "fr.user@mail.com",
        password: "user123",
        firstName: "Fernanda",
        lastName: "Ramirez",
        roleId: 2,
    },
    {
        email: "ig.user@mail.com",
        password: "user123",
        firstName: "Ignacio",
        lastName: "Garcia",
        roleId: 2,
    },
    {
        email: "ja.user@mail.com",
        password: "user123",
        firstName: "Juan",
        lastName: "Abal",
        roleId: 2,
    },
    {
        email: "li.user@mail.com",
        password: "user123",
        firstName: "Luciano",
        lastName: "Ibarra",
        roleId: 2,
    },
    {
        email: "mca.user@mail.com",
        password: "user123",
        firstName: "Marcos",
        lastName: "Caballero",
        roleId: 2,
    },
    {
        email: "mch.user@mail.com",
        password: "user123",
        firstName: "Michel",
        lastName: "Chamarez",
        roleId: 2,
    },
    {
        email: "hf.user@mail.com",
        password: "user123",
        firstName: "Hugo",
        lastName: "Foncea",
        roleId: 2,
    },
    {
        email: "er.user@mail.com",
        password: "user123",
        firstName: "Emmanuel",
        lastName: "Ranone",
        roleId: 2,
    },
];

module.exports = {
    adminSeed,
    regularSeed,
    up: async () => {
        return;
    },
    down: async () => {
        return;
    },
};
//up and down are there to silence an error during migration, they are faking a seeder
