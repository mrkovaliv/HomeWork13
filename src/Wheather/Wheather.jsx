import React from "react";
import styles from "./Wheather.module.css";
import ForecastElement from "./Forecast/ForecastElement";

class Wheather extends React.Component {
  constructor(props) {
    super(props);

    this.getconvertedDate = this.getconvertedDate.bind(this);
  }

  getconvertedDate(nday = 0) {
    let rez = "";
    let today = new Date();
    const nDate = new Date(today);
    nDate.setDate(nDate.getDate() + nday);
    if (nDate.getDate() > 9) {
      rez += `${nDate.getDate()}/`;
    } else {
      rez += `0${nDate.getDate()}/`;
    }
    if (nDate.getMonth() + 1 > 9) {
      rez += `${nDate.getMonth() + 1}/`;
    } else {
      rez += `0${nDate.getMonth() + 1}/`;
    }

    rez += nDate.getFullYear();

    return rez;
  }
  render() {
    const { getconvertedDate } = this;
    return (
      <div className={styles['weather__list']}>
        <ForecastElement
          location="Миколаїв"
          commonState="хмарно"
          maxTemper="+0"
          minTemper="-7"
          pressure="760"
          humidity="87"
          winterSpeed="1.90"
          winterDirec="східний"
          precip="73"
          date={getconvertedDate()}
        />
        <ForecastElement
          location="Миколаїв"
          commonState="ясно"
          maxTemper="+7"
          minTemper="-2"
          pressure="800"
          humidity="56"
          winterSpeed="2.90"
          winterDirec="північний"
          precip="11"
          date={getconvertedDate(1)}
        />
        <ForecastElement
          location="Миколаїв"
          commonState="сніг"
          maxTemper="-3"
          minTemper="-10"
          pressure="770"
          humidity="73"
          winterSpeed="3.30"
          winterDirec="західний"
          precip="67"
          date={getconvertedDate(2)}
        />
        <ForecastElement
          location="Миколаїв"
          commonState="дощ"
          maxTemper="+4"
          minTemper="+0"
          pressure="760"
          humidity="90"
          winterSpeed="4.0"
          winterDirec="східний"
          precip="97"
          date={getconvertedDate(3)}
        />
        <ForecastElement
          location="Миколаїв"
          commonState="гроза"
          maxTemper="+8"
          minTemper="+1"
          pressure="750"
          humidity="87"
          winterSpeed="3.20"
          winterDirec="північний"
          precip="98"
          date={getconvertedDate(4)}
        />
        <ForecastElement
          location="Миколаїв"
          commonState="ясно"
          maxTemper="+20"
          minTemper="+4"
          pressure="740"
          humidity="87"
          winterSpeed="1.90"
          winterDirec="південний"
          precip="10"
          date={getconvertedDate(5)}
        />
        <ForecastElement
          location="Миколаїв"
          commonState="похмуро"
          maxTemper="+10"
          minTemper="+0"
          pressure="794"
          humidity="76"
          winterSpeed="3.90"
          winterDirec="східний"
          precip="47"
          date={getconvertedDate(6)}
        />
      </div>
    );
  }
}

export default Wheather;