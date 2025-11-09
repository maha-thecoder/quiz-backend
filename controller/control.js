const express=require('express')
const router=express.Router()
const {quizquesopt,getquest,gettestname,usertestname,addingscore,addingai,getaitestname,userdbadding,
    userauth,Proctedroute,Userdetails,updatenumberofattempt,userattemptbio,getUserBioAttempt
}=require('../routes/routes')

const {tokengenerator}=require('../apis/huggingface')

router.route('/signup').post(userdbadding)
router.route('/signin').post(userauth)
router.route('/userprofile/:email').get(Userdetails)
router.route('/addattempt/:email/:testname').patch(updatenumberofattempt)
router.route('/auth').get(Proctedroute)
router.route('/').post(quizquesopt).get(getquest)
router.route('/tokenapi').post(tokengenerator)
router.route('/quiztopic').get(gettestname)
router.route('/quiz/:testname').get(usertestname).post(addingscore)
router.route('/declaration').post(addingai)
router.route('/userbioattempt/:userId').post(userattemptbio).get(getUserBioAttempt)

module.exports=router