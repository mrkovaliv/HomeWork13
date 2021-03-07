import React, { useState } from "react";
import PropTypes from 'prop-types';
import styles from "./SearchText.module.css";

const propTypes = {

    getSelectedBold: PropTypes.func
}


const SearchText = ({ getSelectedBold }) => {
    const [value, setValue] = useState("");
    const onChangeValue = (event) => {
        setValue(event.target.value);
        getSelectedBold(event.target.value);
    };
    const onClickSearch = () => {
        getSelectedBold(value);
    };

    return (
        <div className={styles["todo-search"]}>
            <input
                onChange={onChangeValue}
                className={styles["todo-searchInput"]}
                value={value}
                type="text"
                placeholder="Search text in todos"
            />
            <button onClick={onClickSearch} className={styles["todo-searchBtn"]}> Search </button>
        </div>
    );
};

SearchText.propTypes = propTypes;


export default SearchText;
