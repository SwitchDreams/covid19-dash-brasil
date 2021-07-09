import React from 'react';
import { Mercator, Graticule } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from '../brazil.json';

export default function Home() {
  const brazil = topojson.feature(topology, topology.objects.estados).features;

  const countyValue = (value) => {
    if (value < 100) return '#FF0000';
    else if (value < 1000) return '#FEC000';
    else return '#6DFF5F';
  };

  return (
    <div>
      <svg width={500} height={500}>
        <Mercator data={brazil} />
        {(mercator) => (
          <g>
            <Graticule
              graticule={(g) => mercator.path(g) || ''}
              stroke="rgba(33,33,33,0.05)"
            />
            {mercator.features.map(({ feature, path }, i) => (
              <path
                key={`map-feature-${i}`}
                d={path || ''}
                fill={'#333'}
                strokeWidth={0.5}
                onClick={() => {
                  if (events)
                    alert(
                      `Clicked: ${feature.properties.name} (${feature.id})`,
                    );
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
