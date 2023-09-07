import { FC} from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { RegisterPage } from "./pages/register";

export const AppRouter: FC<{}> = () => {

    return (
        <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<HomePage/>}/> 
        </Routes>
    )
}