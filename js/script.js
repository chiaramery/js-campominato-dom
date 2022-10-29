/* 
    L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
    Ogni cella ha un numero progressivo, da 1 a 100.
    Ci saranno quindi 10 caselle per ognuna delle 10 righe.
    Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

const mainGrid = document.getElementById("grid");
const levelSelect = document.getElementById("level");
document.getElementById("play-button").addEventListener("click", startGame);

/**
 * Description: funzione principale 
**/
function startGame() {
  // game options
  const bombsNumber = 16;

  // Controllo il livello scelto
  const level = parseInt(levelSelect.value);
  let squaresNumber;
  let squaresInRow;
  switch (level) {
    //EASY
    case 1: 
        squaresNumber = 100;
        squaresInRow = 10;
        break;
    //HARD
    case 2: 
        squaresNumber = 81;
        squaresInRow = 9;
        break;
    //CRAZY
    case 3:
        squaresNumber = 49;
        squaresInRow = 7; 
  } 

  // Calcolo il numero delle celle non bombe
  let safeCells = squaresNumber - bombsNumber;
  console.log(safeCells);

  // Creare l'array di 16 bombe (numeri casuali non ripetuti)
  const bombsArray = generateRandomNumbersArray(bombsNumber, 1, squaresNumber);
  console.log(bombsArray);

  // Creare l'array delle celle non bombe cliccate, inizialmente vuoto
  const clickedCells = [];
  mainGrid.innerHTML = "";
  for (let i = 1; i <= squaresNumber; i++) {
    const newSquare = createSquare(i, squaresInRow);
    newSquare.addEventListener("click", handleSquareClick);
    mainGrid.append(newSquare);
  }

  mainGrid.classList.remove("hidden");

/*                            FUNZIONI SPECIFICHE PER IL GIOCO                            */
/**
 * Description: Funzione che gestisce il click sullo square
 */
function handleSquareClick() {
// [] leggo il numero della cella cliccata
const clickedNumber = parseInt(this.textContent);
//[] SE il numero è contenuto nell'array delle bombe 
if (bombsArray.includes(clickedNumber)){
// la cella diventa rossa
    this.classList.add("bomb");
// gioco finisce -> utente perde
    endGame("lose");
} else {
    // coloro di blu la cella
    this.classList.add("clicked");
    // SE non è già presente (se non è stato già cliccato) salvo il numero nell'array del punteggio
    if (!clickedCells.includes(clickedNumber)) {
    clickedCells.push(clickedNumber);
    }
    // SE lunghezza dell'array di celle cliccate è uguale al safeCells 
    if (clickedCells.length === safeCells) {
    //       il gioco finisce -> utente vince
    endGame("win");
    }
}
}

/**
 * Description: la funzione che gestisce fine del gioco
 * @param {stringa} winLose -> "win" se l'utente ha vinto, "lose" altrimenti
 */
function endGame(winLose) {
    // Celle non cliccabili dopo aver perso
    const allcells = document.getElementsByClassName("square");
    for (let i = 0; i < allcells.length; i++) {
      const thisCell = allcells[i];
      thisCell.removeEventListener("click", handleSquareClick);
    }
    // Se l'utente ha vinto
    if (winLose === "win") {
      // mostrare il mesaggio: "Hai vinto";
      alert("Hai vinto");
    } else {
      // mostrare tutte le bombe
      for (let i = 0; i < allcells.length; i++) {
        const thisCell = allcells[i];
        // prendo il numero della cella
        const thisCellNumber = parseInt(thisCell.textContent);
        // se il numero è contenuto nell'array delle bombe
        if (bombsArray.includes(thisCellNumber)) {
          // coloro la cella di rosso
          thisCell.classList.add("bomb");
        }
      }
      // mostro il messaggio: "Hai perso." e il numero di tentativi
      const lastResult = document.querySelector(".result");
      lastResult.innerHTML = `Hai perso dopo ${clickedCells.length} tentativi`;
    }
  }

}
/*                            FUNZIONI DI CREAZIONE/GENERAZIONE                  */
/**
 * Description: Funzione che crea un elemento html che rappresenta un quadrato della griglia
 * @param {number} innerNumber - numero da mostrare nel quadrato
 * @param {number} numberOfSquaresInRow - numero delle celle in una riga, che definisce le dimensioni di una cella
 * @returns {object} Elemento Html del quadrato
 */
function createSquare(innerNumber, numberOfSquaresInRow) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.innerHTML = `<span>${innerNumber}</span>`;
  return square;
}

/**
 * Description: La funzione che genera un array di data lunghezza con numeri random non dupplicati compresi nel rage dato
 * @param {number} totalNumbers -> la lunghezza dell'array
 * @param {number} min -> limite minimo per i numeri da generare
 * @param {number} max -> limite massimo per i numero da generare
 * @returns {Array} -> array di numeri random non dupplicati
 */
function generateRandomNumbersArray(totalNumbers, min, max) {
  // Finché l'array non ha la lnghezza uguale al totalNumbers
  const resultArray = [];
  while (resultArray.length < totalNumbers) {
    // Generare un numero random
    const rndNumber = getRndInteger(min, max);
    // SE non è presente nell'array
    if (!resultArray.includes(rndNumber)) {
      // pushare il numero nell'array
      resultArray.push(rndNumber);
    }
  }
  return resultArray;
}

/**
 * Description Genera un numero random in range tra min e max (inclusi)
 * @param {number} min
 * @param {number} max
 * @returns {number} un numero intero generato in modo random
 */
 function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}