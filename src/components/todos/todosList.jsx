import { FC, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Grid, Stack } from "@mui/material";

type TodosProps = {
  id: Number,
  text: String,
  isCompleted: Boolean,
  isToday: Boolean,
  hour: String,
};

export const CheckboxListSecondary: FC<TodosProps> = ({
  id,
  text,
  isCompleted,
  isToday,
  hour,
}) => {

  return (
        <List
        style={{ display: 'flex', flexDirection: 'row', padding: 0 }}
          dense
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
        >
          <ListItem
            key={id}
            secondaryAction={
              <Checkbox
                edge="end"
                inputProps={{ "aria-labelledby": isCompleted }}
              />
            }
            disablePadding
          >
            <ListItemButton> 
              <ListItemText
                id={id}
                primary={`${text}`}
              />
            </ListItemButton>
          </ListItem>
        </List>
  );
};
