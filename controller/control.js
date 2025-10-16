const express=require('express')
const router=express.Router()
const {quizquesopt,getquest,gettestname,usertestname,addingscore,addingai,getaitestname,userdbadding,
    userauth,Proctedroute,Userdetails
}=require('../routes/routes')

router.route('/signup').post(userdbadding)
router.route('/signin').post(userauth)
router.route('/userprofile/:email').get(Userdetails)
router.route('/auth').get(Proctedroute)
router.route('/').post(quizquesopt).get(getquest)
router.route('/quiztopic').get(gettestname)
router.route('/quiz/:testname').get(usertestname).post(addingscore)
router.route('/declaration').post(addingai)

module.exports=router