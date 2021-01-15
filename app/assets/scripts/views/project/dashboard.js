import React from 'react';
import PropTypes from 'prop-types';

import DetailsCard from '../../components/dashboard/details-card';
import LatestMeasurementsCard from '../../components/dashboard/lastest-measurements-card';
import SourcesCard from '../../components/dashboard/sources-card';
import MeasureandsCard from '../../components/dashboard/measurands-card';
import TemporalCoverageCard from '../../components/dashboard/temporal-coverage-card';
import TimeSeriesCard from '../../components/dashboard/time-series-card';

function Dashboard({
  measurements,
  projectParams,
  projectId,
  projectName,
  lifecycle,
  dateRange,
  projectDates,
  sources,
  timeseriesAverages,
}) {
  return (
    <div className="inner dashboard-cards">
      <DetailsCard
        measurements={measurements}
        lifecycle={lifecycle}
        date={projectDates}
      />
      <LatestMeasurementsCard parameters={projectParams} />
      <SourcesCard sources={sources} />
      <TimeSeriesCard
        projectId={projectId}
        parameters={projectParams}
        prefetchedData={timeseriesAverages}
        dateRange={dateRange}
        titleInfo={
          'The average value of a pollutant over time during the specified window at each individual node selected and the average values across all locations selected. While locations have varying time intervals over which they report, all time series charts show data at the same intervals. For one day or one month of data the hourly average is shown. For the project lifetime the daily averages are shown. If all locations are selected only the average across all locations is shown, not the individual location values.'
        }
      />
      <MeasureandsCard
        parameters={projectParams}
        titleInfo={
          "The average of all values and total number of measurements for the available pollutants during the chosen time window and for the selected locations. Keep in mind that not all locations may report the same pollutants. What are we doing when the locations aren't reporting the same pollutants?"
        }
      />
      <TemporalCoverageCard
        parameters={projectParams}
        dateRange={dateRange}
        spatial="project"
        id={projectName}
        titleInfo={
          'The average number of measurements for each pollutant by hour, day, or month at the selected locations. In some views a window may be turned off if that view is not applicable to the selected time window.'
        }
      />
    </div>
  );
}

Dashboard.propTypes = {
  measurements: PropTypes.number,
  projectName: PropTypes.string,
  projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  projectParams: PropTypes.array,
  lifecycle: PropTypes.arrayOf(PropTypes.number),
  dateRange: PropTypes.string,
  projectDates: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }),
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sourceURL: PropTypes.string,
      url: PropTypes.string,
      contacts: PropTypes.array,
    })
  ),
  locations: PropTypes.arrayOf(PropTypes.number),
  country: PropTypes.string,
  timeseriesAverages: PropTypes.object,
};

Dashboard.defaultProps = {
  timeseriesAverages: null,
};

export default Dashboard;
