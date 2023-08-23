import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Grid, Typography } from "@mui/material";

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
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper"}}
        >
           <ListItem
           alignItems="center"
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
             <Grid ml={2}>
              <Typography variant="caption">
                      {hour}
              </Typography>
              </Grid>
              </List>
            </>
           
  );
};
