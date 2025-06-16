export const GET_USER_ID_KEY = "user_id";

export const getUserId = () => {
  let userId = localStorage.getItem(GET_USER_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(GET_USER_ID_KEY, userId);
  }
  return userId;
};
