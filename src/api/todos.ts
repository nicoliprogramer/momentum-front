import { axiosInternal } from "./todos.api"

const endpoint = "/todos/1"

export const todos = {
    getAll: function(){
        return axiosInternal.get(endpoint)
    },
}