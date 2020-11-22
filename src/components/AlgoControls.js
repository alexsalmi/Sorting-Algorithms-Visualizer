import React from 'react';
import { FormControl, Grid, InputLabel, Select, Slider, Typography } from '@material-ui/core';

function AlgoControls(props) {
    return(
        <>
            <Typography variant="h6" style={{margin:"20px"}}>Algorithm Controls</Typography>

            <div id="AlgorithmSelect" style={{marginTop: "20px", marginBottom:"20px"}}>
                <FormControl>
                    <InputLabel shrink>Algorithm</InputLabel>
                    <Select
                        disabled={props.solving}
                        native
                        value={props.algo}
                        onChange={(event) => {
                            props.setAlgo(event.target.value)
                        }}
                    >
                    <option value={'insertion'}>Insertion Sort</option>
                    <option value={'selection'}>Selection Sort</option>
                    <option value={'bubble'}>Bubble Sort</option>
                    </Select>
                </FormControl>
            </div>
            
            <div id="SolvingSpeedControl" style={{marginTop:"20px", marginBottom:"20px"}}>
                <Typography variant="body1">Solving Delay (ms)</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Typography variant="body1">1</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Slider
                            min={5}
                            max={1000} 
                            valueLabelDisplay="auto"
                            value={props.delay}
                            onChange={(event, newValue) => props.setDelay(newValue)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">1000</Typography>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default AlgoControls;