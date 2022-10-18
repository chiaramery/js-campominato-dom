/* 
    [*] Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco.
    [] Il computer deve generare 16 numeri casuali: le bombe.
    [] I numeri nella lista delle bombe non possono essere duplicati.
    [] In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati, la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    [] La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
    [] Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
*/

/*                             HEADER                        */
// Creo l'header con il logo e il titolo
const headerTitle = document.querySelector(".logo");
headerTitle.innerHTML +=   `<img src="img/logo.png" alt="">
                            <h3>Campo Minato</h3>`;

// Aggiungo bottone play
const headerBtn = document.querySelector(".button");
headerBtn.innerHTML += `<button>Play</button>`;
headerBtn.addEventListener("click", reload);

/*                              MAIN                         */
// Creo array di numeri da 1 a 100
const numbersArray = [];
const squareGrid = 100;
const generetorNumber = isDuoblet(squareGrid);

// Creo array di bombe (16 numeri casuali da 1 a 100)
const arrayBombs = [];

// Ordino i numeri in modo crescente
for (let i = 0; i < numbersArray.length; i++) {
    const target = numbersArray[i];
    let min = target;
    let minI = i;

    for (let j = i + 1; j < numbersArray.length; j++ ) {
        const other = numbersArray[j];

        if (other < min ) {
            minI = j;
            min = other;
        }
    }

    let tmp = target;
    numbersArray[i] = numbersArray[minI];
    numbersArray[minI] = tmp;
}

// Ogni numero lo inserisco in una casella e lo metto in griglia
const grid = document.querySelector(".grid");
for(let i = 0; i < generetorNumber.length; i++) {
    const thisNumber = generetorNumber[i];
    // Creo elemento 
    const thisSquare = createSquare(thisNumber);
    // Aggiungo addEventListener al click sull'elemento
    thisSquare.addEventListener("click", toColorSquare);

    // Elemento aggiunto nel DOM
    grid.append(thisSquare);
}


/*                            FUNZIONI                      */

/**
 * Description funzione che genera i numeri da 1 a 100 
 * @param {number} min
 * @param {number} max
 * @returns {number} numero generato
 */
function generetedRndNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Description funzione che evita i doppioni
 * @param {number} arrayLenght
 * @returns {array}
 */
function isDuoblet (arrayLenght) {
    while(numbersArray.length < arrayLenght) {
        const rndNumber = generetedRndNumber (1, 100);
        if(!numbersArray.includes(rndNumber)) {
            numbersArray.push(rndNumber);
        }
    }
    return numbersArray;
}

/**
 * Description creo elemento square da inserire nel DOM
 * @param {number} innerNumber
 * @returns {element} elemento square
 */
function createSquare (innerNumber) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = innerNumber;
    return square;
}

/**
 * Description funzione che al click si colora di azzurro la cella e in console stampa il numero 
 * @returns {number} valore all'interno della cella selezionata al click
 */
function toColorSquare () {
    const clickSquare = parseInt(this.textContent);
    this.classList.add("blue");
    console.log("il valore di questa cella è:", clickSquare);
}


/**
 * Description funzione che al click su bottone header ricarica la griglia
 * @returns {reload} reload della griglia di gioco
 */
function reload () {
    headerBtn = location.reload();
    
}




/*                             FOOTER                        */
const footerPara = document.querySelector(".made-by");
footerPara.innerHTML += `<p>Made whit &hearts; by <a href="">Boolean</a></p>`;