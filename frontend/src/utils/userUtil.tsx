export const removeLocalToken = () => {
  localStorage.removeItem('camperRankToken');
  localStorage.removeItem('camperID');
  localStorage.removeItem('camperRankTokenTime');
};

export const getLocalToken = () => {
  const token = localStorage.getItem('camperRankToken');
  const camperID = localStorage.getItem('camperID');
  const expirationTime = localStorage.getItem('camperRankTokenTime');
  return { token, camperID, expirationTime };
};

export const setLocalToken = (
  accessToken: string,
  expirationTime: string,
  userId: string,
) => {
  localStorage.setItem('camperRankToken', accessToken);
  localStorage.setItem('camperRankTokenTime', expirationTime);
  localStorage.setItem('camperID', userId);
};

export const calculateRemainingTime = (expirationTime: string) =>
  new Date(expirationTime).getTime() - new Date().getTime();
