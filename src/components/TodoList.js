import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import { Spa } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useEffect } from "react";
import { useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../contexts/ToastContext";
export default function TodoList() {
  console.log("re-render");
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState(null);
  const [titleInput, setTitleInput] = useState();
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

  // completed
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  // non completed
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    console.log("hi use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    showHideToast("تمت الاضافة بنجاح");
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setTodoToBeDeleted(todo);
    setShowDeleteDialog(true);
  }
  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleDeleteDialogColse() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    // const updatedTodos = todos.filter((t) => t.id !== todoToBeDeleted?.id);
    const updatedTodos = todos.filter((t) => {
      return t.id !== dialogTodo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
    showHideToast("تم الحذف بنجاح");
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === dialogTodo.id) {
        return { ...t, title: dialogTodo.title, details: dialogTodo.details };
      }
      return t;
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast("تم التحديث بنجاح");
  }
  const todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <React.Fragment>
      {/* delete modal  */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogColse}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          سيتم حذف المهمة {todoToBeDeleted?.title} هل انت متأكد من ذلك؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لن تتمكن من استرجاعها مرة اخرى
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogColse}>رفض</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete modal  */}

      {/* update modal  */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          سيتم تعديل المهمة {dialogTodo?.title} هل انت متأكد من ذلك؟
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo?.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo?.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>رفض</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* update modal  */}

      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }} style={{ maxHeight: "80vh" }}>
          <CardContent>
            <Typography variant="h2">مهامي</Typography>
            <Divider />
            {/* filter buttons  */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "30px" }}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              value={displayedTodosType}
              color="primary"
            >
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="non-completed">الغير منجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* filter buttons  */}

            {/* all todos */}
            {todosJsx}
            {/* all todos */}

            {/* add and input */}
            <Grid container style={{ marginTop: "20px" }} spacing={3}>
              <Grid
                size={8}
                display="flex"
                justifyContent={"space-around"}
                alignItems={"center"}
                style={{}}
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => {
                    setTitleInput(e.target.value);
                  }}
                />
              </Grid>

              <Grid
                size={4}
                display="flex"
                justifyContent={"space-around"}
                alignItems={"center"}
                style={{}}
              >
                <Button
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={(titleInput ?? "").length === 0}
                  style={{ width: "100%", height: "100%" }}
                  variant="contained"
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
            {/* add and input */}
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}
