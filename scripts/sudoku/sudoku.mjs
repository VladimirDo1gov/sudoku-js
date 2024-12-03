import GenerateRandomArrValues from "./randomGenerate.mjs";
class Sudoku {
    constructor() {
        this.cells = document.querySelectorAll(".cell");
        this.buttonResult = document.querySelector(".btn-result");
        this.buttonNewGame = document.querySelector(".btn-new-game");
        this.generatorRandom = new GenerateRandomArrValues([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.hiddenCellsHashTable = {};
        this.randomValues = [];
        this.counterOfCorrectAnswers = 0;
    }
    makeRanomValues() {
        this.generatorRandom.blenderValues();
        this.randomValues = [...this.generatorRandom.getArr];
    }
    fillCellsRandomValues() {
        let i = 0;
        this.cells.forEach((cell) => {
            cell.value = this.randomValues[i++];
        });
    }
    hideAndSaveRandomCellsValue(n = 2) {
        while (Object.keys(this.hiddenCellsHashTable).length < n) {
            let randomIndex = this.generatorRandom.getRandomValue(0, this.randomValues.length - 1);
            if (!this.hiddenCellsHashTable[randomIndex]) {
                this.hiddenCellsHashTable[randomIndex] = this.cells[randomIndex].value;
                this.cells[randomIndex].value = "";
            }
        }
    }
    deleteDisabled() {
        Object.keys(this.hiddenCellsHashTable).forEach((index) => {
            this.cells[index].removeAttribute("disabled");
        });
    }
    addDisabled() {
        Object.keys(this.hiddenCellsHashTable).forEach((index) => {
            this.cells[index].setAttribute("disabled", "true");
        });
    }

    checkResult() {
        Object.keys(this.hiddenCellsHashTable).forEach((index) => {
            if (this.cells[index].value == this.hiddenCellsHashTable[index]) {
                this.addGreenBorder(index);
                this.counterOfCorrectAnswers++;
            } else {
                this.addRedBorder(index);
            }
        });
        return this.counterOfCorrectAnswers == 2 ? true : false;
    }

    addGreenBorder(index) {
        this.cells[index].classList.add("correct-answer-animation");
        setTimeout(() => {
            this.cells[index].classList.remove("correct-answer-animation");
        }, 500);
    }

    addRedBorder(index) {
        this.cells[index].classList.add("incorrect-answer-animation");
        setTimeout(() => {
            this.cells[index].classList.remove("incorrect-answer-animation");
        }, 500);
    }

    start() {
        this.makeRanomValues();
        this.fillCellsRandomValues();
        this.hideAndSaveRandomCellsValue(3);
        this.deleteDisabled();
        console.log(sudoku.hiddenCellsHashTable);
        console.log(sudoku.randomValues);
        this.buttonResult.onclick = () => {
            this.checkResult();
        };
        this.buttonNewGame.onclick = () => {
            this.restart();
        };
    }

    reset() {
        this.addDisabled();
        this.hiddenCellsHashTable = {};
        this.randomValues = [];
        this.counterOfCorrectAnswers = 0;
    }
    restart() {
        this.reset();
        this.start();
    }
}

const sudoku = new Sudoku();
sudoku.start();
