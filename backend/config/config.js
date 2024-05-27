module.exports = {
    development: {
      username: 'postgres',
      password: 'admin',
      database: 'pdf_chat',
      host: '127.0.0.1',
      dialect: 'postgres',
      dialectOptions: {
        lowerCaseTableNames: true // Configure Sequelize to use lowercase table names
      }
    },
    s3: {
      bucket: '',
      accessKeyId: '',
      secretAccessKey: '',
      region: ''
    },
    redis: {
    host: '127.0.0.1', // or your Redis Cloud host
    port: 6379, // or your Redis Cloud port
    password: '' // only if using Redis Cloud with a password
  },
  openapi:{
    REPLICATE_API_KEY:'',
    DATABASE_URL:'127.0.0.1'

  }

  };
  