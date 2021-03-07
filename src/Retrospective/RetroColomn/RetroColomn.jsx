import React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import RetroItem from "./RetroItem/RetroItem";
import styles from "./RetroColomn.module.css";


const propTypes = {
    title: PropTypes.string,
    color: PropTypes.string
}

class RetroColomn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hideForm: true,
            hideAdd: false,
            value: '',
            list: []
        };

        this.onClickAdd = this.onClickAdd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.getRateCount = this.getRateCount.bind(this);
        this.sortList = this.sortList.bind(this);
    }

    onClickAdd() {
        this.setState(() => {
            return {
                hideForm: false,
                hideAdd: true,
            };
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState(() => {
            return {
                hideForm: true,
                hideAdd: false,
                value: ''
            };
        });
    }
    handleInput(event) {
        this.setState(() => {
            return {
                value: event.target.value
            };
        });
    }
    getRateCount(rateValue = 0, id) {
        this.setState(() => {
            return {
                list: this.state.list.map((item) => {
                    if (item.id === id) {
                        item.rate = rateValue;
                        return item;
                    } else {
                        return item;
                    }
                })
            };
        });
        this.sortList();

    }
    onClickCreate() {
        if (this.state.value !== '') {
            this.setState((state) => {
                return {
                    list: [...state.list, {
                        id: performance.now(),
                        text: state.value,
                        rate: 0
                    }]
                };
            });
        }
        this.sortList();

    }
    sortList() {
        this.setState((state) => {
            return {
                list: state.list.sort((a, b) => {
                    return b.rate - a.rate;
                })
            };
        });

    }

    render() {
        const { title, color } = this.props;
        const { onClickAdd, handleSubmit, onClickCreate, handleInput, getRateCount } = this;
        const { hideForm, hideAdd, value, list } = this.state;
        return (
            <div className={styles["colomn"]} style={{ backgroundColor: color }}>
                <div className={styles["colomn-title"]}>
                    {title} <span>{list.length}</span>
                </div>
                <button
                    className={classnames(
                        styles["colomn-btn"],
                        styles[classnames({ hide: hideAdd })]
                    )}
                    onClick={onClickAdd}> Add </button>
                <form
                    className={classnames(
                        styles["colomn-form"],
                        styles[classnames({ hide: hideForm })]
                    )}
                    onSubmit={handleSubmit} >
                    <input
                        className={styles["colomn-input"]}
                        type="text"
                        placeholder="Enter a comment"
                        value={value}
                        onChange={handleInput}
                    />
                    <button onClick={onClickCreate} className={styles["colomn-create"]}>Create</button>
                    <button className={styles["colomn-cancel"]}>Cancel</button>
                </form>
                <ul className={styles["colomn-list"]}>
                    {list.map(({ id, text }) => <RetroItem key={id} textIntro={text} id={id} rateFunc={getRateCount} />)}
                </ul>
            </div>
        );
    }
}

RetroColomn.propTypes = propTypes;

export default RetroColomn;

