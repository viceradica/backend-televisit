const CONFIG = {
  db: {
    connectionString: `${process.env.MONGO_CONNECTION_STRING}`
  },
  server: {
    host: `${process.env.HOST}`,
    port: `${process.env.PORT}`

  }
};

export default CONFIG;