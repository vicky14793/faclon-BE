const express = require("express");
const router = express.Router();


router.get('/:id', (req, res, next)=>{
  console.log("api hitting")
  console.log(req.params.id)
  var primearr = []
   for(let i=2; i<=req.params.id; i++)
   {
     var primenumber = true;
      for(let j=2; j<=i; j++){
        if(i%j===0 && j!==i){
          primenumber = false
        }
      }
      if(primenumber === true){
        primearr.push(i)
      }
   }
    return res.status(200).send(primearr)
})

module.exports = router;
