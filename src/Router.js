import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import BaseLayout from "./components/BaseLayout";

// ** Import Route Providers
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Locker = lazy(() => import("./pages/Locker"));
const Vesting = lazy(() => import("./pages/Vesting"));
const Bridge = lazy(() => import("./pages/Bridge"));
const LockUp = lazy(() => import("./pages/LockUp"));
const Claim = lazy(() => import("./pages/Claim"));
const Stake = lazy(() => import("./pages/Stake"));
const Zap = lazy(() => import("./pages/Zap"));
const Airdrop = lazy(() => import("./pages/Airdrop"));
const Approver = lazy(() => import("./pages/Approver"));
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
                        <Route path="/dashboard/:network" exact component={Dashboard} />
                        <Route path="/locker" exact component={Locker} />
                        <Route path="/vesting/:wallet/:chainName" exact component={Vesting} />
                        <Route path="/vesting/:wallet" exact component={Vesting} />
                        <Route path="/claim" exact component={Claim} />
                        <Route path="/my-lockers/:wallet" exact component={iLocks} />
                        <Route path="/my-lockers/:wallet/:chainName" exact component={iLocks} />
                        <Route path="/lockers/:chainName" exact component={iLock} />
                        <Route path="/lockers/:chainName/:lockId" exact component={LockUp} />
                        <Route path="/lockup/:chainName" exact component={iLock} />
                        <Route path="/lockup/:chainName/:lockId" exact component={LockUp} />
                        {
                            /*
                             * // <Route path="/lockers/:wallet" exact component={LockUp} />
                            */
                        }
                        <Route path="/airdrop" exact component={Airdrop} />
                        <Route path="/approver" exact component={Approver} />
                        <Route path="/zap" exact component={Zap} />
                        <Route path="/stake" exact component={Stake} />
                        <Route path="/bridge" exact component={Bridge} />
                    </BaseLayout>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
