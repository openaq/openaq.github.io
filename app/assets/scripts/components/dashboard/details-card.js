import React from 'react';
import { PropTypes as T } from 'prop-types';
import moment from 'moment';

import Card, { HighlightText, CardSubtitle } from '../card';
import InfoButton from '../info-button';

import { formatThousands } from '../../utils/format';

export default function DetailsCard({ measurements, date, coords, lifecycle }) {
  const startDate = date ? moment(date.start).format('YYYY/MM/DD') : null;
  const endDate = date ? moment(date.end).format('YYYY/MM/DD') : null;

  return (
    <Card
      title="Details"
      id="details"
      className="card--details"
      isDashboardHeader
      promoteZIndex
      renderBody={() => {
        return (
          <>
            <HighlightText className="card__highlight-text" size={'medium'}>
              {formatThousands(measurements)}
            </HighlightText>
            <CardSubtitle className="card__subtitle">Measurements</CardSubtitle>
          </>
        );
      }}
      renderFooter={() => {
        return (
          (coords || date || lifecycle) && (
            <dl className="global-details-list">
              {lifecycle && !!lifecycle.length && (
                <>
                  <dt>Lifecycle stage</dt>
                  <dd>{lifecycle.join(', ')}</dd>
                </>
              )}
              {coords && coords.lat && coords.lng && (
                <>
                  <dt>Coordinates</dt>
                  <dd>
                    N{coords.lat}, E{coords.lng}
                  </dd>
                </>
              )}
              {date && (
                <>
                  <div
                    style={{
                      display: `flex`,
                      alignItems: `baseline`,
                      zIndex: `40`,
                    }}
                  >
                    <dt>Project Collection Dates</dt>
                    <InfoButton
                      info={
                        'Collection dates may vary by parameter. This is the collection dates across all parameters.'
                      }
                      id="dashboard-details-info"
                    />
                  </div>
                  <dd>
                    {startDate} - {endDate}
                  </dd>
                </>
              )}
            </dl>
          )
        );
      }}
    />
  );
}

DetailsCard.propTypes = {
  measurements: T.number.isRequired,
  date: T.shape({
    start: T.string.isRequired,
    end: T.string.isRequired,
  }),
  coords: T.shape({
    lat: T.number,
    lng: T.number,
  }),
  lifecycle: T.array,
};
