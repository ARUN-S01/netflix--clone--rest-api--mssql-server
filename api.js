var Db  = require('./dboperations');
var Order = require('./movie');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/movies').get((request,response)=>{

    dboperations.getMovies().then(result => {
       response.json(result[0]);
    })

})

router.route('/movies/:id').get((request,response)=>{

    dboperations.getMovie(request.params.id).then(result => {
       response.json(result);
    })

})

router.route('/movies/:id/:year').get((request,response)=>{
   dboperations.getMovieYear(request.params.id,request.params.year).then(result =>{
      response.json(result);
   })
})

router.route('/moviedisplay').get((request,response)=>{

   dboperations.getSelectMovies().then(result => {
      response.json(result);
   })

})

router.route('/moviedisplay/desc').get((request,response)=>{

   dboperations.getSelectMoviesDesc().then(result => {
      response.json(result);
   })

})

router.route('/users/:email/:pass').get((request,response)=>{
   dboperations.getLogin(request.params.email,request.params.pass).then(result =>{
      response.json(result);
   })
})

router.route('/users/:uid/:name/:userid/:email/:subscriptionstatus/:address/:phonenum/:creditcardno/:payment_id/:pass').get((request,response)=>{
   dboperations.signUpUser(request.params.uid,request.params.name,request.params.userid,request.params.email,request.params.subscriptionstatus,request.params.address,request.params.phonenum,request.params.creditcardno,request.params.payment_id,request.params.pass).then(result =>{
      response.json(result);
   })
})


router.route('/getuser/:email/:pass').get((request,response)=>{
   dboperations.getUser(request.params.email,request.params.pass).then(result =>{
      response.json(result);
   })
})

router.route('/update/:uid/:email/:name/:num/:add/:credit').get((request,response)=>{
   dboperations.updateUser(request.params.uid,request.params.email,request.params.name,request.params.add,request.params.credit).then(result =>{
      response.json(result);
   })
})

router.route('/delete/:uid').get((request,response)=>{
   dboperations.deleteUser(request.params.uid).then(result =>{
      response.json(result);
   })
})



// router.route('/orders').post((request,response)=>{

//     let order = {...request.body}

//     dboperations.addOrder(order).then(result => {
//        response.status(201).json(result);
//     })

// })




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);



