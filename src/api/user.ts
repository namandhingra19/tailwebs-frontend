import ApiHelper from "../utils/ApiHelper";

export const getUser = async () => {
  return ApiHelper.get(`/user`);
};
