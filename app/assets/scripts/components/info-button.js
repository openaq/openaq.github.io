import React from 'react';
import T from 'prop-types';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const StyledTooltip = styled(ReactTooltip)`
  width: ${({ width }) => width || 'auto'};
  max-width: 20rem;
  /* Z index set to 1000 to go over shadow scroll bar
   * which has z-index 1000 */
  z-index: 1001;
`;
const Wrapper = styled.div`
  width: fit-content;
`;
function InfoButton(props) {
  const { info, id, width } = props;
  return (
    <Wrapper>
      <button
        data-tip
        data-effect="solid"
        data-for={id}
        className="info-button"
      >
        <span>{info}</span>
      </button>
      {info && (
        <StyledTooltip width={width} id={id} place="bottom" effect="float">
          {info}
        </StyledTooltip>
      )}
    </Wrapper>
  );
}

InfoButton.propTypes = {
  info: T.string,
  id: T.string,
  children: T.node,
  width: T.string,
};

export default InfoButton;
