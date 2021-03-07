import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import SearchText from "./SearchText/SearchText";
import styles from "./Todos.module.css";

// Якщо створити декілька карток і якщо одну з них позначити як виконану то всі інші створені картки
// позначаться теж як виконані це через те що в них з сервера приходить однаковий id при створені 
// бо по-факту нова картка не створюється на сервері, тобто якщо б вона створювалася на сервері
// тоді б приходив у всіх новостворених карток різний id і тоді б не було такої проблеми
// також через те що в них однаковий id я як key для кожної картки робив id + performance.now()

class ToDos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            todos: [],
            userId: 1,
            value: "",
            keywords: "",
        };

        this.textInputRef = React.createRef();

        this.loadUsers = this.loadUsers.bind(this);
        this.loadTodo = this.loadTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
        this.focusInput = this.focusInput.bind(this);
        this.getSelectedBold = this.getSelectedBold.bind(this);
        this.setCompleted = this.setCompleted.bind(this);
    }

    loadUsers() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) =>
                this.setState(() => {
                    return {
                        users: data,
                    };
                })
            );
    }

    handleChange(event) {
        this.setState(() => {
            return {
                userId: event.target.value,
            };
        });
    }

    focusInput() {
        this.textInputRef.current.focus();
    }

    onClickCreate() {
        if (this.state.value !== "") {
            fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                body: JSON.stringify({
                    userId: this.state.userId,
                    title: this.state.value,
                    completed: false,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) =>
                    this.setState(() => {
                        return {
                            todos: [...this.state.todos, json],
                        };
                    })
                );

            this.setState(() => {
                return {
                    value: "",
                };
            });
            this.focusInput();
        }
    }

    loadTodo() {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${this.state.userId}`)
            .then((response) => response.json())
            .then((data) =>
                this.setState(() => {
                    return {
                        todos: data,
                    };
                })
            );
    }
    handleInput(event) {
        this.setState(() => {
            return {
                value: event.target.value,
            };
        });
    }
    setCompleted(todoId) {
        this.setState(() => {
            return {
                todos: this.state.todos.map((item) => {
                    if (item.id === todoId) {
                        item.completed = true;
                        return item;
                    } else {
                        return item;
                    }
                }),
            };
        });
    }

    componentDidMount() {
        this.loadUsers();
        this.loadTodo();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.userId !== prevState.userId) {
            this.loadTodo();
        }
    }

    getSelectedBold(text) {
        this.setState(() => {
            return {
                keywords: text,
            };
        });
    }

    render() {
        const { } = this.props;
        const { handleInput, handleChange, onClickCreate, textInputRef, setCompleted, getSelectedBold } = this;
        const { users, userId, todos, value, keywords } = this.state;

        return (
            <div className={styles["todo"]}>
                <select value={userId} className={styles["todo-select"]} onChange={handleChange} >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <input
                    onChange={handleInput}
                    ref={textInputRef}
                    className={styles["todo-addInput"]}
                    value={value}
                    type="text"
                    placeholder="Type new todo here"
                />
                <button onClick={onClickCreate} className={styles["todo-addBtn"]}> Add </button>
                <SearchText getSelectedBold={getSelectedBold} />
                <ul className={styles["todo-list"]}>
                    {todos.map((todo, index) => (
                        <TodoItem
                            key={todo.id + performance.now()}
                            setCompleted={setCompleted}
                            todo={todo}
                            keywords={keywords}
                            number={index + 1}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default ToDos;
