import {FC, useEffect,useState} from "react"
import { Grid, Typography, FormControl, TextField, IconButton, Paper, Divider, Box, Container} from "@mui/material"
import {TodosList} from "../../components/todos/todosList"
import { Typetodo } from "./interface/todo.interface"
import { todos } from "../../api/todos"
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector } from 'react-redux'
import { createTodo } from "../../redux/slices/todosSlice"

type TodoType = { 
    user_id: string,
    title: string
}
export const HomePage: FC = () => {

        const dispatch = useDispatch()

        const [page] = useState(0)
        const [allTodo, setAllTodo]= useState<Typetodo[]>([])
        const [messageBody, setMessageBody] = useState<TodoType>({
        user_id: "",
        title: ""
    })

   useEffect(()=> {
        todos.getAll().then((r)=> {
            setAllTodo(r.data.query)             
        })
    }, [page])

const dataTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageBody({...messageBody, [e.target.name]: e.target.value})
    }

// const handleSubmit =(e: React.FormEvent<HTMLInputElement>) => {
//     e.preventDefault()

//     dispatch(createTodo(messageBody))
//     }

    return( <>
        <Container  maxWidth="xs">
        <Paper elevation={3}>
            <Box p={3}>
            <Grid display="flex" alignItems="center" justifyContent="center" container sx={{mb:1}}>
                <Typography variant="h5">
                    Today
                </Typography>
            </Grid>
                            <Divider/>

            <Grid item display="flex" 
                alignItems="center"
                justifyContent="center">
                <div>
                        {allTodo.length !== 0 ? (
                            <>
                                {allTodo?.map((t) => (
                                    <Grid container>
                                            <TodosList id={t.id} title={t.title} Completed={t.Completed} shared_with_id={t.shared_with_id}/>
                                    </Grid>
                                ))}
                            </>
                        ) : ""}
                </div>
            </Grid>
            <Grid container display="flex" alignItems="center" justifyContent="center" sx={{mt:1}}>
                <Grid>
                        <FormControl sx={{ width: '35ch' }}>
                            <TextField id="filled-hidden-label-small"
                                defaultValue="Small"
                                placeholder="Write a new task"
                                variant="outlined"
                                size="small"
                                onChange={dataTodo}>
                                
                            </TextField>
                        </FormControl>
                </Grid>
                <Grid>
                    <IconButton
                        aria-label="send"
                        color="primary"                        >
                            <SendIcon />
                    </IconButton>
                </Grid>
            </Grid>
            </Box>
        </Paper>
        </Container>
    </>)
}