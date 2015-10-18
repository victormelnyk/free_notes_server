"use strict";
exports.Db = function(settings) {
  var
    self = this,
    pg = require('pg');

  self.deleteNote = deleteNote;
  self.insertNote = insertNote;
  self.selectNotes = selectNotes;
  self.updateNote = updateNote;

  return self;

  function dbQuery(sql, callback, params) {
    //!!console.time('dbQuery');//!!
    pg.connect(settings.connectionString, function(error, client, done) {
      if (error) {
        return console.error('Error fetching client from pool', error);
      }

      client.query(sql, params || [], function(error, result) {
        done();
        //!!console.timeEnd('dbQuery');//!!
        if (error) {
          return console.error('Error running query ' + sql, error);
        }
        callback(result);
      });
    });
  }

  function deleteNote(tags, id, callback) {
    dbQuery(
      'SELECT fn.fn_note_d($1, $2) AS result', function(result) {
        callback(result.rows.length ? result.rows[0]['result'] : false);
      }, [tags, id]
    );
  }

  function insertNote(tags, data, callback) {
    dbQuery(
      'SELECT N.id, N.data, N.date ' +
      'FROM fn.fn_note_i($1, $2) N', function(result) {
        callback(result.rows.length ? result.rows[0] : false);
      }, [tags, data]
    );
  }

  function selectNotes(tags, callback) {
    dbQuery(
      'SELECT N.id, N.data, N.date ' +
      'FROM fn.fn_notes_get($1) N', function(result) {
        callback(result.rows);
      }, [tags]
    );
  }

  function updateNote(tags, id, data, callback) {
    dbQuery(
      'SELECT N.id, N.rdata AS data, N.date ' +
      'FROM fn.fn_note_u($1, $2, $3) N', function(result) {
        callback(result.rows.length ? result.rows[0] : false);
      }, [tags, id, data]
    );
  }
}