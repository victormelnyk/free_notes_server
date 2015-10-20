"use strict";
exports.handler = function(host, db) {

  host.onGetNotes = function(tags, res) {
    db.selectNotes(tags, function(notes) {
      res.json(notes);
    });
  }

  host.onPostNote = function(tags, data, res) {
    db.insertNote(tags, data, function(note) {
      res.json(note);
    });
  }

  host.onPutNote = function(tags, id, data, res) {
    db.updateNote(tags, id, data, function(note) {
      res.json(note);
    });
  }

  host.onDeleteNote = function(tags, id, res) {
    db.deleteNote(tags, id, function(result) {
      res.json(result);
    });
  }
}