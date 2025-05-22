import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import MySnackBar from "./components/MySnackBar";
import { ToastProvider } from "./contexts/ToastContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Tajawal"],
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});
const initialTodos = [
  {
    id: uuidv4(),
    title: "المهمة الاولى",
    details: "التفاصيل الخاصة بالمهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الاولى",
    details: "التفاصيل الخاصة بالمهمة الاولى",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "المهمة الاولى",
    details: "التفاصيل الخاصة بالمهمة الاولى",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          className="App"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#191b1f",
            direction: "rtl",
          }}
        >
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
