import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { Home, ProblemList, Problem, Ranking, Profile } from './pages';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { useUserState } from './hooks/useUserState';
import { useMemo } from 'react';

const App = () => {
  const { user } = useUserState();
  const { isLoggedIn } = useMemo(() => user, [user, user.isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
        {!isLoggedIn && <Route path="/signin" element={<SignIn />} />}
        <Route path="/problems" element={<ProblemList />} />
        {isLoggedIn ? (
          <Route path="/problem/:version/:id" element={<Problem />} />
        ) : (
          <Route path="/problem/:version/:id" element={<SignIn />} />
        )}
        {isLoggedIn ? (
          <Route
            path="/problem/:version/:id/:roomNumber"
            element={<Problem />}
          />
        ) : (
          <Route
            path="/problem/:version/:id/:roomNumber"
            element={<SignIn />}
          />
        )}
        <Route path="/ranking" element={<Ranking />} />
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
