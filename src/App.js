import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Destination from './Destination';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Destination />
        </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
