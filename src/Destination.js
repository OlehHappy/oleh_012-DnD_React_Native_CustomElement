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

    component.moveImg(item.id, left, top);
  }
};

export default class Destination extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      images: {
        'img1': { top: 20, left: 80, src: './src/img/test1-banner.png'},
        'img2': { top: 180, left: 20, src: './src/img/test2-banner.png'}
      }
    };
  }

  moveImg(id, left, top) {
    this.setState(update(this.state, {
      images: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const {images} = this.state
    const isActive = canDrop && isOver;

    let ourLeft = 20;
    let ourTop = 30;
    let ourId = 'first';
    let ourSrc = './src/img/test1-banner.png';

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
          {Object.keys(images).map(key => {
            const { src, left, top } = images[key];
            return (
              <Source src={src}
                   id={key}
                   left={left}
                   top={top}
                   key = {key} />
            );
          })}
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
