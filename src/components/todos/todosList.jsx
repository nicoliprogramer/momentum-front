import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import ListItemIcon from '@mui/material/ListItemIcon';

type TodosProps = {
  id: Number,
  text: String,
  isCompleted: Boolean,
  isToday: Boolean,
  hour: String,
};

export const TodosList: FC<TodosProps> = ({
  id,
  text,
  isCompleted,
  isToday,
  hour,
}) => {

  return (
        <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem
            key={id}
            secondaryAction={
              <IconButton edge="end">
                <GroupAddSharpIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              
              <ListItemIcon>
                <Checkbox
                   edge="end"
                 inputProps={{ "aria-labelledby": isCompleted }}
                />
                
              </ListItemIcon>
              
              <ListItemText primary={`${text}`} />

            </ListItemButton>
            
          </ListItem>
          <Grid ml={9}>
          <ListItemText secondary={`${hour}`}/>
          </Grid>
        </List>
            </>
  );
};
