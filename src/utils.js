import colors from './colors.js';
import algorithms from './algorithms.js'
import SolveStep from './classes.js';

const utils = {
    randomize: (size, unique) => {
        let data = [];
        if(unique){
            for(let i=1; i<=size; i++){
                data.push({x: i, y: i, color: colors.default})
            };
        }
        else{
            for(let i=1; i<=size; i++){
                data.push({x: i, y:  Math.floor(Math.random() * size + 1), color: colors.default})
            };
        }
        
        for(let i=data.length-1; i>=0; i--){
            let rand = Math.floor(Math.random() * (i + 1));
            let temp = data[rand].y;
            data[rand].y = data[i].y;
            data[i].y = temp;
        }

        return data;
    },

    swap: (values, i, j) => {
        let temp = values[i];
        values[i] = values[j];
        values[j] = temp;

        return values;
    },

    getSolutionSteps: (data, algo) => {
        let values = data.map(item => item.y);
        let steps = [];

        switch (algo) {
            case 'insertion':
                steps = algorithms.insertion(values);
                break;
            case 'selection':
                steps = algorithms.selection(values);
                break;
            case 'bubble':
                steps = algorithms.bubble(values);
                break;
            default:
                break;

        }

        steps.push(new SolveStep('end'));
    
        return steps;
    },

    performStep: (data, step) => {
        if(step.type === 'init'){
            for(let i=0; i<data.length; i++){
                data[i].color = colors.default;
            }    
            return data;
        }
        if(step.type === 'end'){
            for(let i=0; i<data.length; i++){
                data[i].color = colors.sorted;
            }    
            return data;
        }

        for(let i=0; i<data.length; i++){
            data[i].color = colors.default;

            if(i >= step.sorted.begin && i <= step.sorted.end){
                data[i].color = colors.sorted;
            }
        }

        for(let i=0; i<step.colors.length; i++){
            let ind = step.colors[i].ind;
            data[ind].color = step.colors[i].color;
        }
        
        if(step.type === 'swap'){
            let ind0 = step.swap.ind0;
            data[ind0].y = step.swap.val0
            let ind1 = step.swap.ind1;
            data[ind1].y = step.swap.val1;
        }

        return data;
    },

    performInverseStep: (data, steps, stepInd) => {
        data = utils.performStep(data, steps[stepInd-1]);

        if(steps[stepInd].type === 'swap'){
            let ind0 = steps[stepInd].swap.ind0;
            data[ind0].y = steps[stepInd].swap.val1
            let ind1 = steps[stepInd].swap.ind1;
            data[ind1].y = steps[stepInd].swap.val0;
        }

        return data;
    }
}

export default utils;