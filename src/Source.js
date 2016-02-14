import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'react-dnd';

const style = {
  position: 'absolute',
  cursor: 'move',
};

const imgSource = {
  beginDrag(props) {
    const {name, left, top } = props;
    return {name, left, top };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    // const dropResult = monitor.getDropResult();
    //
    // if (dropResult) {
    //   window.alert( // eslint-disable-line no-alert
    //     `You dropped ${item.name} into ${dropResult.name}!`
    //   );
    // }
  }
};

export default class Source extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  };

  render() {
    const { isDragging, connectDragSource, left, top } = this.props;

    return (
      connectDragSource(
        <img src = "./src/img/test1-banner.png" style = {{ ...style, left, top }} />
      )
    );
  }
}

export default DragSource(ItemTypes.Item, imgSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Source);
