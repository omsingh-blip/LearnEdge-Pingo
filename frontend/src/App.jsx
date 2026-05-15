import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  Suspense,
  lazy,
  useEffect,
} from "react";

import {
  AnimatePresence,
} from "framer-motion";

import ProtectedRoute from "./components/ProtectedRoute";

import Loader from "./components/ui/Loader";

import PageWrapper from "./components/layout/PageWrapper";

import { useAuthStore } from "./store/authStore";

// ================= LAZY PAGES =================
const Home = lazy(() =>
  import("./pages/Home")
);

const Login = lazy(() =>
  import("./pages/Login")
);

const Dashboard = lazy(() =>
  import("./pages/Dashboard")
);

const CodeReview = lazy(() =>
  import("./pages/CodeReview")
);

const Modules = lazy(() =>
  import("./pages/Modules")
);

const Topics = lazy(() =>
  import("./pages/Topics")
);

const Quiz = lazy(() =>
  import("./pages/Quiz")
);

const PrepPlanner = lazy(() =>
  import("./pages/PrepPlanner")
);

const Practice = lazy(() =>
  import("./pages/Practice")
);
// ================= ROUTES =================
function AnimatedRoutes() {

  const location =
    useLocation();

  return (
    <AnimatePresence mode="wait">

      <Suspense fallback={<Loader />}>

        <Routes
          location={location}
          key={location.pathname}
        >

          {/* Public */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />

          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />

          <Route
            path="/prep-planner"
            element={
              <PageWrapper>
                <PrepPlanner />
              </PageWrapper>
            }
          />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>

            <Route
              path="/dashboard"
              element={
                <PageWrapper>
                  <Dashboard />
                </PageWrapper>
              }
            />

            <Route
              path="/practice"
              element={<Practice />}
            />
            <Route
              path="/code"
              element={
                <PageWrapper>
                  <CodeReview />
                </PageWrapper>
              }
            />

            <Route
             path="/modules/:domain"
              element={
                <PageWrapper>
                  <Modules />
                </PageWrapper>
              }
            />

            <Route
              path="/topics"
              element={
                <PageWrapper>
                  <Topics />
                </PageWrapper>
              }
            />

            <Route
              path="/quiz"
              element={
                <PageWrapper>
                  <Quiz />
                </PageWrapper>
              }
            />

          </Route>

        </Routes>

      </Suspense>

    </AnimatePresence>
  );
}

// ================= APP =================
function App() {

  const { checkAuth } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>

      <AnimatedRoutes />

    </BrowserRouter>
  );
}

export default App;