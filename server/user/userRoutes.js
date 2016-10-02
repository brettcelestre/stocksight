
// User routes
module.exports = function(app) {

  app.route('/')
    .get(function(req, res) {
      console.log('user / GET req.body ', req.body);
      res.send('user / GET');
    })
    .post(function(req, res) {
      console.log('user / POST req.body ', req.body);
      res.send('user / POST');
    });


};