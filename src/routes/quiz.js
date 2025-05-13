var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");


router.post("/quiz", function(req,res){
    quizController.cadastrarQuiz(req,res);
});

router.post("/pontuacao", function (req, res) {
    quizController.registrarPontuacao(req, res)
});

router.get("/ranking", function (req, res) {
    quizController.obterRankingGeral(req, res)
});


module.exports=router;