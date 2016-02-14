import React, { PropTypes, Component } from 'react';
import update from 'react/lib/update'
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Source from './Source';

const style = {
  height: '22rem',
  width: '22rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
};

const destinationTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    console.log(left);
    // return { name: 'Destination' };
  }
};

export default class Destination extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let ourLeft = 20;
    let ourTop = 30;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div>
        <div style={{ ...style, backgroundColor }}>
          {isActive ?
            'Release to drop' :
            'Drag a box here'
          }
        </div>
        <div>
          <Source name="OurBox" left = {ourLeft} top = {ourTop} />
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.Item, destinationTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Destination);

// export default DragDropContext(HTML5Backend)(Destination);
