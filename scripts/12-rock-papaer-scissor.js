let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    Tie: 0
};

updateScoreElement();

if (!score) {
    score = {
        wins: 0,
        losses: 0,
        Tie: 0
    }
}

 let isAutoPlaying = false ;
 let intervalId ;

function autoPlay(){

    if(!isAutoPlaying){
        intervalId = setInterval(function (){
            const PlayerMove = pickComputerMove();
            playGame(PlayerMove);
        },1000)

        isAutoPlaying = true ;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false ;
    }
    
}

function playGame(PlayerMove) {

    const computermove = pickComputerMove();
    let move = '';

    if (PlayerMove === 'scissors') {
        if (computermove === 'scissors') {
            move = 'Tie !'
        } else if (computermove === 'paper') {
            move = 'you win';
        } else if (computermove === 'rock') {
            move = 'you lose';
        }

    } else if (PlayerMove === 'paper') {
        if (computermove === 'paper') {
            move = 'Tie !'
        } else if (computermove === 'rock') {
            move = 'you win';
        } else if (computermove === 'scissors') {
            move = 'you lose';
        }
    } else if (PlayerMove === 'rock') {
        if (computermove === 'rock') {
            move = 'Tie !'
        } else if (computermove === 'scissors') {
            move = 'you win';
        } else if (computermove === 'paper') {
            move = 'you lose';
        }
    }

    if (move === 'you win') {
        score.wins += 1;
    } else if (move === 'you lose') {
        score.losses += 1;
    } else if (move === 'Tie !') {
        score.Tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();
    document.querySelector('.js-result')
        .innerHTML = move ;

    document.querySelector('.js-move')
        .innerHTML= `YOU
<img src="/images/${PlayerMove}-emoji.png" class="move-icon">
<img src="/images/${computermove}-emoji.png" class="move-icon"> COMPUTER`;
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `wins=${score.wins}, losses=${score.losses}, Tie=${score.Tie}`;
}

function pickComputerMove() {
    const randnumber = Math.random();
    let computermove = '';
    if (randnumber >= 0 && randnumber < 1 / 3) {
        computermove = 'rock';
    } else if (randnumber >= 1 / 3 && randnumber < 2 / 3) {
        computermove = 'paper';
    } else if (randnumber >= 2 / 3 && randnumber < 1) {
        computermove = 'scissors';
    }
    return computermove;
}