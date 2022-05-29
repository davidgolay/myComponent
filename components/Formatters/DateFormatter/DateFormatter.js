import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import moment from "moment";
import PropTypes from "prop-types";
import { hoursMins, grainMatches, matchingTooltipTypes } from "./utils";
import stylesTooltip from "../../../components/Tooltips/tooltip.module.scss";
import stylesComposed from "../../../components/Tooltips/tooltipComposed.module.scss";
import styles from "./dateFormatter.module.scss";
import Formatter, { getStyle } from "../Formatter";
import Tooltip from "../../../components/Tooltips/ToolTip";

const DateFormatter = (props) => {
  const [date, setDate] = useState(props.date ? props.date : null);
  const [dates, setDates] = useState(props.dates ? props.dates : []);
  const [format, setFormat] = useState(
    props.format ? props.format : "DD/MM/YYYY"
  );
  const [granularity, setGranularity] = useState(
    props.granularity ? props.granularity : ["days"]
  );
  const [information, setInformation] = useState("");

  useEffect(() => {

    let elapsedTimeInformation = "";

    if (dates && dates.length > 0) {
      let date1 = dates[0];
      let date2 = moment();

      if (dates.length > 1) {
        date2 = dates[1];
      }
      let arrow = " 🕑 → ";
      for (const grain of granularity) {
        if (grainMatches(grain)) {
          let diff = moment(props.dates[0]).diff(
            moment(props.dates[1]),
            grain.toString()
          );
          if (diff > 0) {
            elapsedTimeInformation = arrow + diff + " " + grain.toString();
            if (grain.toString() === "minutes") {
              elapsedTimeInformation = arrow + hoursMins(diff);
            }
          } else {
            if (diff !== 0) {
              let arrow = " ← 🕑";
              elapsedTimeInformation = -diff + " " + grain.toString() + arrow;
              if (grain.toString() === "minutes") {
                elapsedTimeInformation = hoursMins(-diff) + arrow;
              }
            }
          }
        }
      }
      if (elapsedTimeInformation.charAt(elapsedTimeInformation.length - 1) === ",") {
        elapsedTimeInformation = elapsedTimeInformation.substring(
          0,
          elapsedTimeInformation.length - 1
        );
      }
      setInformation(elapsedTimeInformation);
    }
  }, [dates, granularity, props.dates]);

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
