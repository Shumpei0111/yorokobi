export const GET_USER_ID_KEY = "user_id";

export const getUserId = () => {
  return localStorage.getItem(GET_USER_ID_KEY) || crypto.randomUUID();
};
