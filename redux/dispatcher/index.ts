import { UserType } from "@/types/User";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, LogoutUser } from "../Slice/UserSlice";
const dispatch = useDispatch();

export const userLogin = async (data: UserType) => {
  dispatch(loginUser(data));
};

export const userLogout = async () => {
  dispatch(LogoutUser(""));
};

export const getSession = () => {
  let userData = useSelector((state: any) => state.user);
  return userData;
};
