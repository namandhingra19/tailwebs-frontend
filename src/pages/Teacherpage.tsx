import { useEffect } from "react";
import { getUser } from "../api/user";
import { Header } from "../components/Header";
import StudentList from "../components/StudentList";

export function Teacherpage() {
  function fetchuserDetails() {
    getUser()
      .then((x) => {
        console.log(x);
      })
      .catch((e) => {
        window.location.href = "/login";
      });
  }
  useEffect(() => {
    fetchuserDetails();
  }, []);
  return (
    <div>
      <Header />
      <StudentList />
    </div>
  );
}
