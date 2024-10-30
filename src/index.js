//Character of the race
const playerOptions = {
    Mario:{
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
    },
    Luigi:{
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
    Peach:{
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0,
    },
    Yoshi:{
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0,
    },
    Bowser:{
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
    DK:{
        NOME: "Donkey Kong",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
}

async function rollDice6(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";            
            break;
            
        case random < 0.66:
            result = "CURVA";            
            break;
    
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block}: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    //Game Loop
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // Get Block
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)
        // Roll Dices
        let diceResult1 = await rollDice6();
        let diceResult2 = await rollDice6();
    
        //skill test
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
    
        if(block == "RETA"){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE; 
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE; 
    
            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }
    
        if(block == "CURVA"){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE; 
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE; 
    
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    
        }
    
        if(block == "CONFRONTO"){
            let powerResult1 = diceResult1 + character1.PODER; 
            let powerResult2 = diceResult2 + character2.PODER; 
    
            console.log(`${character1.NOME} confrontou com ${character2.NOME}`);
            
            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if(powerResult1 < powerResult2){
                if( character1.PONTOS > 0){
                    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
                    character1.PONTOS--;
                }else{
                    console.log(`${character2.NOME} ganhou! porém ${character1.NOME} continua com 0 pontos`);
                }
                
            }
            if(powerResult1 > powerResult2){
                if( character2.PONTOS > 0){
                    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
                    character2.PONTOS--;
                }else{
                    console.log(`${character1.NOME} ganhou! porém ${character2.NOME} continua com 0 pontos`);
                }
            }
            console.log(powerResult1 === powerResult2 ? "Confronto empatado, nenhum ponto perdido!" : "");
        }

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if(totalTestSkill1 < totalTestSkill2){
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        }

        console.log("-----------------------");

    }
    declareWinner(character1, character2)
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);
    
    if(character1.PONTOS > character2.PONTOS){
        console.log(`${character1.NOME} ganhou a corrida! Parabéns!! 🏆🏆`);
    }else if(character1.PONTOS < character2.PONTOS){
        console.log(`${character2.NOME} ganhou a corrida! Parabéns!! 🏆🏆`);
    }else{
        console.log(`A corrida foi um empate!`);
    }
    
}

async function writeCharacter() {
    console.log(`Lista de personagens para escolher: `);
    console.log(`
    Option 1: ${playerOptions.Mario.NOME}
    Velocidade: ${playerOptions.Mario.VELOCIDADE}
    Manobrabilidade: ${playerOptions.Mario.MANOBRABILIDADE}
    Poder: ${playerOptions.Mario.PODER}`);

    console.log(`
    Option 2: ${playerOptions.Peach.NOME}
    Velocidade: ${playerOptions.Peach.VELOCIDADE}
    Manobrabilidade: ${playerOptions.Peach.MANOBRABILIDADE}
    Poder: ${playerOptions.Peach.PODER}`);

    console.log(`
    Option 3: ${playerOptions.Yoshi.NOME}
    Velocidade: ${playerOptions.Yoshi.VELOCIDADE}
    Manobrabilidade: ${playerOptions.Yoshi.MANOBRABILIDADE}
    Poder: ${playerOptions.Yoshi.PODER}`);

    console.log(`
    Option 4:${playerOptions.Bowser.NOME}
    Velocidade: ${playerOptions.Bowser.VELOCIDADE}
    Manobrabilidade: ${playerOptions.Bowser.MANOBRABILIDADE}
    Poder: ${playerOptions.Bowser.PODER}`);

    console.log(`
    Option 5: ${playerOptions.Luigi.NOME}
    Velocidade: ${playerOptions.Luigi.VELOCIDADE}
    Manobrabilidade: ${playerOptions.Luigi.MANOBRABILIDADE}
    Poder: ${playerOptions.Luigi.PODER}`);

    console.log(`
    Option 6: ${playerOptions.DK.NOME}
    Velocidade: ${playerOptions.DK.VELOCIDADE}
    Manobrabilidade: ${playerOptions.DK.MANOBRABILIDADE}
    Poder: ${playerOptions.DK.PODER}\n`);
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function getNumberSelected(query){
    return new Promise(resolve => rl.question(query, resolve));
}

async function selectCharacter(option) {

    let answer = await getNumberSelected("Selecione seu personagem!! Opções de 1 a 6!\n");
    const num = parseInt(answer);
    switch (num) {
        case 1:
            return playerOptions.Mario;
            break;
        case 2:
            return playerOptions.Peach;
            break;
        case 3:
            return playerOptions.Yoshi;
            break;
        case 4:
            return playerOptions.Bowser;
            break;
        case 5:
            return playerOptions.Luigi;
            break;
        case 6:
            return playerOptions.DK;
            break;
        default:
            console.log("Selecione um numero de 1 a 6 !!!");
            break;
    } 
}

(async function main() {
    await writeCharacter();
    let player1 = await selectCharacter();
    let player2 = await selectCharacter();
    
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} ... \n`
    );
    
    await playRaceEngine(player1, player2);
    rl.close();

})();
