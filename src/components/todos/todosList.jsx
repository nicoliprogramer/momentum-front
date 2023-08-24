import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import ListItemIcon from '@mui/material/ListItemIcon';
import ReplyIcon from '@mui/icons-material/Reply';

type TodosProps = {
  id: Number,
  title: String,
  Completed: Boolean,
  shared_with_id: Number
 };

export const TodosList: FC<TodosProps> = ({
  id,
  title,
  Completed,
  shared_with_id,
}) => {

  
  return (
        <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem
            key={id}
            secondaryAction={
              <IconButton edge="end">
                {shared_with_id !== null ? (<GroupAddSharpIcon />) : (<ReplyIcon/>)}
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton>
              
              <ListItemIcon>
                <Checkbox
                   edge="end"
                 inputProps={{ "aria-labelledby": Completed === 0 ? "#E9E9EF" : "#0EA5E9" }}
                />
                
              </ListItemIcon>
              
              <ListItemText primary={`${title}`} />

            </ListItemButton>
            
          </ListItem>
          <Grid ml={9}>
            {/* <ListItemText secondary={`${hour}`}/> */}
          </Grid>
        </List>
            </>
  );
};
