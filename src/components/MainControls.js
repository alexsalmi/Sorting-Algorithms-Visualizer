import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded, LoopRounded, PlayArrowRounded, StopRounded, SkipNextRounded, SkipPreviousRounded} from '@material-ui/icons';

function MainControls(props) {
    return (
        <>
        <div style={{marginBottom: "10px"}}>
            <ButtonGroup 
                size="small" 
                color="primary"
            >
                <Button 
                    aria-label="beginning"
                    disabled={props.solving}
                    onClick={() => props.step('beginning')}
                >
                    <SkipPreviousRounded />
                </Button>
                <Button 
                    aria-label="back"
                    disabled={props.solving}
                    onClick={() => props.step('back')}
                >
                    <KeyboardArrowLeftRounded />
                </Button>
                {props.solving ? 
                    <Button 
                        aria-label="play" 
                        variant="contained"
                        size="medium"
                        onClick={() => props.setSolving(!props.solving)}
                    >
                        <StopRounded />
                    </Button>
                :
                    <Button 
                        aria-label="play" 
                        variant="contained"
                        size="medium"
                        onClick={() => props.setSolving(true)}
                    >
                        <PlayArrowRounded />
                    </Button>
                } 
                <Button 
                    aria-label="next"
                    disabled={props.solving}
                    onClick={() => props.step('next')}
                >
                    <KeyboardArrowRightRounded />
                </Button>
                <Button 
                    aria-label="end"
                    disabled={props.solving}
                    onClick={() => props.step('end')}
                >
                    <SkipNextRounded />
                </Button>
            </ButtonGroup>

        </div>
        <div>
            <Button
                disabled={props.solving}
                color="primary"
                size="large"
                onClick={() => props.randomize()}
            >
            <LoopRounded />Randomize Values
            </Button>
        </div>
        </>
    );
}

export default MainControls;