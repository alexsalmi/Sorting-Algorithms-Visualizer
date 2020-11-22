import React from 'react';
import { XYPlot, VerticalBarSeries } from 'react-vis';

function GraphDisplay(props) {
    return(
        <div key={props.data}>
            <XYPlot 
                height={props.height} 
                width={props.width}
            >
                <VerticalBarSeries
                    animation
                    data={props.data} 
                    colorType="literal"
                    barWidth={0.75}
                />
            </XYPlot>
        </div>
    );
}

export default GraphDisplay;