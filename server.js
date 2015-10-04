var pg = require('pg');
var connectionString = 'postgres://lt_admin:lt_admin@localhost/life_tool';

function dbQuery(sql, callback, params) {
  console.time('dbQuery');//!!
  pg.connect(connectionString, function(error, client, done) {
    if (error) {
      return console.error('Error fetching client from pool', error);
    }

    client.query(sql, params || [], function(error, result) {
      done();
      console.timeEnd('dbQuery');//!!
      if (error) {
        return console.error('Error running query ' + sql, error);
      }
      callback(result);
    });
  });
}

function selectNotes(tags, callback) {
  dbQuery(
    'SELECT N.id, N.data, N.date ' +
    'FROM fn.fn_notes_get($1) N', function(result) {
      callback(result.rows);
    }, [tags]
  );
}

function insertNote(tags, data, callback) {

}
//


selectNotes('tag1 tag2', function(notes) {
  console.log(notes)
});