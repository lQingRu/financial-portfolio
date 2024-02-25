import React from 'react';
// TODO: Consider if this is needed
const Login = React.lazy(
  () => import('../../pages/auth/Login'),
);

const SignUp = React.lazy(
  () => import('../../pages/auth/SignUp'),
);

const About = React.lazy(
  () => import('../../pages/general/About'),
);

const Home = React.lazy(
  () => import('../../pages/general/Home'),
);

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/about', element: <About /> },
];

export default routes;
