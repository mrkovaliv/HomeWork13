import React from "react";
import PropTypes from 'prop-types';
import styles from "./ForecastElement.module.css";

const propTypes = {
    location: PropTypes.string,
    commonState: PropTypes.string,
    axTemper: PropTypes.string,
    minTemper: PropTypes.string,
    pressure: PropTypes.string,
    humidity: PropTypes.string,
    winterSpeed: PropTypes.string,
    winterDirec: PropTypes.string,
    precip: PropTypes.string,
    date: PropTypes.string
}

class ForecastElement extends React.Component {
    constructor(props) {
        super(props);

        this.getCommonState = this.getCommonState.bind(this);
        this.getNormalDate = this.getNormalDate.bind(this);
    }
    static #NAMESDAY = [
        "Неділя",
        "Понеділок",
        "Вівторок",
        "Середа",
        "Четвер",
        "П'ятниця",
        "Субота",
    ];
    static #NAMESMonth = [
        "січня",
        "лютого",
        "березня",
        "квітня",
        "травня",
        "червня",
        "липня",
        "серпня",
        "вересня",
        "жовтня",
        "листопада",
        "грудня",
    ];

    getNormalDate(date) {
        let day = 0;
        let month = 0;
        let year = +(date[6] + date[7] + date[8] + date[9]);
        day = isNaN(+(date[0] + date[1]))
            ? (day = +date[1])
            : (day = +(date[0] + date[1]));
        month = isNaN(+(date[3] + date[4]))
            ? (month = +date[4])
            : (month = +(date[3] + date[4]));
        let currentDate = new Date(year, month - 1, day);

        let nameDay = ForecastElement.#NAMESDAY[currentDate.getDay()];
        let nameMonth = ForecastElement.#NAMESMonth[currentDate.getMonth()];
        return `${nameDay}, ${day} ${nameMonth} ${year} року`;
    }
    getCommonState(state) {
        switch (state) {
            case "хмарно":
                return "./clouds.png";
            case "ясно":
                return "./sunny.png";
            case "гроза":
                return "./storm.png";
            case "дощ":
                return "./rainy.png";
            case "сніг":
                return "./snow.png";
            case "похмуро":
                return "./cloudy.png";
            default:
                return "";
        }
    }
    render() {
        const { getCommonState, getNormalDate } = this;
        const {
            location,
            commonState,
            maxTemper,
            minTemper,
            pressure,
            humidity,
            winterSpeed,
            winterDirec,
            precip,
            date,
        } = this.props;

        return (
            <div className={styles["weather__item"]}>
                <div className={styles["weather__top"]}>
                    <div className={styles["weather__top-info"]}>
                        <div className={styles["weather__top-location"]}>
                            <img src="./location.png" />
                            {location}
                        </div>
                        <div className={styles["weather__top-temper"]}>
                            <div className={styles["weather__top-mintemper"]}>
                                мін. <br /> <span>{maxTemper}°</span>
                            </div>
                            <div className={styles["weather__top-maxtemper"]}>
                                мaкс. <br /> <span>{minTemper}°</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles["weather__top-img"]}>
                        <img src={getCommonState(commonState)} />
                    </div>
                </div>
                <div className={styles["weather__character"]}>
                    <div className={styles["weather__pressure"]}>
                        Атмосферний тиск: <span>{pressure} мм</span>
                    </div>
                    <div className={styles["weather__humidity"]}>
                        Відносна вологість: <span>{humidity}%</span>
                    </div>
                    <div className={styles["weather__winter-speed"]}>
                        Швидкість вітру: <span>{winterSpeed} м/сек</span>
                    </div>
                    <div className={styles["weather__winter-direction"]}>
                        Напрямок вітру: <span>{winterDirec}</span>
                    </div>
                    <div className={styles["weather__precip"]}>
                        Ймовірність опадів: <span>{precip}%</span>
                    </div>
                </div>
                <div className={styles["weather__date"]}>
                    Дата: <br />
                    <span>{getNormalDate(date)}</span>
                </div>
            </div>
        );
    }
}

ForecastElement.propTypes = propTypes;


export default ForecastElement;
