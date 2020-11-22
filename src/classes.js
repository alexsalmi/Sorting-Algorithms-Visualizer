export default class SolveStep {
    constructor(type){
        this.type = type;
    }

    colors = [];
    swap = {};
    sorted = {};

    addColor(index, color){
        this.colors.push({
            ind: index, 
            color: color
        });
    }

    addSwap(ind0, val0, ind1, val1){
        this.swap = {
            ind0: ind0,
            val0: val0,
            ind1: ind1,
            val1: val1
        };
    }

    setSorted(ind0, ind1){
        this.sorted = {
            begin: ind0,
            end: ind1
        }
    }
}