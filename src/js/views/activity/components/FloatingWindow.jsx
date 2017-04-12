import React from 'react';
import Draggable from 'react-draggable';

export default class extends React.Component{
    render() {
        return (
            <div>
                <Draggable
                    axis="both"
                    handle=".tuodong"
                    defaultPosition={{x: 0, y: 0}}
                    position={null}
                    grid={[25, 25]}
                    zIndex={100}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <div className="tuodong">
                        <div className="zhuan"><img src="/images/zhuanbg.png" alt=""/></div>
                        <div className="wenzi"><img src="/images/zhuan.png" alt=""/></div>

                    </div>
                </Draggable>
                <Draggable
                    axis="both"
                    handle=".tuodong2"
                    defaultPosition={{x: 0, y: 0}}
                    position={null}
                    grid={[25, 25]}
                    zIndex={100}
                    onStart={this.handleStart}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                    <div className="tuodong2">
                        <div className="zhuan"><img src="/images/jizhibg.png" alt=""/></div>
                        <div className="wenzi"><img src="/images/jizhi.png" alt=""/></div>

                    </div>
                </Draggable>
            </div>
        )
    }
}