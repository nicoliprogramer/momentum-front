import {FC, useEffect,useState} from "react"
import { Grid, Typography, FormControl, TextField, IconButton, Paper, Divider, Box, Container} from "@mui/material"
import {TodosList} from "../../components/todos/todosList"
import { Typetodo } from "./interface/todo.interface"
import { todos } from "../../api/todos"
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createTodo } from "../../redux/slices/todosSlice"

type TodoType = { 
    user_id: string,
    title: string
}
export const HomePage: FC<{}> = () => {

        const dispatch = useAppDispatch()

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
        setMessageBody({...messageBody, user_id: "1", [e.target.name]: e.target.value})
        
    }

const handleSubmit =(e: React.FormEvent<HTMLInputElement>) => {
    dispatch(createTodo(messageBody)).then(()=> {
        e.preventDefault()
    })
     }

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
                                                <TodosList user_id={t.user_id} id={t.id} title={t.title} completed={t.completed} shared_with_id={t.shared_with_id}/>
                                        </Grid>
                                    ))}
                                </>
                            ) : ""}
                    </div>
                </Grid>
                
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid item display="flex" 
                    alignItems="center"
                    justifyContent="center">

                            <FormControl sx={{ width: '32ch' }}>
                                <TextField id="filled-hidden-label-small"
                                    placeholder="Write a new task"
                                    variant="outlined"
                                    size="small"
                                    name="title"
                                    onChange={dataTodo}>
                                </TextField>
                            </FormControl>
                   
                            <IconButton
                            aria-label="send"
                            color="primary"
                            type="submit">
                                <SendIcon />
                        </IconButton>
                    </Grid>
                </Box>
            </Box>
        </Paper>
        </Container>
    </>)
}