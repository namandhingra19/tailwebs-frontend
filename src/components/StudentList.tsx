// src/components/StudentList.tsx
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getAllStudents,
} from "../api/student";
import { LoadingOverlay } from "./LoadingOverlay";
import useNotification from "../hooks/useNotification";

interface Student {
  _id?: string;
  name: string;
  subjectName: string;
  marks: number;
  userId: string;
}

const emptyNewStudent = {
  name: "",
  subjectName: "",
  marks: 0,
  userId: "",
};

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState<Student>(emptyNewStudent);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification, Notification } = useNotification();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    getAllStudents()
      .then((x: any) => {
        setIsLoading(false);
        console.log(x);
        setStudents(x);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        showNotification("Failed to fetch students", "error");
      });
  };

  const handleSave = async (id: string) => {
    if (
      !students.find((s) => s._id === id)!.name ||
      !students.find((s) => s._id === id)!.subjectName ||
      !students.find((s) => s._id === id)!.marks
    )
      return showNotification(`Please fill all the fields`, `error`);
    setEditingId(null);
    setIsLoading(true);
    editStudent({
      _id: id,
      name: students.find((s) => s._id === id)!.name,
      subjectName: students.find((s) => s._id === id)!.subjectName,
      marks: students.find((s) => s._id === id)!.marks,
    })
      .then((x: any) => {
        setIsLoading(false);
        console.log(x);
        setStudents(students.map((s) => (s._id === id ? x : s)));
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        showNotification("Failed to save student", "error");
      });
  };

  const handleAddNewStudent = async () => {
    if (!newStudent.name || !newStudent.subjectName || !newStudent.marks)
      return showNotification(`Please fill all the fields`, `error`);
    setNewStudent(emptyNewStudent);
    setOpen(false);
    setIsLoading(true);
    createStudent({
      name: newStudent.name,
      subjectName: newStudent.subjectName,
      marks: newStudent.marks,
    })
      .then((x: any) => {
        setIsLoading(false);
        const foundStudent = students.find((s) => s._id === x._id);
        if (foundStudent) {
          setStudents(students.map((s) => (s._id === x._id ? x : s)));
          showNotification(
            "Student Updated Successfully with same name and subject name",
            "success"
          );
        } else {
          setStudents([...students, x]);
        }
        console.log(x);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
        showNotification("Failed to add student", "error");
      });
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    deleteStudent({
      _id: id,
    })
      .then((x) => {
        console.log(x);
        setIsLoading(false);
        setStudents(students.filter((s) => s._id !== id));
        showNotification("Student deleted successfully", "success");
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        showNotification("Failed to delete student", "error");
      });
  };

  const handleInputChange = (
    id: string,
    field: keyof Student,
    value: string | number
  ) => {
    setStudents(
      students.map((s) => (s._id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleNewStudentChange = (
    field: keyof Student,
    value: string | number
  ) => {
    setNewStudent({ ...newStudent, [field]: value });
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center" mt={5}>
        <Grid item xs={12} md={8}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add New Student
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogContent>
              <TextField
                label="Name"
                fullWidth
                margin="dense"
                value={newStudent.name}
                onChange={(e) => handleNewStudentChange("name", e.target.value)}
              />
              <TextField
                label="Subject"
                fullWidth
                margin="dense"
                value={newStudent.subjectName}
                onChange={(e) =>
                  handleNewStudentChange("subjectName", e.target.value)
                }
              />
              <TextField
                label="Marks"
                fullWidth
                margin="dense"
                type="number"
                value={newStudent.marks}
                onChange={(e) =>
                  handleNewStudentChange("marks", Number(e.target.value))
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpen(false);
                  setNewStudent(emptyNewStudent);
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={handleAddNewStudent} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Marks</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>
                      {editingId === student._id ? (
                        <TextField
                          value={student.name}
                          onChange={(e) =>
                            handleInputChange(
                              student._id!,
                              "name",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        student.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === student._id ? (
                        <TextField
                          value={student.subjectName}
                          onChange={(e) =>
                            handleInputChange(
                              student._id!,
                              "subjectName",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        student.subjectName
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === student._id ? (
                        <TextField
                          type="number"
                          value={student.marks}
                          onChange={(e) =>
                            handleInputChange(
                              student._id!,
                              "marks",
                              Number(e.target.value)
                            )
                          }
                        />
                      ) : (
                        student.marks
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === student._id ? (
                        <Button onClick={() => handleSave(student._id!)}>
                          Save
                        </Button>
                      ) : (
                        <IconButton onClick={() => handleEdit(student._id!)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleDelete(student._id!)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <LoadingOverlay
          open={isLoading}
          handleClose={() => {
            setIsLoading(false);
          }}
        />
        {Notification}
      </Grid>
    </>
  );
};

export default StudentList;
