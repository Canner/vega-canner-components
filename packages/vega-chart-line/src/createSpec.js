import {withResponsive} from '../../../utils';
import {UIParams} from './types';

const createSpec = ({
  fill = '#1890ff',
  interpolate = 'linear',
  width = '100%',
  height = '100%',
  x,
  y,
}: UIParams) =>({
    $schema: 'https://vega.github.io/schema/vega/v4.json',
    width: width,
    height: height,
    padding: 5,

    autosize: {
      type: 'fit',
    },

    signals: [
      {
        name: 'interpolate',
        value: interpolate
      },
      {
        name: 'tickCount',
        value: 1,
        "on": [
          {
            "events": {'signal': 'width'},
            "update": 'width/70'
          }
        ]
      }
    ],
  
    data: [
      {
        name: 'table'
      }
    ],
  
    scales: [
      {
        name: 'xscale',
        type: x.scale || 'linear',
        range: 'width',
        zero: false,
        domain: {'data': 'table', 'field': x.field}
      },
      {
        name: 'yscale',
        type: y.scale || 'linear',
        range: 'height',
        nice: true,
        zero: true,
        domain: {'data': 'table', 'field': y.field}
      }
    ],
  
    axes: [
      {orient: 'bottom', scale: 'xscale', tickCount: {signal: 'tickCount'}, title: x.title || ''},
      {orient: 'left', scale: 'yscale', title: y.title || ''}
    ],
  
    marks: [
      {
        type: 'line',
        from: {data: 'table'},
        encode: {
          update: {
            x: {scale: 'xscale', field: x.field},
            y: {scale: 'yscale', field: y.field},
            y2: {scale: 'yscale', value: 0},
            interpolate: {signal: 'interpolate'},
            stroke: {value: fill},
          },
        }
      }
    ]
});

export default withResponsive(createSpec);
