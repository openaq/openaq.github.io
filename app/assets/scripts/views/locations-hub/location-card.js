import React from 'react';
import { PropTypes as T } from 'prop-types';
import moment from 'moment';

import { formatThousands } from '../../utils/format';
import Card, { CardDetails, FooterActions } from '../../components/card';

export default function LocationCard({
  city,
  country,
  firstUpdated,
  id,
  lastUpdated,
  name,
  onDownloadClick,
  parametersList,
  sources,
  sensorType,
  totalMeasurements,
  isMobile,
  isAnalysis,
  entity,
}) {
  let updated = moment(lastUpdated).fromNow();
  let started = moment(firstUpdated).format('YYYY/MM/DD');
  let ended = moment(lastUpdated).format('YYYY/MM/DD');
  return (
    <Card
      id="location"
      title={
        <>
          {name} <br />
          <small>{`Location ID ${id} `}</small>
          <small>
            in {city}, {country}
          </small>
        </>
      }
      subtitle={
        <>
          Updated <strong>{updated}</strong>
        </>
      }
      tags={
        [
          sensorType,
          entity,
          isMobile ? 'Mobile' : 'Stationary',
          isAnalysis && 'Analysis',
        ].filter(t => t) /* remove false */
      }
      renderBody={() => (
        <CardDetails
          id="location"
          list={[
            { label: 'Collection dates', value: `${started} - ${ended}` },

            {
              label: 'Measurements',
              value: formatThousands(totalMeasurements),
            },
            parametersList && {
              label: 'Parameters',
              value: parametersList
                .filter(p => p)
                .map(p => p.displayName || p.parameter || p)
                .join(', '),
            },
            {
              label: sources?.length > 1 ? 'Sources' : 'Source',
              value: sources?.map((source, i) => (
                <a
                  href={source.url}
                  title={`View source for ${name}`}
                  key={source.name}
                  className={!source.url && 'disabled'}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {`${i > 0 ? ', ' : ''}${source.organization || source.name}`}
                </a>
              )),
            },
          ]}
        />
      )}
      renderFooter={() => (
        <FooterActions
          what={name}
          onDownloadClick={onDownloadClick}
          viewMorePath={`/location/${encodeURIComponent(id)}`}
        />
      )}
    />
  );
}

LocationCard.propTypes = {
  city: T.string,
  country: T.string,
  firstUpdated: T.string.isRequired,
  id: T.number.isRequired,
  lastUpdated: T.string.isRequired,
  name: T.string.isRequired,
  onDownloadClick: T.func.isRequired,
  parametersList: T.array.isRequired,
  sources: T.arrayOf(
    T.shape({
      name: T.string.isRequired,
      url: T.string,
    })
  ).isRequired,
  sensorType: T.string,
  entity: T.string,
  totalMeasurements: T.number.isRequired,
  isMobile: T.bool.isRequired,
  isAnalysis: T.bool,
};
