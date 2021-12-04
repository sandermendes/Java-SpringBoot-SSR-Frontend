import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import MainForm from "./MainForm";
import EditForm from "./EditForm";

const MainRoutes = () => {
    return (
        <Switch>
            <Route path="/" element={ <Navigate replace to="/doctors" /> } />
            <Route path="/doctors" exact={ true } element={ <MainForm /> } />
            <Route path="/doctor/:id" exact={ true } element={ <EditForm /> } />
        </Switch>
    )
}

export default MainRoutes;