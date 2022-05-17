import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  Input,
  InputLabel,
  Typography
} from "@mui/material";
import { inject, observer } from "mobx-react";
import { ITodo } from "../../types";
import { todoStore } from "../../stores";
import "./todocard.scss";
import { useState } from "react";

interface TodoCardProps {
  todo: ITodo;
}

export const TodoCard: React.FC<TodoCardProps> = inject(
  todoStore.storeKey
)(
  observer(({ todo }: TodoCardProps) => {
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] =
      useState<boolean>(false);

    const [formData, setFormData] = useState({
      titel: todo.titel,
      beschreibung: todo.beschreibung,
      deadline: todo.deadline,
      verfassserID: todo.verfasserID,
      erledigt: todo.erledigt
    });

    const deleteTodo = () => {
      (async () => {
        await todoStore.deleteTodo(todo.id);
        await todoStore.fetchTodos();
      })();
    };

    const updateTodo = () => {
      (async () => {
        await todoStore.updateTodo(todo.id, formData);
        await todoStore.fetchTodos();
      })();
    };

    return (
      <div className={`todo${todo.erledigt ? "__completed" : ""}`}>
        <Card sx={{ maxWidth: 345, margin: 3 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {todo.titel}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {todo.titel}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => setIsUpdateDialogOpen(true)}>
              Edit
            </Button>
            <Button onClick={() => deleteTodo()}>Delete</Button>
          </CardActions>
        </Card>
        <Dialog
          open={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
        >
          <DialogTitle>Update Todo</DialogTitle>
          <DialogContent>
            <FormGroup>
              <InputLabel>Titel</InputLabel>
              <Input
                className="todo__titel"
                value={formData.titel}
                onChange={e =>
                  setFormData({
                    ...formData,
                    titel: e.target.value
                  })
                }
              />
              <InputLabel>Beschreibung</InputLabel>
              <Input
                className="todo__beschreibung"
                value={formData.beschreibung}
                onChange={e =>
                  setFormData({
                    ...formData,
                    beschreibung: e.target.value
                  })
                }
              />
              <InputLabel>Deadline</InputLabel>
              <Input
                className="todo__deadline"
                type="date"
                value={formData.deadline.toString().split("T")[0]}
                onChange={e => {
                  const parts = e.target.value.split("-");
                  console.log(parts);

                  setFormData({
                    ...formData,
                    deadline: new Date(
                      +parts[0],
                      +parts[1] - 1,
                      +parts[2]
                    )
                  });
                }}
              />
              <InputLabel>Verfasser ID</InputLabel>
              <Input
                className="todo__verfasser-id"
                value={formData.verfassserID}
                onChange={e =>
                  setFormData({
                    ...formData,
                    verfassserID: +e.target.value
                  })
                }
              />
              <InputLabel>Erledigt</InputLabel>
              <Checkbox
                className="todo__erledigt"
                checked={formData.erledigt}
                onChange={e => {
                  setFormData({
                    ...formData,
                    erledigt: e.target.checked
                  });
                }}
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                updateTodo();
                setIsUpdateDialogOpen(false);
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  })
);
