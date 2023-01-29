const cells = document.querySelectorAll('.cell');
const gameStatus=document.querySelector('#gameStatus');


const winPatternes=[
// coordonnées gagnante à partir des différentes cellules.

// en ligne
    [0,1,2],
    [3,4,5],
    [6,7,8],
// en diagonale
    [0,4,8],
    [2,4,6],
// en vertical
    [0,3,6],
    [1,4,7],
    [2,5,8],

];

const endGameStatus=document.querySelector('#endGameStatus');
const gameEnd=document.querySelector('#gameEnd');
let rePlay=document.querySelector('#reloadGame')

const playerOne='X';
const playerTwo='O';

let playerTurn=playerOne;

function playGame(e) {
    e.target.innerHTML=playerTurn;


    if (whoIsTheWinner(playerTurn)) {
        updateGameStatus("win"+playerTurn);
        return endGame();
    } else if (equality()) {
        updateGameStatus("draw");
        return endGame();
    };

    updateGameStatus(playerTurn);
    if (playerTurn==playerOne) {
        return playerTurn=playerTwo
    } else {
        return playerTurn=playerOne
    }
}

function updateGameStatus(status){
    let statusText; 

    switch (status) {
        case 'X':
            statusText="Au tour du joueur O";
            break;
        case 'O':
            statusText="Au tour du joueur X";
            break;
        case 'winX':
            statusText="Vainqueur player X";
            break;
        case 'winO':
            statusText="Vainqueur player O";
            break;
        case 'draw':
            statusText="Ex aequo";
            break;  
        
    }

    gameStatus.innerHTML=statusText;

    endGameStatus.innerHTML=statusText;

}

cells.forEach(cell => {
    cell.addEventListener('click',playGame, {once:true});
    /*{once:true} permet de faire uniquement un seul clic par cellule.
     Bloque le nombre de clic par cellule à 1*/ 
});

function whoIsTheWinner(playerTurn) {
// La méthode every() permet de tester si tous les éléments d'un tableau vérifient une condition donnée par une fonction en argument. 
// Cette méthode renvoie un booléen pour le résultat du test.

// La méthode some() teste si au moins un élément du tableau passe le test implémenté par la fonction fournie. Elle renvoie un booléen indiquant le résultat du test.

return winPatternes.some(combination=>{
    return combination.every(index=>{
        return cells[index].innerHTML==playerTurn;
        });
    });
}

function equality() {
// every ne marche pas en utilisant cells car il s'agit d'une liste. En décomposant les valeur contenu dans un tableau comme ci-dessous on peut l'utiliser.
    return [...cells].every(cell=>{
        return cell.innerHTML==playerOne || cell.innerHTML==playerTwo;
    });
}

function endGame() {
    
    return gameEnd.style.display="flex" ; 
}

// bouton rejouer on fait juste un refresh de la page.
rePlay.addEventListener('click',()=>{
        window.location.reload()
});


