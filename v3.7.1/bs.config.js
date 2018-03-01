const middleware = require('./bs.middleware');

const baseDir = `${__dirname}/dist`;

module.exports = {
  server: { baseDir },
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false,
  },
  middleware,
};
