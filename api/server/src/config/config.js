require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: "d5t0ji6hl94pac",
    username: "lvnulkgaufrkob",
    password:
      "a8cb6421bbe3110943c7a8711ec1a289bb60dc4afec4db989c2e1dcffddcd43f",
    host: "ec2-54-197-238-238.compute-1.amazonaws.com",
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: { require: true }
    }
  },

  test: {
    database: "book_test",
    username: "steven",
    password: null,
    host: "127.0.0.1",
    dialect: "postgres"
  },

  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
};
