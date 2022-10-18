/* 
    L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
    Ogni cella ha un numero progressivo, da 1 a 100.
    Ci saranno quindi 10 caselle per ognuna delle 10 righe.
    Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

/*                             HEADER                        */
// Creo l'header con il logo e il titolo
const headerTitle = document.querySelector(".logo");
headerTitle.innerHTML += 
                            `<img src="img/logo.png" alt="">
                            <h3>Campo Minato</h3>`;

// Aggiungo bottone play
const headerBtn = document.querySelector(".button");
headerBtn.innerHTML += `<button>Play</button>`;
headerBtn.addEventListener("click", reload);

/*                              MAIN                         */
// Creo array
const numbersArray = [];
const squareGrid = 100;
const generetorNumber = isDuoblet(squareGrid);

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


// FUNZIONI
// Creo funzione che genera i numeri da 1 a 100 
/**
 * Description
 * @param {number} min
 * @param {number} max
 * @returns {number} numero generato
 */
function generetedRndNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Creo funzione che evita i doppioni
/**
 * Description
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
// Creo elemento square da inserire nel DOM
/**
 * Description
 * @param {number} innerNumber
 * @returns {element} elemento square
 */
function createSquare (innerNumber) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = innerNumber;
    return square;
}

// Creo funzione che al click si colora di azzurro la cella e in console stampa il numero 
function toColorSquare () {
    const clickSquare = parseInt(this.textContent);
    this.classList.add("blue");
    console.log("il valore di questa cella è:", clickSquare);
}

// Creo funzione che al click su bottone header ricarica la griglia
function reload () {
    headerBtn = location.reload();
}


/*                             FOOTER                        */
const footerPara = document.querySelector(".made-by");
footerPara.innerHTML += `<p>Made whit &hearts; by <a href="">Boolean</a></p>`;