import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";
import { hoursMins, grainMatchTypes, grainIsMinutes, matchingTooltipTypes } from "./utils";
import stylesTooltip from "../../../components/Tooltips/tooltip.module.scss";
import stylesComposed from "../../../components/Tooltips/tooltipComposed.module.scss";
import styles from "./dateFormatter.module.scss";
import Formatter, { getStyle } from "../Formatter";
import Tooltip from "../../../components/Tooltips/ToolTip";

const DateFormatter = (props) => {
  const [date, setDate] = useState(props.date ? props.date : null);
  const [mode, setMode] = useState(props.mode ? props.mode : 'default');
  const [secondDate, setSecondDate] = useState(props.secondDate ? props.secondDate : new Date(Date.now()))
  const [format, setFormat] = useState(
    props.format ? props.format : "DD/MM/YYYY"
  );
  const [granularity, setGranularity] = useState(
    props.granularity ? props.granularity : ["days"]
  );
  const [information, setInformation] = useState("");

useEffect(() => {

}, [dates, props.dates])


  const getTimespanText = (granularity) => {
    let text = ''; 
      for (const grain of granularity) {
        if (grainMatchTypes(grain)) { //days || minutes || weeks || months ...
          let datesDiff = moment(date).diff(moment(secondDate), grain);
          trad = getDynamicTrad(grain, diffDates);
          text = t(trad.assetID, trad.values);
          if (grainIsMinutes(grain)) {
            text = hoursMins(datesDiff);
          }
        }
      }
    return text;
  }



  const getDynamicTrad = (grain, diffDates) => {
    let tradCode = ['Dates', 'TimeSpan', mode, grain].join('_');
    let final = t(tradCode, diffDates);
    if(grainIsMinutes(grain)) {
      let minutes = diffDates.minutes;
      let hours = diffDates.hours;
      final = t(tradCode, {minutes, hours});
    } 

    

    
    return modeTrads;
  }

  const renderDefaultTooltip = () => {
    let displayCondition =
      props.tooltip && !matchingTooltipTypes(props.tooltip);
    return (
      <>
        {displayCondition && (
          <div>
            <div>BASIC</div>
            <Moment
              format={format}
              className={stylesTooltip.tooltip}
              data-tooltip={information}
              date={props.date}
            ></Moment>
          </div>
        )}
      </>
    );
  };

  const renderComposedTooltip = () => {
    let displayCondition = props.tooltip && props.tooltip === "composed";
    return (
      <>
        {displayCondition ? (
          <div className={stylesComposed.wrapper}>
            <div className={stylesComposed.tooltip}></div>
            <div className={stylesComposed.formatter}>
              <Moment
                format={format}
                data-tooltip={information}
                date={props.date}
              ></Moment>
            </div>
          </div>
        ) : undefined}
      </>
    );
  };

  return (
    <>
      {date ? (
        <div className={styles.formatter}>
          {
            // MULTPLE DATES -------------------------------------------------------------------------------------------
            props.tooltip ? (
              <>
                {renderDefaultTooltip()}
                {renderComposedTooltip()}
              </>
            ) : (
              <div>
                <Moment format={format}>{props.date}</Moment>
              </div>
            )
          }
        </div>
      ) : (
        <div className={styles.formatter}>
          <Formatter format={format} style={props.style}>
            {"( " + information + " )"}
          </Formatter>
        </div>
      )}
    </>
  );
};

DateFormatter.propTypes = {};

export default DateFormatter;
