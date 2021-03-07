import React from "react";
import PropTypes from 'prop-types';
import styles from "./RetroItem.module.css";

const propTypes = {
    textIntro: PropTypes.string,
    id: PropTypes.number,
    rateFunc: PropTypes.func
}

class RetroItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rate: 0,
            date: this.getDateCreate()
        };

        this.plusRate = this.changeRate.bind(this, 1);
        this.minusRate = this.changeRate.bind(this, -1);
        this.getDateCreate = this.getDateCreate.bind(this);
    }

    changeRate(n) {
        this.setState((prevState) => {
            this.props.rateFunc(prevState.rate + n, this.props.id);
            return {
                rate: prevState.rate + n,
            };
        });
    }
    getDateCreate() {
        let today = new Date();
        let rez = `Time: ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}  
              ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

        return rez;
    }

    render() {
        const { textIntro } = this.props;
        const { plusRate, minusRate } = this;
        const { rate, date } = this.state;

        return (
            <li className={styles["card"]}>
                <div className={styles["card-text"]}>{textIntro}</div>
                <div className={styles["card-bottom"]}>
                    <div className={styles["card-date"]}>{date}</div>
                    <div className={styles["card-btns"]}>
                        <span className={styles["card-num"]}>{rate}</span>
                        <button className={styles["card-plus"]} onClick={plusRate}>
                            <img src="./add.png" alt="like" />
                        </button>
                        <button className={styles["card-minus"]} onClick={minusRate}>
                            <img src="./minus.png" alt="dislike" />
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}

RetroItem.propTypes = propTypes;

export default RetroItem;
