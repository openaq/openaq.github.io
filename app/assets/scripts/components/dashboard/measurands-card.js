import React from 'react';
import { PropTypes as T } from 'prop-types';

import Card from '../card';
import Table from '../table';
import { shortenLargeNumber, round } from '../../utils/format';

const initData = {
  parameter: {
    values: [],
    formatHeader: v => v.toUpperCase(),
    style: {
      color: 'black',
      fontWeight: 700,
      textAlign: 'center',
    },
  },
  avg: {
    values: [],
    formatHeader: v => v.toUpperCase(),
    formatCell: shortenLargeNumber,
    style: {
      textAlign: 'center',
    },
  },
  count: {
    values: [],
    formatHeader: v => v.toUpperCase(),
    formatCell: shortenLargeNumber,
    style: {
      textAlign: 'center',
    },
  },
};

/*  TODO This function currently just extracts the first data available for each pollutant
 *  openAQ api returns all available dates averages, or those within a specified date range.
 *  The desired data in this card needs some clarification. should it be the most recent day?
 *  User specified day? date range? etc
 */

const prepareData = data => {
  const combinedData = data.reduce((accum, datum) => {
    const { parameter, count, average } = datum;
    if (!accum[parameter]) {
      accum[parameter] = {
        count: count,
        value: average,
      };
    }
    return accum;
  }, {});
  const preparedData = Object.entries(combinedData).reduce(
    (acc, [parameter, stats]) => {
      acc = {
        parameter: {
          ...acc.parameter,
          values: [...acc.parameter.values, parameter],
        },
        avg: {
          ...acc.avg,
          values: [...acc.avg.values, round(stats.value, 2)],
        },
        count: {
          ...acc.count,
          values: [...acc.count.values, stats.count],
        },
      };
      return acc;
    },
    initData
  );
  return preparedData;
};

export default function MeasureandsCard({ parameters }) {
  return (
    <Card
      gridColumn={'1 / -1'}
      title="Parameters"
      renderBody={() => {
        return <Table data={prepareData(parameters)} />;
      }}
      noBodyStyle
    />
  );
}

MeasureandsCard.propTypes = {
  parameters: T.arrayOf(
    T.shape({
      parameter: T.string.isRequired,
      count: T.number.isRequired,
      average: T.number.isRequired,
    })
  ),
};