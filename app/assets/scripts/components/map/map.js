import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mapbox from 'mapbox-gl';

import config from '../../config';

export default function Map({ center, bbox, children }) {
  const containerRef = useRef();

  const [map, setMap] = useState(null);

  useEffect(() => {
    mapbox.accessToken = config.mapbox.token;
    const m = new mapbox.Map({
      container: containerRef.current,
      style: config.mapbox.baseStyle,
      zoom: 1,
      center: [0, 0],
    });

    m.addControl(new mapbox.NavigationControl());

    m.on('load', () => {
      setMap(m);

      if (process.env.DS_ENV === 'development') {
        // makes map accessible in console for debugging
        window.map = m;
      }

      if (center) {
        m.flyTo({ center, zoom: 15 });
      } else if (bbox) {
        m.fitBounds(bbox);
      }
    });

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="map">
      <div ref={containerRef} className="map__container" data-cy="mapboxgl-map">
        {map &&
          children &&
          React.Children.map(children, child =>
            React.cloneElement(child, {
              map,
            })
          )}
      </div>
    </div>
  );
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  bbox: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};
