var
  settings = new require('./modules/settings.js').settings,
  db = new require('./modules/db.js').Db(settings),
  host = new require('./modules/host.js').Host(settings);

require('./modules/handler.js').handler(host, db);

console.log('Started');