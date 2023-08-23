import {FC, useEffect,useState} from "react"
import { Grid } from "@mui/material"
import {TodosList} from "../../components/todos/todosList"
import { todosData } from "../../data/todos"
import { Typetodo } from "./interface/todo.interface"

export const HomePage: FC = () => {
        const [allTodo, setAllTodo]= useState<Typetodo[]>([])

   useEffect(()=> {
         setAllTodo(todosData) 
    })

    return( <>
        <Grid container display="flex" 
                                    alignItems="center"
                                    justifyContent="center">
            <div>
                    {allTodo.length !== 0 ? (
                        <>
                            {allTodo?.map((t) => (
                                <Grid mt={3}>
                                        <TodosList id={t.id} text={t.text} isCompleted={t.isCompleted} isToday={t.isToday} hour={t.hour}/>
                                </Grid>
                            ))}
                        </>
                    ) : ""}
            </div>
        </Grid>
    </>)
}