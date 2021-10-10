const fs = require('fs').promises;

module.exports = (pool) => {
    return fs.readFile(`${__dirname}/../sql/setup.sql`, {encoding: 'utf-8' })
    // .then(console.log)
    .then(sql => pool.query(sql));
}
