

module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        port: parseInt(process.env.db_port),
        host: process.env.db_host,
        user: process.env.db_username,
        password: process.env.db_password,
        database: process.env.db_name,
        timezone: '+05:30',
        decimalNumbers: true,
        dateStrings: true
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 300000,
    pool: { min: 2, max: 50 }
})
