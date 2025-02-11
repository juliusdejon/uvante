import React, { useEffect, useState } from 'react'
import { LineLayer, ShapeSource } from '@rnmapbox/maps';


/**
 * AnimatedRoute renders the route for driving with animation.
 * 
 * @param {string} route - Geo points between pickup and drop off.
 * @param {boolean} loop - Flag to loop.
 * @param {boolean} speed - Speed of the animation.
 * @returns {JSX.Element} An AnimatedRoute element.
 */

const AnimatedRoute = ({ route, loop = false, speed = 1 }: {
  route: any;
  loop: boolean;
  speed?: number;
}) => {

  const [dashArray, setDashArray] = useState([0, 100]);

  useEffect(() => {
    if (!route) return;
    let progress = 0;
    const totalSteps = 100;
    let animationFrameId;
    const animateRoute = () => {
      progress += speed // Adjust speed here
      if (progress > totalSteps) {
        if (loop) {
          progress = 0; // Restart animation
        } else {
          return;
        }
      }
      setDashArray([progress, 100 - progress]);
      animationFrameId = requestAnimationFrame(animateRoute);
    };

    animationFrameId = requestAnimationFrame(animateRoute);

    return () => cancelAnimationFrame(animationFrameId);
  }, [route, loop]);


  return (
    <ShapeSource id="routeSource" shape={route}>
      <LineLayer id="routeLine" style={{
        lineColor: 'blue', // color of the route
        lineWidth: 4, // width of the route
        lineDasharray: dashArray, // This adds the animation effect to the route 
      }} />
    </ShapeSource>
  )
}

export default AnimatedRoute