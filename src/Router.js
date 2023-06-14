import React, { Suspense, lazy } from "react";
import BaseLayout from "./components/BaseLayout";
import { createBrowserHistory } from "history";
import Spinner from "./components/Spinner";
import { Redirect } from 'react-router';
import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from "react-router-dom";
const Swipe = lazy(() => import("./pages/Swipe"));
const Bridge = lazy(() => import("./pages/Bridge"));
const LockUp = lazy(() => import("./pages/LockUp"));
const Swap = lazy(() => import("./pages/Swap/swap"));
const iLock = lazy(() => import("./pages/Dashboard"));
const Transport = lazy(() => import("./pages/Bridge"));
const iLocks = lazy(() => import("./pages/MyLockers"));
const Migrations = lazy(() => import("./pages/Migrator"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Demo = lazy(() => import("./pages/Demo"));
const BridgeV2 = lazy(() => import("./pages/CrossChainV2"));
const CrossChain = lazy(() => import("./pages/CrossChain"));

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
                        <Route path="/my-lockers/:wallet/:chainName" exact element={<iLocks />} />
                        <Route path="/lockers/:chainName/:lockId" exact element={<LockUp />} />
                        <Route path="/lockup/:chainName/:lockId" exact element={<LockUp />} />
                        <Route path="/locks/:chainName/:lockId" exact element={<iLocks />} />
                        <Route path="/bridge" element={<Navigate to="/iBridge" replace />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/transport" exact element={<Transport />} />
                        <Route path="/migrator" exact element={<Migrations />} />
                        <Route path="/iBridge" exact element={<BridgeV2 />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/v2" exact element={<BridgeV2 />} />
                        <Route path="/swipe" exact element={<Swipe />} />
                        <Route path="/swap" exact element={<Swap />} />
                    </Routes>
                    </BaseLayout>
            </Suspense>
        </Router>
    );
};
export default AppRouter;