import { atom, selector } from "recoil";

const initUserState = {
  token: "",
  orgId: "",
  id: "",
  firstName: "",
  lastName: "",
  systemRole: "",
};

export const userState = atom({
  key: "loggedInUserState",
  default: initUserState, // default value (aka initial value)
});

//https://recoiljs.org/docs/introduction/getting-started/

export const tokenState = selector({
  key: "gettoken",
  get: ({ get }) => {
    return get(userState).token;
  },
});

export const logInDoneState = selector({
  key: "isLoggedIn",
  get: ({ get }) => {
    return get(userState).token.length ? true : false;
  },
});

export const getOrgIdState = selector({
  key: "getOrgIdState",
  get: ({ get }) => {
    return get(userState).orgId;
  },
});



