import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { useUserState } from './hooks/useUserState';
import React, { Suspense, lazy, useMemo } from 'react';

const Home = lazy(() => import('./pages/Home'));
const ProblemList = lazy(() => import('./pages/ProblemList'));
const Problem = lazy(() => import('./pages/Problem'));
const Ranking = lazy(() => import('./pages/Ranking'));
const Profile = lazy(() => import('./pages/Profile'));
const Sign = lazy(() => import('./pages/Sign'));

const App = () => {
  const { user } = useUserState();
  const { isLoggedIn } = useMemo(() => user, [user, user.isLoggedIn]);
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {!isLoggedIn && <Route path="/signup" element={<Sign />} />}
          {!isLoggedIn && <Route path="/signin" element={<Sign />} />}
          <Route path="/problems" element={<ProblemList />} />
          {isLoggedIn ? (
            <Route path="/problem/:version/:id" element={<Problem />} />
          ) : (
            <Route path="/problem/:version/:id" element={<Sign />} />
          )}
          {isLoggedIn ? (
            <Route
              path="/problem/:version/:id/:roomNumber"
              element={<Problem />}
            />
          ) : (
            <Route
              path="/problem/:version/:id/:roomNumber"
              element={<Sign />}
            />
          )}
          <Route path="/ranking" element={<Ranking />} />
          {isLoggedIn && <Route path="/profile" element={<Profile />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
