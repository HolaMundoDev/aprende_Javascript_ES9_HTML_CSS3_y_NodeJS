require('dotenv').config();

const config = {
  mongooseURL: process.env.MONGOOSE_URL,
};

module.exports = { config };