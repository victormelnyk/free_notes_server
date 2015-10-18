"use strict";
exports.Host = function(settings) {
  var
    self = this,

    express = require('express'),
    morgan = require('morgan'),
    //!!bodyParser = require('body-parser'),

    app = express();

  self.onGetNotes = null;
  self.onPutNote = null;
  self.onDeleteNote = null;

  init();
  return self;

  function init() {
    app.use(morgan('dev'));
    /*!!app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());*/
    app.listen(settings.port);

    app.get('/notes', function (req, res) {
      self.onGetNotes(req.query.tags, res);
    });

    app.put('/notes', function (req, res) {
      self.onPutNote(req.headers.tags, req.headers.id, req.headers.data, res);
    });

    app.delete('/notes', function (req, res) {
      self.onDeleteNote(req.headers.tags, req.headers.id, res);
    });
  }
}