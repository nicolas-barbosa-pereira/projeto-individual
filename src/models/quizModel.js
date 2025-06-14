var database = require("../database/config")


function cadastrarQuiz(tema){
    var instrucaoSql=`
    insert into quiz(tema)
    values('${tema}')
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function attPontuacao(fkquiz,fkusuario,pontos,tentativas){
    var instrucaoSql=`
    insert into pontuacao(fkquiz,fkusuario, pontos, tentativas)
    values('${fkquiz}', '${fkusuario}','${pontos}', '${tentativas}');
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterRankingQuiz(fkquiz){
    var instrucaoSql=`
        SELECT 
            u.nome,
            SUM(p.pontos) AS total_pontos,
            COUNT(p.idpontuacao) AS total_tentativas
        FROM pontuacao p
        INNER JOIN usuario u ON p.fkusuario = u.idusuario
        WHERE fkquiz = ${fkquiz}
        GROUP BY u.nome
        ORDER BY total_pontos DESC
        LIMIT 10;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterRankingGeral() {
    var instrucaoSql = `
        SELECT 
            u.nome,
            SUM(p.pontos) AS total_pontos,
            COUNT(p.idpontuacao) AS total_tentativas
        FROM pontuacao p
        INNER JOIN usuario u ON p.fkusuario = u.idusuario
        GROUP BY u.nome
        ORDER BY total_pontos DESC
        LIMIT 10;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function obterTentativas(idQuiz) {
    var instrucaoSql = `
        SELECT 
            u.nome,
            SUM(p.tentativas) AS totalTentativas
        FROM pontuacao p
        INNER JOIN usuario u ON p.fkusuario = u.idusuario
        WHERE p.fkquiz = ${idQuiz}
        GROUP BY u.nome;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarQuizzes() {
    const instrucaoSql = `
        SELECT idquiz AS id, tema FROM quiz;
    `;
    return database.executar(instrucaoSql);
}

function top1(){
    var instrucaoSql=`
   select sum(p.pontos),
    u.nome
    from usuario u
    inner join pontuacao p on p.fkusuario = u.idusuario
    group by nome
    limit 1;
    `
    return database.executar(instrucaoSql);
}


module.exports ={
    cadastrarQuiz,
    attPontuacao,
    obterRankingGeral,
    obterTentativas,
    obterRankingQuiz,
    listarQuizzes,
    top1
}