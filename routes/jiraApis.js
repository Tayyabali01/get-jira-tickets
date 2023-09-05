let express = require('express');
var router = express.Router();
var axios = require('axios');
var dotenv = require('dotenv').config()

/* GET users listing. */
router.get('/jira/get-all-tickets',async function(req, res, next) {
  // This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
let inc=0
let data=[];
let killLoop=false;
while(1){

  const result=await axios.get(process.env.API_URL, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
      process.env.TOKEN
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log(response.data,"--------hello wolrd-----")
      console.log(
        `Response: ${response.status} ${response}`
      );
  data.push([...response.data.issues]) 
  if((response.data.total-100)>inc){
    inc+=100
  }else{killLoop=true }  
 })
    .catch(err => console.error(err));
if(killLoop){
  break;
}
}

  res.send(data);
});

module.exports = router;
