const Pool = require('pg').Pool

module.exports = new Pool({
  connectionString:
    process.env.PG_CONNECTION_STRING ||
    'postgresql://postgres:hushnud.22@localhost:5432/sumbar-computer',
})
