"use strict";
exports.Host = function(settings) {
  var
    self = this,

    fs = require('fs'),
    express = require('express'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    accessLogStream = fs.createWriteStream('./access.log', {flags: 'a'}),

    app = express();

  self.onGetNotes = null;
  self.onPostNote = null;
  self.onPutNote = null;
  self.onDeleteNote = null;

  init();
  return self;

  function init() {
    app.use(cors());
    app.use(morgan(/*!!'dev'*/'combined', {stream: accessLogStream}));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.listen(settings.port);

    app.get('/tags/:tags/notes', function (req, res) {
      self.onGetNotes(req.params.tags, res);
    });

    app.post('/tags/:tags/notes', function (req, res) {
      self.onPostNote(req.params.tags, req.body.data, res);
    });

    app.put('/tags/:tags/notes/:id', function (req, res) {
      self.onPutNote(req.params.tags, req.params.id, req.body.data, res);
    });

    app.delete('/tags/:tags/notes/:id', function (req, res) {
      self.onDeleteNote(req.params.tags, req.params.id, res);
    });
  }
}