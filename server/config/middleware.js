var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {
  
  //use express router mini-app
  var signupRouter = express.Router();
  var stockRouter = express.Router();
  var userRouter = express.Router();
  var authRouter = express.Router();
  var chartRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  // Parse JSON
  app.use(bodyParser.json());
  // Serves index
  app.use(express.static(__dirname + '/../../client'));

  app.use('/signup', signupRouter);
  app.use('/stock', stockRouter);
  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/chart', chartRouter);

  require('../signup/signupRoutes.js')(signupRouter);
  require('../stock/stockRoutes.js')(stockRouter);
  require('../user/userRoutes.js')(userRouter);
  require('../auth/authRoutes.js')(authRouter);
  require('../chart/chartRoutes.js')(chartRouter);
};