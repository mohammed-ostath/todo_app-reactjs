import {createContext, useContext, useReducer} from "react";
import todosReducer from "../reducers/todosReducer";
import {v4 as uuidv4} from "uuid";

export const TodosContext = createContext([]);

const TodosProvider = ({children}) => {
    const [todos, todosDispatch] = useReducer(todosReducer, []);
    return (
        <TodosContext.Provider value={{todos: todos, dispatch: todosDispatch}}>
            {children}
        </TodosContext.Provider>
    );
}

export const useTodos = () => {
   return useContext(TodosContext);
}
export default TodosProvider;
// export const TodosContext = createContext([]);
