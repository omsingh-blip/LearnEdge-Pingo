import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  Suspense,
  lazy,
  useEffect,
} from "react";

import ProtectedRoute from "./components/ProtectedRoute";

import Loader from "./components/ui/Loader";

import { useAuthStore } from "./store/authStore";

// ================= LAZY PAGES =================
const Home = lazy(() => import("./pages/Home"));

const Login = lazy(() => import("./pages/Login"));

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

// ================= APP =================
function App() {

  const { checkAuth } = useAuthStore();

  // Check auth on app load
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <BrowserRouter>

      <Suspense fallback={<Loader />}>

        <Routes>

          {/* Public Routes */}
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/prep-planner"
            element={<PrepPlanner />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/code"
              element={<CodeReview />}
            />

            <Route
              path="/modules"
              element={<Modules />}
            />

            <Route
              path="/topics"
              element={<Topics />}
            />

            <Route
              path="/quiz"
              element={<Quiz />}
            />

          </Route>

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;