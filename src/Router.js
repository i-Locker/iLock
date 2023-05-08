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
const CrossChain = lazy(() => import("./pages/CrossChain"));
const Bridge = lazy(() => import("./pages/Bridge"));
const LockUp = lazy(() => import("./pages/LockUp"));
const iLocks = lazy(() => import("./pages/MyLockers"));
const iLock = lazy(() => import("./pages/Dashboard"));
const Swipe = lazy(() => import("./pages/Swipe"));
const Migrations = lazy(() => import("./pages/Migrator"));
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
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/my-lockers/:wallet/:chainName" exact element={<iLocks />} />
                        <Route path="/swipe" exact element={<Swipe />} />
                        <Route path="/locks/:chainName/:lockId" exact element={<iLocks />} />
                        <Route path="/lockers/:chainName/:lockId" exact element={<LockUp />} />
                        <Route path="/lockup/:chainName/:lockId" exact element={<LockUp />} />
                        <Route path="/bridge" element={<Navigate to="/iBridge" replace />} />
                        <Route path="/migrator" exact element={<Migrations />} />
                        <Route path="/iBridge" exact element={<CrossChain />} />
                    </Routes>
                    </BaseLayout>
            </Suspense>
        </Router>
    );
};

export default AppRouter;