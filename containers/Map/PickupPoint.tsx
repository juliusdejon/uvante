import React, { useContext } from 'react'
import { PointAnnotation } from '@rnmapbox/maps'
import { AppContext } from 'contexts/AppContext';
import Pin from 'components/Pin';


const PickupPoint = () => {
  const { pickUp, setPickUp } = useContext(AppContext);

  const onFinishDraggingPickUpPoint = (payload) => {
    console.log(payload)
    setPickUp(payload.geometry.coordinates);
  }

  return (
    <PointAnnotation
      id="1"
      coordinate={pickUp}
      draggable={true}
      onDragEnd={onFinishDraggingPickUpPoint}
    >
      <Pin type="pickup" />
    </PointAnnotation>
  )
}

export default PickupPoint