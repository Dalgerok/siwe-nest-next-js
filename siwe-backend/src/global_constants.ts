export const globalConstants = {
  data_source: process.env.SQLLITE_DATA_SOURCE || 'SQLLITE_DATA_SOURCE',
  user_repository: process.env.USER_REPOSITORY || 'USER_REPOSITORY',
  saltRounds: 10,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
};
