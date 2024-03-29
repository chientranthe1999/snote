import Register from "./pages/register";
import LogIn from "./pages/log-in";
import Workspace from "./pages/workspace";
import NotFound from "./pages/not-found";
import Landing from './pages/landing/Landing'
import { Route, Routes, Navigate } from "react-router-dom";
import PageBody from "./components/page-body";
import { useAppSelector } from "./app/hooks";
import "./styles/_main.scss";

function App() {
  const userInfo = useAppSelector((user) => user.user.userInfo);

  if (!userInfo) {
    return (
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Workspace />}>
        <Route path=":pageReference" element={<PageBody />} />
      </Route>
      <Route path="/landing" element={<Landing />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
