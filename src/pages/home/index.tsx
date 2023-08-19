import {FC, useEffect,useState} from "react"
import { Grid } from "@mui/material"
import {CheckboxListSecondary} from "../../components/todos/todosList"
import { todosData } from "../../data/todos"
import { Typetodo } from "./interface/todo.interface"

export const HomePage: FC = () => {
        const [allTodo, setAllTodo]= useState<Typetodo[]>([])

   useEffect(()=> {
         setAllTodo(todosData) 
    })

    return( <>
        <Grid container>
            <div>
                <Grid>
                    {allTodo.length !== 0 ? (
                        <Grid sx={{my: 2}}container spacing={2} direction="row">
                            {allTodo?.map((t) => (
                                <Grid item xs={2}>
                                    <CheckboxListSecondary id={t.id} text={t.text} isCompleted={t.isCompleted} isToday={t.isToday} hour={t.hour}/>
                                </Grid>
                            ))}
                        </Grid>
                    ) : ""}
                </Grid>
            </div>
        </Grid>
    </>)
}