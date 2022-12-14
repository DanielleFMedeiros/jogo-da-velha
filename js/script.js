var interval = null;

$(document).ready(function(){

    //validação do preenchimento
    $("#btn_comecar").click(function(){

        var jog1 = $("input[name=jogador1]").val();
        var jog2 = $("input[name=jogador2]").val();

        if( jog1.trim().length > 0 && 
        jog2.trim().length > 0){

            //comerçar o jogo
            $(".msg").text("");
            ComecarJogo();

        }else{
            $(".msg").text("Nome(s) não preenchido");
        }
    });
});

function ComecarJogo(){
    var contadorClicks = 0;

    interval = setInterval(TempoDecorrido, 500);

    $("table td").click(function(){
        contadorClicks++;

        if( contadorClicks <= 9){

            if( contadorClicks % 2 == 0){
            //Par
            $(this).text("O"); 

            }else{
                //Impar
                $(this).text("X");      
            }

            if( VerificarGanhador() == true ){
                contadorClicks = 9;
            };

            if (contadorClicks == 9 ){
                $(".msg").append("<br/> Jogo encerrado");
                clearInterval(interval);
            }

        }

    });
}

function VerificarGanhador(){
    var vencedor = [

        //linhas
        [0, 1 ,2],
        [3, 4, 5],
        [6, 7, 8],
        //colunas
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //diagonais
        [0, 4, 8],
        [6, 4, 2],
    ];

    var X = new Array(9);
    var O = new Array(9);
    $("table td").each(function(key, value){
        if ( $(this).text() == "X" ){
            X[key] = key;

        }
        if ( $(this).text() == "O" ){
            O[key] = key;
            
        }
    });
    return DefinirGanhador(X, O, vencedor);

}

function DefinirGanhador(X, O, vencedor){
    //PERCORRE AS LINHAS.
    for(var i = 0; i < vencedor.length; i++ ){
        contadorX = 0;
        contadorO = 0;

        //PERCORRE AS COLUNAS DE UMA LINHA
        for(var y = 0; y < vencedor[i].length;
            y++){
            if( X[vencedor[i][y]] == vencedor[i][y]){
                contadorX++;
            }

            if( O[vencedor[i][y]] == vencedor[i][y]){
                contadorO++;
            }
            vencedor[i][y] 
        } 

        var jog1 = $("input[name=jogador1]").val();
        var jog2 = $("input[name=jogador2]").val();

        if(contadorX == 3){
            $(".msg").text("X - " + jog1 + "Ganhou");
            return true;
        }

        if(contadorO == 3){
            $(".msg").text("O - " + jog2 + "Ganhou");
            return true;
        }
    }

}

var inicioJogo = null;
function TempoDecorrido(){
    if(inicioJogo == null){
        inicioJogo = new Date();
    }
    var dataAtual = new Date();

    var segIni = inicioJogo.getSeconds();
    var segAtual = dataAtual.getSeconds();

    var minIni = inicioJogo.getMinutes();
    var minAtual = dataAtual.getMinutes();

    var horaIni = inicioJogo.getMinutes();
    var horaAtual = dataAtual.getMinutes();

    var timeIni = inicioJogo.getTime();
    var timeAtual = dataAtual.getTime();

    var timeDec = timeAtual - timeIni;

    var novaData = new Date(timeDec);
        
    $("#tempo").text("Início do Jogo: " + horaIni + ":" +  minIni + ";" + segIni + 
    " - Hora atual: " + horaAtual + ":" + minAtual + ":" + segAtual +
    " - Tempo Decorrido: " + novaData.getMinutes() + ":" + novaData.getSeconds()
    );
}