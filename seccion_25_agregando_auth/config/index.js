require('dotenv').config();

const config = {
  mongooseURL: process.env.MONGOOSE_URL,
  secret: process.env.SECRET,
};

module.exports = { config };