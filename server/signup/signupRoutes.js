var server = require('../server.js');

module.exports = function(app) {

  // app.param('code', topicController.findTopic);

  app.route('/')
    .get(function(req, res) {
      console.log('signup / GET req.body ', req.body);
      res.send('signup / GET');
    })
    .post(function(req, res) {
      console.log('signup / POST req.body ', req.body);
      res.send('signup / POST');
    });

  // app.put('/:code', topicController.updateTopic);

};