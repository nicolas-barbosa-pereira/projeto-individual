var quizModel = require("../models/quizModel");


function cadastrarQuiz(req,res){
    var tema = req.body.temaServer;


     if (tema === undefined) {
        return res.status(400).send("Tema está undefined");
    }else{
        quizModel.cadastrarQuiz(tema)
        .then(
            function(resultado){
                res.json(resultado);
            }
        ).catch(
            function(erro){
                console.log(erro);
                console.log( "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage)
            }
        )
    }
}

function registrarPontuacao(req, res) {

    var idUsuario = req.body.idUsuario;
    var idQuiz = req.body.idQuiz;
    var pontos = req.body.pontos;
    var tentativas = req.body.tentativas;

    if (idUsuario === undefined || idQuiz === undefined || pontos === undefined || tentativas === undefined) {
        res.status(400).send("Dados necessários não fornecidos");
        return;
    }

    quizModel.attPontuacao(idQuiz, idUsuario, pontos, tentativas)
        .then(function (resultado) {
            res.send("pontuação registrada");
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro ao registrar pontuação");
        });
}



function obterRankingGeral(req,res) {

    quizModel.obterRankingGeral()
        .then(function (resultado) {
            res.send(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro ao obter ranking geral");
        });
}


function obterTentativas(req,res){
    let fkquiz = req.body.fkquiz;

    if (fkquiz === undefined) {
        res.status(400).send("Dados necessários não fornecidos");
        return;
    }

    quizModel.obterTentativas(fkquiz)
    .then(function(resultado){
        res.send(resultado);
    }).catch(function(erro){
        console.log(erro)
        res.status(500).send("Erro ao obter as tentivas")
    })


}

function obterRankingQuiz(req,res){
    let fkquiz= req.body.fkquiz;

    if(fkquiz === undefined){
        res.status(400).send("dados invalidos");
        return;
    }

    quizModel.obterRankingQuiz(fkquiz)
    .then(function(resultado){
        res.send(resultado)
    }).catch(function(erro){
        res.status(500).send("Erro ao obter ranking quiz")
    })

}


module.exports ={
    cadastrarQuiz,
    registrarPontuacao,
    obterRankingGeral,
    obterRankingQuiz,
    obterTentativas
}