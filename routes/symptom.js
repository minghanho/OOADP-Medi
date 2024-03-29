const symptom = require('../models/Symptom');
const express = require('express');
const router = express.Router();

router.get('/symptom', (req, res) => {
    symptom.findAll({
        })
        .then((result)=>{
            res.render('./templates/symptom',{
                result,
                userinfo:req.user,
            });
    })
});


router.post('/symptomInsert', (req, res) => {
    if (req.user.userLevel == "Healthcare Admin"){
        let question = req.body.symptomquestioninsert;
    console.log(question)
    symptom.create({
        question,
    })
    .then(symptom => {
        console.log(symptom);
        res.redirect('/symptom/symptomInsert');
    })
    .catch(err => console.log(err))
    }
    else{
        res.redirect('/')
    }
});

router.get('/symptomInsert', (req, res) => {
    if (req.user.userLevel == "Healthcare Admin"){
        symptom.findAll({
        })
        .then((result)=>{
            console.log(symptom);
            res.render('./templates/symptomInsert',{
                userinfo: req.user,
                result
            });
        })
        .catch(err => console.log(err))
    }
    else{
        res.redirect('/')
    }
});

router.post('/symptomDestroy/:symptom_id', (req, res) => {
    symptom.destroy({
        where: {
            id: req.params.symptom_id
        }
    })
    res.redirect('/symptom/symptomInsert')
});

router.get('/symptomInserttemp', (req, res) => {
    symptom.create({
        Symptom,
        Symptom_Description,
        List,
        result_symptom,
        result_text,
        result_recommend,
        SymptomTempList,
    });
    res.render('./templates/symptomanswers');
});

router.get('/symptomDelete', (req, res) => {
    symptom.findAll({
    }).then(result =>{
        symptom.destroy
    }).then(result =>{
        res.render('./templates/symptomInsert')
    })
});

router.get('/symptomEditing', (req, res) => {
    symptom.findAll({
    }).then(result =>{
        res.redirect('/symptom/symptomEdit')
    })
});

router.get('/symptomEdit', (req, res) => {
    symptom.findAll({
    })
    symptom.update({
        question: req.body.symptomquestionedit
    },
    {
        where: {
            id: req.params.id
        }
    }).then(result =>{
        alertMessage(res, 'success', 'fa fa-check', true);
        res.redirect('/symptom/symptomInsert')
    })
});

router.get('/symptomRecording', (req, res) => {
    symptom.findAll({
    }).then((result)=>{
        if (result[1].SymptomTempList == "") {
            questionResult = result[1].question
            res.render('./templates/symptomRecording',{
                questionResult
            })
        } else if (result[1].SymptomTempList != null) {
            let questionNumber = result[1].SymptomTempList.length
            questionResult = result[questionNumber].question
            res.render('./templates/symptomRecording',{
                questionResult,
                userinfo: req.user
            })
        } else {
            for (i = 1; i ;i++) {
                if (result[i].List == result[1].SymptomTempList) {

                }
            }
        }
    })

});

// router.post('/symptom', (req, res) => {
//     let 
// })

module.exports = router;