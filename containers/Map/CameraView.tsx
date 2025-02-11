import { Camera } from '@rnmapbox/maps';
import React from 'react'
import { Coordinate } from 'types/types';

const CameraView = ({
  pickUp,
  dropOff,
  focusOnPickUpLocation,
  focusOnDropOffLocation,
  centerCoordinate,
}: {
  pickUp: Coordinate | null;
  dropOff: Coordinate | null;
  focusOnPickUpLocation: boolean;
  focusOnDropOffLocation: boolean;
  centerCoordinate: Coordinate;
}) => {
  let bounds = null;
  let cameraCenter = centerCoordinate;
  let cameraZoom = 13;
  let cameraPadding = { paddingTop: 100, paddingBottom: 450, paddingLeft: 100, paddingRight: 100 };

  const isTripActive = pickUp && dropOff;

  if (isTripActive) {
    bounds = {
      ne: [Math.max(pickUp[0], dropOff[0]), Math.max(pickUp[1], dropOff[1])],
      sw: [Math.min(pickUp[0], dropOff[0]), Math.min(pickUp[1], dropOff[1])],
    };
  }

  // Determine camera center, zoom, and padding
  if (isTripActive) {
    if (focusOnPickUpLocation) {
      cameraCenter = pickUp;
      cameraZoom = 15;
      cameraPadding = null; // No padding when focusing on pick-up location
    } else if (focusOnDropOffLocation) {
      cameraCenter = dropOff;
      cameraZoom = 15;
      cameraPadding = null; // No padding when focusing on drop-off location
    } else {
      cameraCenter = null;
      cameraZoom = null; // Default zoom for trip
    }
  }

  return (
    <Camera
      centerCoordinate={cameraCenter}
      zoomLevel={cameraZoom}
      bounds={bounds}
      padding={cameraPadding}
      animationDuration={1000}
      animationMode="easeTo"
    />
  );
};


export default CameraView