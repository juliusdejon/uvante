import React from 'react'
import { PointAnnotation } from '@rnmapbox/maps';
import { Coordinate } from 'types/types';

/**
 * Marker pin.
 * 
 * @param {string} id - id element.
 * @param {Coordinate} coordinate - Coordinate location eg. [71.99, 83.00].
 * @param {JSX.Element} Icon - Icon Element.
 * @returns {JSX.Element} A Marker element.
 */

const Marker = ({ id, coordinate, Icon }) => (
  <PointAnnotation id={id} coordinate={coordinate} draggable={false}>
    {Icon}
  </PointAnnotation>
);


export default Marker