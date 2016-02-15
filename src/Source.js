import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'react-dnd';

const style = {
  position: 'absolute',
  cursor: 'move'
};

const imgSource = {
  beginDrag(props) {
    const {id, src, left, top } = props;
    return {id, src, left, top };
  }
};

export default class Source extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  };

  render() {
    const { connectDragSource, id, src, left, top } = this.props;

    return (
      connectDragSource(
        <img id = {id} src = {src} style = {{ ...style, left, top }} key = {id} />
      )
    );
  }
}

export default DragSource(ItemTypes.Item, imgSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource()
}))(Source);
