import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import BaseLayout from "./components/BaseLayout";

// ** Import Route Providers
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Locker = lazy(() => import("./pages/Locker"));
const Bridge = lazy(() => import("./pages/Bridge"));
const LockUp = lazy(() => import("./pages/LockUp"));
const iLocks = lazy(() => import("./pages/MyLockers"));
const iLock = lazy(() => import("./pages/Dashboard"));

const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
});

const AppRouter = () => {
    return (
        <Router history={history}>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/dashboard" />
                    </Route>
                    <BaseLayout>
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/locker" exact component={Locker} />
                        <Route path="/my-lockers/:wallet/:chainName" exact component={iLocks} />
                        <Route path="/lockers/:chainName/:lockId" exact component={LockUp} />
                        <Route path="/lockup/:chainName/:lockId" exact component={LockUp} />
                        <Route path="/bridge" exact component={Bridge} />
                    </BaseLayout>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
