var conteudo = document.getElementById("botao-iniciar");
var contador = 0;

var vitoriaJogador1 = 0;
var vitoriaJogador2 = 0;
var vencedorRodada1 = document.getElementById("vencedor-rodada1");
var vencedorRodada2 = document.getElementById("vencedor-rodada2");
var vencedorGeral = document.getElementById("vencedor");
var contadorRodada = 0;

localStorage.setItem("turn","X");
localStorage.setItem("game","---------");

// conteudo.addEventListener('click',() =>{
    
//     if(conteudo.innerText === 'Jogar Novamente'){
       
//         alert("Teste");
//         contador = 0;
//     }   
// })
function comecar(){
    conteudo.innerHTML = "Começou!!";
    resetGame();
    contadorRodada ++;
    const players = player();
    const handleDisabledPlayers = (player) =>{
        player.component.disabled = true;
    }
    players.forEach(handleDisabledPlayers);
        
}

// capturar nome dos jogadores
function player(){
    let jogadores = document.getElementsByClassName("input-jogador");

    let jogador1 = jogadores[0];
    let jogador2 = jogadores[1];

    const formatedPlayers = [
        {
            name:jogador1.value,
            component: jogador1
        },
        {
            name:jogador2.value,
            component: jogador2
        }
    ]
    return formatedPlayers
}

//registrar a casa jogada
function jogada(id){
    //começo após clicar o botão
    if(conteudo.innerHTML == "Começou!!"){

        var casa = document.getElementById(id);
        var turn = localStorage.getItem("turn");
        let vez = turn;

        if(!casa.innerHTML){
            casa.innerHTML = turn;
            handleWinner();
            
            if(turn =="X"){
            localStorage.setItem("turn","O");
            }
            else localStorage.setItem("turn", "X");

            if(vez == "X")
            document.getElementById("turno").innerHTML = "Vez do O";
            else document.getElementById("turno").innerHTML = "Vez do X";
            
            contador++;
        }
        if(vitoriaJogador1 >=2){
            alert("O jogador: " + player()[0].name + " é o vencedor!!!")
            document.location.reload();
        }
        if(vitoriaJogador2 >=2){
            alert("O jogador: " + player()[1].name + " é o vencedor!!!")
            document.location.reload();
        }
    }
}

function handleWinner(){
    const casa = document.querySelectorAll(".tabuleiro-jogada");

    console.log(contador);
    
    let player1Steps = [];
    let player2Steps = [];

    let player1NotWinner = false;
    let player2NotWinner = false;

    casa.forEach((item, index) => {
        if(item.textContent === "X"){
            player1Steps.push(index);
        }

        if(item.textContent === "O"){
            player2Steps.push(index);
        }
    });

    console.log(player1Steps);
    
    if(player1Steps.includes(0) && player1Steps.includes(1) && player1Steps.includes(2)
        || player1Steps.includes(0) && player1Steps.includes(4) && player1Steps.includes(8)
        || player1Steps.includes(0) && player1Steps.includes(3) && player1Steps.includes(6)
        || player1Steps.includes(1) && player1Steps.includes(4) && player1Steps.includes(7)
        || player1Steps.includes(2) && player1Steps.includes(5) && player1Steps.includes(8)
        || player1Steps.includes(2) && player1Steps.includes(4) && player1Steps.includes(6)
        || player1Steps.includes(3) && player1Steps.includes(4) && player1Steps.includes(5)
        || player1Steps.includes(6) && player1Steps.includes(7) && player1Steps.includes(8)){
            vitoriaJogador1 ++;

            if(contadorRodada === 1){
                vencedorRodada1.innerHTML = "Vencedor da rodada " + player()[0].name
            }
            if(contadorRodada === 2){
                vencedorRodada2.innerHTML = "Vencedor da rodada " + player()[0].name
            }
            if(contadorRodada === 3 && vitoriaJogador1 > vitoriaJogador2){
                vencedorGeral.innerHTML = "Vencedor:  " + player()[0].name
            }


            console.log("Jogador 1 Venceu");
            conteudo.innerHTML = "Jogar Novamente";
            return;
    } else{
         player1NotWinner = true;
    }

    if(player2Steps.includes(0) && player2Steps.includes(1) && player2Steps.includes(2)
        || player2Steps.includes(0) && player2Steps.includes(4) && player2Steps.includes(8)
        || player2Steps.includes(0) && player2Steps.includes(3) && player2Steps.includes(6)
        || player2Steps.includes(1) && player2Steps.includes(4) && player2Steps.includes(7)
        || player2Steps.includes(2) && player2Steps.includes(5) && player2Steps.includes(8)
        || player2Steps.includes(2) && player2Steps.includes(4) && player2Steps.includes(6)
        || player2Steps.includes(3) && player2Steps.includes(4) && player2Steps.includes(5)
        || player2Steps.includes(6) && player2Steps.includes(7) && player2Steps.includes(8)){
            
            vitoriaJogador2 ++;

        if(contadorRodada === 1){
            vencedorRodada1.innerHTML = "Vencedor da rodada " + player()[1].name
        }
        if(contadorRodada === 2){
            vencedorRodada2.innerHTML = "Vencedor da rodada " + player()[1].name
        }
        if(contadorRodada === 3 && vitoriaJogador2 > vitoriaJogador1){
            vencedorGeral.innerHTML = "Vencedor:  " + player()[1].name
        }

        console.log("Jogador 2 Venceu");
        conteudo.innerHTML = "Jogar Novamente";
            return;   

    } else{
        player2NotWinner = true;
    }

    if(player1NotWinner && player2NotWinner && contador>=8){
        alert("EMPATE")
        conteudo.innerHTML = "Jogar Novamente";
    }

}

function resetGame(){
    const casa = document.querySelectorAll(".tabuleiro-jogada");
    contador = 0;

    if(contadorRodada === 3){
        contadorRodada = 1;
    }

    casa.forEach((item) => {
       item.textContent = "";
    });
}