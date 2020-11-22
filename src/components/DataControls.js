import React from 'react';
import { FormControlLabel, Grid, Slider, Switch, Typography } from '@material-ui/core';

function DataControls(props) {
    return(
        <>
            <Typography variant="h6" style={{margin:"20px"}}>Data Controls</Typography>
            
            <div id="UniqueValsControl" style={{margin: "25px"}}>
                <FormControlLabel
                    control={
                    <Switch
                        disabled={props.solving}
                        checked={props.unique}
                        color="primary"
                        onChange={(event, newValue) => {props.setUnique(newValue)}}
                    />
                    }
                    label="Unique Values"
                />
            </div>

            <div id="DataSizeControl" style={{marginTop:"20px", marginBottom:"20px"}}>
                <Typography variant="body1">Data Size (n)</Typography>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Typography variant="body1">10</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Slider 
                            disabled={props.solving}
                            min={10}
                            max={100}
                            valueLabelDisplay="auto"
                            value={props.size} 
                            onChange={(event, newValue) => {props.setSize(newValue)}}
                            onChangeCommitted={() => props.randomize()}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">100</Typography>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default DataControls;