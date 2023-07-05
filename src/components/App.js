import React, { useState } from 'react';
import '../styles/App.css';
import { Box, Grid } from '@material-ui/core';

import ControlPanel from './ControlPanel';
import DisplayArea from './DisplayArea';

import utils from '../utils.js';
import SolveStep from '../classes.js'

function App() {
  const [size, setSize] = useState(55);
  const [unique, setUnique] = useState(false);
  const [data, setData] = useState(utils.randomize(size, unique));
  const [algo, setAlgo] = useState('insertion');
  const [delay, setDelay] = useState(500);
  const [steps, setSteps] = useState(utils.getSolutionSteps(data, algo));
  const [stepInd, setStepInd] = useState(0);
  const [solving, setSolving] = useState(false);

  const randomizeData = (s = size, u = unique) => {
    let newData = utils.randomize(s, u);
    let solSteps = utils.getSolutionSteps(newData, algo);
    setData(newData);
    setSteps(solSteps);
    setStepInd(0);
  };
  const toggleUnique = (value) => {
    setUnique(value);
    randomizeData(size, value);
  };
  const changeAlgo = (value) => {
    setAlgo(value);
    let solSteps = utils.getSolutionSteps(data, value);
    setSteps(solSteps);
    setStepInd(0);
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (solving && stepInd !== steps.length) {
        setData(utils.performStep(data, steps[stepInd]));
        setStepInd(stepInd => stepInd + 1);
      }
      else if (stepInd === steps.length) {
        setSolving(solving => false);
      }
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  })

  const step = (instruction) => {
    switch (instruction) {
      case 'next':
        if (stepInd !== steps.length) {
          setData(utils.performStep(data, steps[stepInd]));
          setStepInd(stepInd => stepInd + 1);
        }
        break;
      case 'back':
        if (stepInd > 1) {
          setData(utils.performInverseStep(data, steps, stepInd - 1));
          setStepInd(stepInd - 1);
        }
        else if (stepInd === 1) {
          let initStep = new SolveStep('init');
          setData(utils.performStep(data, initStep));
          setStepInd(0);
        }
        break;
      case 'end': {
        let newData = data;
        for (let i = stepInd; i < steps.length; i++) {
          newData = utils.performStep(data, steps[i]);
        }
        setData(newData);
        setStepInd(steps.length);
        break;
      }
      case 'beginning':
        let newData = data;
        for (let i = stepInd - 1; i > 1; i--) {
          newData = utils.performInverseStep(data, steps, i);
        }
        let initStep = new SolveStep('init');
        setData(utils.performStep(newData, initStep));
        setStepInd(0);
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <Box height="100%">
        <Grid
          container
          direction="row"
          style={{ height: "95%" }}
        >
          <Grid item xs={12}
            style={{ height: "75%" }}
          >
            <DisplayArea data={data} stepInd={stepInd} />
          </Grid>
          <Grid item xs={12}
            style={{ height: "25%" }}
          >
            <ControlPanel
              size={size}
              setSize={setSize}
              unique={unique}
              setUnique={toggleUnique}
              algo={algo}
              setAlgo={changeAlgo}
              delay={delay}
              setDelay={setDelay}
              solving={solving}
              setSolving={setSolving}
              randomize={randomizeData}
              step={step}
              progress={stepInd / steps.length * 100}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
