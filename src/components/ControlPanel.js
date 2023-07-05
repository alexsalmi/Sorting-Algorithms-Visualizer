import React from 'react';
import { Divider, Grid, LinearProgress, Paper, Typography } from '@material-ui/core';

import MainControls from './MainControls';
import DataControls from './DataControls';
import AlgoControls from './AlgoControls';

function ControlPanel(props) {
    return (
        <Paper elevation="10" style={{ padding: "5px" }}>
            <LinearProgress variant="determinate" value={props.progress} />
            <Grid
                container
                direction="row"
                justify="space-around"
                align-items="center"
            >
                <Grid item xs={3} sm={3} lg={4}>
                    <DataControls
                        randomize={props.randomize}
                        size={props.size}
                        setSize={props.setSize}
                        unique={props.unique}
                        setUnique={props.setUnique}
                        solving={props.solving}
                    />
                </Grid>

                <Divider orientation="vertical" flexItem />
                <Grid item xs={3} sm={3} lg={2} >
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justify="center"
                        style={{ height: "100%" }}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h5">Sorting Algorithm Visualizer</Typography>
                            <Typography variant="subtitle2">By Alex Salmi</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MainControls
                                solving={props.solving}
                                setSolving={props.setSolving}
                                solve={props.solve}
                                randomize={props.randomize}
                                step={props.step}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3} sm={3} lg={4}>
                    <AlgoControls
                        algo={props.algo}
                        setAlgo={props.setAlgo}
                        delay={props.delay}
                        setDelay={props.setDelay}
                        solving={props.solving}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ControlPanel;