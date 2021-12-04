import React from "react";
import { BrowserRouter as Router, HashRouter, Redirect, Route, Switch } from "react-router-dom";
import MainForm from "./MainForm";
import EditForm from "./EditForm";

const MainRoutes = () => {
    return (
        <Router>
            <HashRouter>
                <Switch>
                    <Route exact path="/"><Redirect to="/doctors" /></Route>
                    <Route path="/doctors" exact render={() => <MainForm /> } />
                    <Route path="/doctor/:id" exact render={( routeProps ) => <EditForm { ...routeProps } /> } />
                </Switch>
            </HashRouter>
        </Router>
    )
}

export default MainRoutes;