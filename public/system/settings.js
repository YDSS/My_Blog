//env 'development' or 'production'
var settings = {},
    isDev = true;
  settings.cookieSecret = 'myblogbyyds';
  settings.db = isDev ? 'myblog' : 'dVaYeHzOatfiEYtMUZbP';
  settings.host = isDev ? 'localhost' : 'mongo.duapp.com';
  settings.port = isDev ? '27017' : '8908';
  settings.user = isDev ? 'YDS' : 'iGneBgGPE9viIkYXyofSNVGg';
  settings.pass = isDev ? '3300376' :'iA03AjqitekUv4HHcbytXVnYeiboOh6h';
  settings.options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    user: settings.user,
    pass: settings.pass
  };

module.exports = settings;
