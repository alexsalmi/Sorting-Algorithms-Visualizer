import React, { useState } from 'react';
import Measure from 'react-measure';

import GraphDisplay from './GraphDisplay';

function DisplayArea(props) {
    const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

    return (
        <div style={{ height: "105%", width: "98%" }}>
            <Measure
                bounds
                onResize={contentRect => { setDimensions(contentRect.bounds) }}
            >
                {({ measureRef }) => (
                    <div ref={measureRef} style={{ height: "103%" }}>
                        <GraphDisplay
                            width={dimensions.width}
                            height={dimensions.height}
                            data={props.data}
                        />
                    </div>
                )}
            </Measure>
        </div>
    );
}

export default DisplayArea;