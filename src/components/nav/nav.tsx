import React, { useState } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Toolbar,
  Typography,
  DialogActions,
  Input,
  InputLabel,
  FormGroup
} from "@mui/material";
import "./nav.scss";
import { todoStore } from "../../stores";
import { inject, observer } from "mobx-react";

interface NavProps {
  title?: string;
  className?: string;
}

export const Nav: React.FC<NavProps> = inject(todoStore.storeKey)(
  observer(({ title = "ToDos", className = "" }: NavProps) => {
    const [isAddDialogOpen, setIsAddDialogOpen] =
      useState<boolean>(false);

    const [formData, setFormData] = useState({
      titel: "",
      beschreibung: "",
      deadline: new Date(),
      verfassserID: 1
    });

    const submitForm = () => {
      (async () => {
        await todoStore.addTodo(formData);
        await todoStore.fetchTodos();
      })();
    };

    // fix deadline displayb
    // console.log(formData.deadline.toLocaleString());

    return (
      <div className={`nav ${className}`}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              {title}
            </Typography>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              variant="contained"
              sx={{ marginLeft: 2 }}
            >
              Add Todo
            </Button>
            <Dialog
              open={isAddDialogOpen}
              onClose={() => setIsAddDialogOpen(false)}
            >
              <DialogTitle>Add Todo</DialogTitle>
              <DialogContent>
                <FormGroup>
                  <InputLabel>Titel</InputLabel>
                  <Input
                    className="nav__titel"
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
                    className="nav__beschreibung"
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
                    className="nav__deadline"
                    type="date"
                    value={
                      formData.deadline.toISOString().split("T")[0]
                    }
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
                    className="nav__verfasser-id"
                    value={formData.verfassserID}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        verfassserID: +e.target.value
                      })
                    }
                  />
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    submitForm();
                    setIsAddDialogOpen(false);
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
      </div>
    );
  })
);
