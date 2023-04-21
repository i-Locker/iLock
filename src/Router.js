import React, { Suspense, lazy } from "react";
import Spinner from "./components/Spinner";
import BaseLayout from "./components/BaseLayout";
import { Redirect } from 'react-router'
// ** Import Route Providers
import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from "react-router-dom";
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
                    <BaseLayout>
                    <Routes>
                        <Route path="/" element={<Navigate  to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/locker" exact component={Locker} />
                        <Route path="/my-lockers/:wallet/:chainName" exact component={iLocks} />
                        <Route path="/lockers/:chainName/:lockId" exact component={LockUp} />
                        <Route path="/lockup/:chainName/:lockId" exact component={LockUp} />
                        <Route path="/bridge" exact component={Bridge} />
                    </Routes>
                    </BaseLayout>
            </Suspense>
        </Router>
    );
};

export default AppRouter;
