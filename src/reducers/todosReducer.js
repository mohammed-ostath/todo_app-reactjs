import {v4 as uuidv4} from "uuid";

export default function reducer(currentTodos, action) {
    switch (action.type) {
        case "added": {
            const newTodo = {
                id: uuidv4(), title: action.payload.title, details: "", isCompleted: false,
            };
            const updatedTodos = [...currentTodos, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;

        }
        case "deleted": {
            const updatedTodos = currentTodos.filter((t) => {
                return t.id !== action.payload.id;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;

        }
        case "updated": {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    return {...t, title: action.payload.title, details: action.payload.details};
                }
                return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        // case "get": {
        //     const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        //     return storageTodos;
        // }

        case "toggledCompleted": {
            const updatedTodos = currentTodos.map((t) => {
                if (t.id === action.payload.id) {
                    if (t.isCompleted === true) {
                        t.isCompleted = false;
                    } else {
                        t.isCompleted = true;
                    }
                }

                return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case "load": {
            return action.payload.todos;
        }

        default: {
            throw Error("no action type" + action.type);
        }
    }
    return [];
}