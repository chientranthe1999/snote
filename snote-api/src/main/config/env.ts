// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV,
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb+srv://chientt:OPij4A7OOWmF29dp@chientt.l2ck3we.mongodb.net/?retryWrites=true&w=majority',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'accesstokensecret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'refereshtokensecret',
  bcryptSalt: 10,
};
