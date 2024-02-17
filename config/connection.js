const { connect } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialDB';

const db = connect(connectionString);

module.exports = db;