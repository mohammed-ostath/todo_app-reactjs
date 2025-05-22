import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
// import Stack from '@mui/material/Stack';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useContext} from "react";
import {useTodos} from "../contexts/todosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import {useToast} from "../contexts/ToastContext";
import {ToastContext} from "../contexts/ToastContext";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

export default function Todo({todo, showDelete, showUpdate}) {
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const {todos, dispatch} = useTodos();
    const {showHideToast} = useContext(ToastContext);
    const [updatedTodo, setUpdatedTodo] = useState({
        title: todo.title,
        details: todo.details,
    });

    function handleCheckClick() {
        dispatch({type: "toggledCompleted", payload: todo});
        showHideToast("تم التعديل بنجاح");
    }

    function handleDeleteClick() {
        showDelete(todo);
    }

    function handleUpdateClick() {
        showUpdate(todo);
    }

    return (
        <>
            <Card
                className="todoCard"
                sx={{
                    minWidth: 275,
                    background: "#283593",
                    color: "white",
                    marginTop: 5,
                }}
            >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Typography
                                variant="h5"
                                sx={{
                                    textAlign: "right",
                                    textDecoration: todo.isCompleted ? "line-through" : "none",
                                }}
                            >
                                {todo.title}
                            </Typography>{" "}
                            <Typography variant="h6" sx={{textAlign: "right"}}>
                                {todo.details}{" "}
                            </Typography>
                        </Grid>
                        {/* action buttons */}
                        <Grid size={4}>
                            <IconButton
                                onClick={() => {
                                    handleUpdateClick();
                                }}
                                className="iconButton"
                                aria-label="delete"
                                style={{
                                    color: todo.isCompleted ? "white" : "#8bc34a",
                                    background: todo.isCompleted ? "#8bc34a" : "white",
                                    border: "solid #8bc34a 3px",
                                }}
                            >
                                <CheckIcon/>
                            </IconButton>{" "}
                            <IconButton
                                onClick={() => {
                                    setShowUpdateDialog(true);
                                    setUpdatedTodo({title: todo.title, details: todo.details}); // جلب البيانات القديمة للمودال
                                }}
                                className="iconButton"
                                aria-label="delete"
                                style={{
                                    color: "#1769aa",
                                    background: "white",
                                    border: "solid #1769aa 3px",
                                }}
                            >
                                <ModeEditOutlineOutlinedIcon/>
                            </IconButton>{" "}
                            <IconButton
                                className="iconButton"
                                aria-label="delete"
                                style={{
                                    color: "#b23c17",
                                    background: "white",
                                    border: "solid #b23c17 3px",
                                }}
                                onClick={handleDeleteClick}
                            >
                                <DeleteOutlinedIcon/>
                            </IconButton>
                        </Grid>
                        {/* action buttons */}
                    </Grid>
                    {/* <Divider /> */}
                </CardContent>
            </Card>
        </>
    );
}
