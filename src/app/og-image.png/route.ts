import * as React from 'react';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)',
          color: 'white',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          },
        },
        React.createElement(
          'div',
          {
            style: {
              width: 92,
              height: 92,
              borderRadius: 18,
              background: '#facc15',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 38,
              fontWeight: 800,
            },
          },
          'AGT'
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            },
          },
          React.createElement(
            'div',
            { style: { fontSize: 34, fontWeight: 800 } },
            'AGT Equipment'
          ),
          React.createElement(
            'div',
            { style: { fontSize: 22, color: '#bfdbfe' } },
            'Factory-direct compact equipment'
          )
        )
      ),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
          },
        },
        React.createElement(
          'div',
          {
            style: {
              fontSize: 76,
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: 0,
              maxWidth: 960,
            },
          },
          'Mini Excavators & Mini Skid Steers'
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              gap: 18,
              fontSize: 28,
              color: '#e0f2fe',
            },
          },
          React.createElement('span', null, 'US warehouses'),
          React.createElement('span', null, 'Free shipping'),
          React.createElement('span', null, '1-year warranty')
        )
      )
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
