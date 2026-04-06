import { useAuth0 } from '@auth0/auth0-react';

export const useAuth = () => {
  const {
    isLoading,
    isAuthenticated,
    error,
    loginWithRedirect,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const mappedUser = user ? {
    ...user,
    username: user.nickname || user.name || (user.email ? user.email.split('@')[0] : 'User')
  } : null;

  const signup = () => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
  const login = () => loginWithRedirect();
  const logout = () => auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  return {
    isLoading,
    isAuthenticated,
    error,
    user: mappedUser,
    login,
    signup,
    logout,
  };
};