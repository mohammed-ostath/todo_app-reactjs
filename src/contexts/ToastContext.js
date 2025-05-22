import { createContext } from "react";
import TodoList from "../components/TodoList";
import { useState } from "react";
import MySnackBar from "../components/MySnackBar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState();
  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = useContext(ToastContext);
