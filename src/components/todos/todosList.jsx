import React, { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from '@mui/material/IconButton';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import ListItemIcon from '@mui/material/ListItemIcon';
import ReplyIcon from '@mui/icons-material/Reply';
import { useAppDispatch } from "../../redux/hooks";
import Swal from 'sweetalert2'
import { deleteTodo } from "../../redux/slices/todosSlice";
import { updateTodo } from "../../redux/slices/todosSlice";
type TodosProps = {
  id: Number,
  title: String,
  completed: Boolean,
  shared_with_id: Number
 };

 
export const TodosList: FC<TodosProps> = ({
  id,
  title,
  completed,
  shared_with_id,
}) => {

  const dispatch = useAppDispatch()

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    e:  MouseEvent<Element, MouseEvent>,
    id: number,
  ) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(id)).then(()=> {
          e.preventDefault()
          Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        })
      }
})
  };

  const handleCheckboxClick = () => {
    completed === 0 ? completed = true : completed = false
    const data = {id, completed}
    dispatch(updateTodo(data))
  }

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
            <ListItemButton 
            selected={selectedIndex === 0}>
              <ListItemIcon>
                <Checkbox
                 edge="end"
                 defaultChecked={ completed === 1 ? true : false}
                 onClick={() => handleCheckboxClick(id, completed)}
                />
              </ListItemIcon>
              <ListItemText primary={`${title}`} 
              onClick={(event) => handleListItemClick(event, id)}/>
            </ListItemButton>
          </ListItem>
        </List>
            </>
  );
};
