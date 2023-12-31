import { FC} from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { RegisterPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { PrivateRoute } from "./components/privateRoute";

export const AppRouter: FC<{}> = () => {

    return (
        <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={
                <PrivateRoute>
                    <HomePage/>
            </PrivateRoute>
             }/>
        </Routes>
    )
}                        