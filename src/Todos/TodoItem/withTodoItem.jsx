import React from "react";
import PropTypes from 'prop-types';

const propTypes = {

    number: PropTypes.number,
    setCompleted: PropTypes.func,
    todo: PropTypes.object,
    keywords: PropTypes.string

}

const withTodoItem = (Component) => {
    class withTodoItem extends React.Component {
        constructor(props) {
            super(props);

            this.markAsDone = this.markAsDone.bind(this);
            this.makeBoldText = this.makeBoldText.bind(this);
        }

        markAsDone() {
            if (this.props.todo.completed === false) {
                fetch(`https://jsonplaceholder.typicode.com/todos/${this.props.todo.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: true,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })

                this.props.setCompleted(this.props.todo.id)

            }
        }
        makeBoldText(item) {
            return item.replace(new RegExp(this.props.keywords, 'gi'), `<b>${this.props.keywords}</b>`);
        }


        render() {
            const { todo, number } = this.props;
            const { markAsDone, makeBoldText } = this;

            return <Component todo={todo} number={number} makeBoldText={makeBoldText} onClickBtn={markAsDone} />
        }
    }

    withTodoItem.propTypes = propTypes;

    return withTodoItem;

}



export default withTodoItem;