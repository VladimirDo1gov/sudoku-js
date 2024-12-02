export default class GenerateRandomArrValues {
    constructor(arr = []) {
        this.arr = arr;
    }
    blenderValues(arr = this.arr) {
        let hash = {};
        let length = arr.length;
        while (Object.keys(hash).length < length) {
            let randomIndex = this.getRandomValue(0, length - 1);
            if (!hash[arr[randomIndex]]) {
                hash[`value${arr[randomIndex]}`] = arr[randomIndex];
            }
        }
        this.arr = [...Object.values(hash)];
    }
    getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    get getArr() {
        return this.arr;
    }
}
