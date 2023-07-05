import utils from './utils.js'
import colors from './colors.js';

import SolveStep from './classes.js';

const algorithms = {
    insertion: (values) => {
        let size = values.length;
        let steps = [];

        for(let i=1; i<size; i++){
            var step = new SolveStep('color');
            step.addColor(i, colors.primary);
            step.setSorted(0, i-1);
            steps.push(step);

            for(let j=i; j>0; j--){
                step = new SolveStep('color');
                step.addColor(j, colors.primary);
                step.addColor(j-1, colors.selected);
                step.setSorted(0, i);
                steps.push(step);

                if(values[j-1]>values[j]){
                    values = utils.swap(values, j-1, j);

                    step = new SolveStep('swap');
                    step.addSwap(j, values[j], j-1, values[j-1]);
                    step.addColor(j-1, colors.primary);
                    step.addColor(j, colors.selected);
                    step.setSorted(0, i);
                    steps.push(step);
                }
                else{
                    break;
                }
            }
        }

        return steps;
    },

    selection: (values) => {
        let size = values.length;
        let steps = [];

        for(let i=0; i<size-1; i++){
            var step = new SolveStep('color');
            step.addColor(i, colors.primary);
            step.setSorted(0, i-1);
            steps.push(step);

            let minInd = i;
            for(let j=i+1; j<size; j++){
                step = new SolveStep('color');
                step.addColor(j, colors.selected);
                step.addColor(minInd, colors.secondary);
                step.addColor(i, colors.primary);
                step.setSorted(0, i-1);
                steps.push(step);

                if(values[j] < values[minInd]){
                    minInd = j;
                }
            }

            values = utils.swap(values, i, minInd);
            step = new SolveStep('color');
            step.addColor(minInd, colors.secondary);
            step.addColor(i, colors.primary);
            step.setSorted(0, i);
            steps.push(step);

            step = new SolveStep('swap');
            step.addSwap(i, values[i], minInd, values[minInd]);
            step.addColor(i, colors.primary);
            step.setSorted(0, i);
            steps.push(step);
        }
        return steps;
    },
    
    bubble: (values) => {
        let size = values.length;
        let steps = [];

        let maxSorted = size;
        let swapped = true;
        while(swapped){
            swapped = false;

            var step = new SolveStep('color');
            step.addColor(0, colors.primary);
            step.setSorted(maxSorted, size);
            steps.push(step);

            for(let i=0; i<maxSorted-1; i++){
                step = new SolveStep('color');
                step.addColor(i, colors.primary);
                step.addColor(i+1, colors.selected);
                step.setSorted(maxSorted, size);
                steps.push(step);

                if(values[i] > values[i+1]){
                    values = utils.swap(values, i, i+1);
                    swapped = true;

                    step = new SolveStep('swap');
                    step.addSwap(i, values[i], i+1, values[i+1]);
                    step.addColor(i+1, colors.primary);
                    step.setSorted(maxSorted,size);
                    steps.push(step);
                }
                else{
                    step = new SolveStep('color');
                    step.addColor(i+1, colors.primary);
                    step.setSorted(maxSorted,size);
                    steps.push(step);
                }
            }
            maxSorted = maxSorted-1;
        }

        return steps;
    },
};

export default algorithms;

// import utils from './utils.js'
// import colors from './colors.js';

// const algorithms = {
//     insertion: (values) => {
//         let size = values.length;
//         let steps = [];

//         for(let i=1; i<size; i++){
//             let step = 

//             steps.push(
//                 {
//                     colors: [{ ind: i, color: colors.primary }],
//                     changedValues: []
//                 }
//             );
//             for(let j=i; j>0; j--){
//                 steps.push(
//                     {
//                         colors: [
//                             { ind: j, color: colors.primary },
//                             { ind: j-1, color: colors.selected}
//                         ],
//                         changedValues: []
//                     }
//                 );
//                 if(values[j-1]>values[j]){
//                     values = utils.swap(values, j-1, j);
//                     steps.push(
//                         {
//                             colors: [
//                                 { ind: j, color: colors.selected },
//                                 { ind: j-1, color: colors.primary }
//                             ],
//                             changedValues: [
//                                 { ind: j, value: values[j] },
//                                 { ind: j-1, value: values[j-1] }
//                             ]
//                         }
//                     );
//                 }
//                 else{
//                     break;
//                 }
//             }
//         }

//         return steps;
//     },

//     selection: (values) => {
//         let size = values.length;
//         let steps = [];

//         for(let i=0; i<size-1; i++){
//             steps.push(
//                 {
//                     colors: [{ ind: i, color: colors.primary }],
//                     changedValues: []
//                 }
//             );

//             let minInd = i;
//             for(let j=i+1; j<size; j++){
//                 steps.push(
//                     {
//                         colors: [
//                             { ind: minInd, color: colors.secondary },
//                             { ind: i, color: colors.primary },
//                             { ind: j, color: colors.selected },
//                         ],
//                         changedValues: []
//                     }
//                 );
//                 if(values[j] < values[minInd]){
//                     minInd = j;
//                     steps.push(
//                         {
//                             colors: [
//                                 { ind: i, color: colors.primary },
//                                 { ind: minInd, color: colors.secondary }
//                             ],
//                             changedValues: []
//                         }
//                     );
//                 }
//             }

//             values = utils.swap(values, i, minInd);
//             steps.push(
//                 {
//                     colors: [
//                         { ind: i, color: colors.primary },
//                         { ind: minInd, color: colors.secondary }
//                     ],
//                     changedValues: []
//                 }
//             );

//             steps.push(
//                 {
//                     colors: [
//                         { ind: i, color: colors.primary },
//                     ],
//                     changedValues: [
//                         { ind: i, value: values[i] },
//                         { ind: minInd, value: values[minInd] }
//                     ]
//                 }
//             );
//         }
//         return steps;
//     },
    
//     bubble: (values) => {
//         let size = values.length;
//         let steps = [];

//         let swapped = false;
//         while(!swapped){
//         }

//     },
// };

// export default algorithms;