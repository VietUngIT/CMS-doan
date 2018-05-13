/**
*
* CcustomTooltip
*
*/

import React,{PropTypes} from 'react';
import styles from './styles'


class CcustomTooltip extends React.Component { 
  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div style={styles.wrapDetail}>
          <p className="label">{`Ngày: ${label}`}</p>
          <p className="intro">{`${this.props.labelTooltip}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  }
}

CcustomTooltip.propTypes = {
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.string,
};

export default CcustomTooltip;
