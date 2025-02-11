import React, { useContext, useState } from 'react'
import { PointAnnotation } from '@rnmapbox/maps'
import { AppContext } from 'contexts/AppContext';
import Pin from 'components/Pin';
import { useAddressSearch } from 'hooks/useAddressSearch';


const PickupPoint = () => {
  const { pickUp, setPickUp, setPickUpAddress } = useContext(AppContext);
  const { fetchAddress } = useAddressSearch();

  const onFinishDraggingPickUpPoint = async (payload) => {
    const address = await fetchAddress(
      { lat: payload.geometry.coordinates[1], lng: payload.geometry.coordinates[0] }
    )
    setPickUp(payload.geometry.coordinates);
    setPickUpAddress(address[0].place_name);
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