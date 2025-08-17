const express=require('express')
const router=express.Router()
const {quizquesopt,getquest,gettestname,usertestname,addingscore,addingai,getaitestname}=require('../routes/routes')


router.route('/').post(quizquesopt).get(getquest)
router.route('/quiztopic').get(gettestname)
router.route('/quiz/:testname').get(usertestname).post(addingscore)
router.route('/declaration').post(addingai)

module.exports=router