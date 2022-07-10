const LocalStrategy = require('passport-local').Strategy
const { users } = require('@prisma/client')
const { Passport } = require('passport')

function initialize(passport) {
  passport.use()
}

module.exports = initialize
