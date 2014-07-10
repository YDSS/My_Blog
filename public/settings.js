//env 'development' or 'production'
var isDev = true;
module.exports = {
  cookieSecret: 'myblogbyyds',
  db: isDev ? 'myblog' : 'dVaYeHzOatfiEYtMUZbP',
  host: isDev ? 'localhost' : 'mongo.duapp.com',
  port: isDev ? '27017' : '8908',
  user: isDev ? 'YDS' : 'iGneBgGPE9viIkYXyofSNVGg',
  pass: isDev ? '3300376' :'iA03AjqitekUv4HHcbytXVnYeiboOh6h'
}
