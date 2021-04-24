var express = require('express');
var router = express.Router();
const client = require('superagent');

router.use(async (resp, req, next) => {
  try {
    const res = await client.post('https://developer.api.autodesk.com/authentication/v1/authenticate')
    .set({
      'content-type': 'application/x-www-form-urlencoded'
    })
    // .query({ client_id: process.env.CLIENT_ID })
    // .query({ client_secret: process.env.API_SECRET })
    // .query({ grant_type: 'client_credentials' })
    // .query({ scope: 'data:read' })
      .send({ 
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.API_SECRET,
        grant_type: 'client_credentials',
        scope: 'data:read'
      })

      //console.log({ res: res.body })
      req.access_token = res.body.access_token
  } catch(err) {
    console.log(err.response);
  }

  next()
})
/* GET home page. */
router.get('/test', (req, res, next) => {
  console.log(res.access_token)
  res.send(res.access_token);
  
})





router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
