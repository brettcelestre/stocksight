var server = require('../server.js');

module.exports = function(app) {

  // app.param('code', topicController.findTopic);

  app.route('/')
    .get(function(req, res) {
      console.log('funds / GET req.body ', req.body);
      res.send('funds / GET');
    })
    .post(function(req, res) {
      console.log('funds / POST req.body ', req.body);
      res.send('funds / POST');
    });

  // app.put('/:code', topicController.updateTopic);

};