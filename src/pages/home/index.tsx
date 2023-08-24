import {FC, useEffect,useState} from "react"
import { Grid, Typography} from "@mui/material"
import {TodosList} from "../../components/todos/todosList"
import { Typetodo } from "./interface/todo.interface"
import { todos } from "../../api/todos"


export const HomePage: FC = () => {
        const [page] = useState(0)
        const [allTodo, setAllTodo]= useState<Typetodo[]>([])

   useEffect(()=> {
        todos.getAll().then((r)=> {
            setAllTodo(r.data.query) 
        })
    }, [page])

    return( <>
        <Grid display="flex" alignItems="center" justifyContent="center" mt={6}>
            <Typography variant="h5">
                Today
            </Typography>
        </Grid>
        <Grid display="flex" 
                                    alignItems="center"
                                    justifyContent="center">
            
            <div>
                    {allTodo.length !== 0 ? (
                        <>
                            {allTodo?.map((t) => (
                                <Grid mt={3}>
                                        <TodosList id={t.id} title={t.title} Completed={t.Completed} shared_with_id={t.shared_with_id}/>
                                </Grid>
                            ))}
                        </>
                    ) : ""}
            </div>
        </Grid>
    </>)
}