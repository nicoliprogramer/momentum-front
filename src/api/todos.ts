import { axiosInternal } from "./todos.api"

const id = localStorage.getItem("id")
const endpoint = `/todos/${id}`

export const todos = {
    getAll: function(){
        return axiosInternal.get(endpoint)
    },
}