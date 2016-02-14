import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Source from './Source';
import Destination from './Destination';

export default class App extends Component {
  render() {
    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Destination />
        </div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Source name="OurBox" />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
