import PropTypes from 'prop-types';
import classnames from "classnames";
import withTodoItem from "./withTodoItem";
import styles from "./TodoItem.module.css";



const propTypes = {

    number: PropTypes.number,
    onClickBtn: PropTypes.func,
    todo: PropTypes.object,
    makeBoldText: PropTypes.func
    
}

const TodoItem = ({ todo, number, onClickBtn, makeBoldText }) => {

    return <li className={classnames(
        styles["todoItem"],
        styles[classnames({ 'todoItem-done': todo.completed })]
    )}>
        <span className={styles["todoItem-number"]}>{number}</span>
        <span dangerouslySetInnerHTML={{ __html: makeBoldText(todo.title) }} className={styles["todoItem-text"]} />
        <button className={classnames(
            styles["todoItem-btn"],
            styles[classnames({ 'hide': todo.completed })]
        )} onClick={onClickBtn} >x</button>
    </li>;
};

TodoItem.propTypes = propTypes;

export default withTodoItem(TodoItem);
