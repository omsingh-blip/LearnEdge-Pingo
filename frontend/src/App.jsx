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

import AuthLoader from "./components/AuthLoader";

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

const NotesViewer = lazy(() =>
  import("./pages/NotesViewer")
);

const PrepPlanner = lazy(() =>
  import("./pages/PrepPlanner")
);

const Practice = lazy(() =>
  import("./pages/Practice")
);

const DsaSheet = lazy(() =>
  import("./pages/DsaSheet")
);

// ================= ADMIN =================

const Admin = lazy(() =>
  import("./pages/Admin")
);

const AdminRoute = lazy(() =>
  import("./components/AdminRoute")
);

const AdminQuiz = lazy(() =>
  import("./pages/AdminQuiz")
);

const AdminNotes = lazy(() =>
  import("./pages/AdminNotes")
);

const AdminDsa = lazy(() =>
  import("./pages/AdminDsa")
);

// ================= ROUTES =================

function AnimatedRoutes() {

  const location =
    useLocation();

  return (

    <AnimatePresence mode="wait">

      <Suspense
        fallback={<Loader />}
      >

        <Routes
          location={location}
          key={location.pathname}
        >

          {/* ================= PUBLIC ================= */}

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
    <AuthLoader>

      <PageWrapper>

        <Login />

      </PageWrapper>

    </AuthLoader>
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

          {/* ================= PROTECTED ================= */}

          <Route
            element={
              <ProtectedRoute />
            }
          >

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
              element={
                <Practice />
              }
            />

            <Route
              path="/dsa-sheet"
              element={
                <PageWrapper>
                  <DsaSheet />
                </PageWrapper>
              }
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
              path="/topics"
              element={
                <PageWrapper>
                  <Topics />
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
              path="/modules/:domain/notes"
              element={
                <PageWrapper>
                  <NotesViewer />
                </PageWrapper>
              }
            />

            <Route
              path="/modules/:domain/quiz"
              element={
                <PageWrapper>
                  <Quiz />
                </PageWrapper>
              }
            />

          </Route>

          {/* ================= ADMIN ================= */}

          <Route
            element={
              <AdminRoute />
            }
          >

            <Route
              path="/admin"
              element={
                <PageWrapper>
                  <Admin />
                </PageWrapper>
              }
            />

            <Route
              path="/admin/quiz"
              element={
                <PageWrapper>
                  <AdminQuiz />
                </PageWrapper>
              }
            />

            <Route
              path="/admin/notes"
              element={
                <PageWrapper>
                  <AdminNotes />
                </PageWrapper>
              }
            />

            <Route
              path="/admin/dsa"
              element={
                <PageWrapper>
                  <AdminDsa />
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

  const {
    checkAuth
  } = useAuthStore();

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