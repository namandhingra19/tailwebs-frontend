import ApiHelper from "../utils/ApiHelper";

export const getStudents = async () => {
  return ApiHelper.get(`/user`);
};

export const createStudent = async (data: {
  name: string;
  subjectName: string;
  marks: number;
}) => {
  return ApiHelper.post(`/student`, {
    name: data.name,
    subjectName: data.subjectName,
    marks: data.marks,
  });
};

export const editStudent = async (data: {
  _id: string;
  name: string;
  subjectName: string;
  marks: number;
}) => {
  return ApiHelper.put(`/student/${data._id}`, {
    name: data.name,
    subjectName: data.subjectName,
    marks: data.marks,
  });
};

export const deleteStudent = async (data: { _id: string }) => {
  return ApiHelper.delete(`/student/${data._id}`);
};
export const getAllStudents = async () => {
  return ApiHelper.get(`/user/getstudents`);
};
