import GenerateRandomArrValues from "./randomGenerate.mjs";

class Sudoku {
    constructor() {
        this.cells = document.querySelectorAll(".cell");
        this.generatorRandom = new GenerateRandomArrValues([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.hiddenCells = {};
        this.buttonResult = document.querySelector(".btn-result");
        this.randomValues = [];
    }
    fillCellsRandomValues() {
        this.generatorRandom.blenderValues();
        this.randomValues = [...this.generatorRandom.getArr];
        let i = 0;
        console.log(this.randomValues);
        this.cells.forEach((cell) => {
            cell.value = this.randomValues[i++];
        });
    }
    hideCellsValue() {
        while (Object.keys(this.hiddenCells).length < 2) {
            let randomIndex = this.generatorRandom.getRandomValue(0, 8);
            if (!this.hiddenCells[randomIndex]) {
                this.hiddenCells[randomIndex] = this.cells[randomIndex].value;
                this.cells[randomIndex].value = "";
            }
        }
    }
    deleteDisabled() {
        Object.keys(this.hiddenCells).forEach((key) => {
            this.cells[key].removeAttribute("disabled");
        });
    }

    checkResult() {
        let count = 0;
        Object.keys(this.hiddenCells).forEach((key) => {
            if (this.cells[key].value == this.hiddenCells[key]) {
                count++;
            } else {
                this.cells[key].classList.add("wrong");
            }
        });
        return count == 2 ? true : false;
    }

    start() {
        this.fillCellsRandomValues();
        this.hideCellsValue();
        this.deleteDisabled();
        this.buttonResult.onclick = () => {
            console.log(this.checkResult());
        };
    }
}

const sudoku = new Sudoku();
sudoku.start();
console.log(sudoku.hiddenCells);
