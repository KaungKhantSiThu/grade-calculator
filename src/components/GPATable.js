import {Stack, Table} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import {TiDelete} from "react-icons/ti"
import "./styles.css"
import {CourseContext} from "./context";
export default function SemesterTables(props) {
    const {courses, setGradeInfo} = props;
    const {semesters} = useContext(CourseContext)

    const [grandGPA = 0, setGrandGPA] = useState(0)

    const deleteRow = (index) => {
        let newCourses = courses.filter((obj) => {
            return obj.course !== index;
        });
        setGradeInfo([...newCourses])
    }

    //calculate GrandGPA
    useEffect(() => {
        if (courses.length > 0) {
            let accumulatedGPA = 0
            let courseCount = 0
            courses.forEach((course) => {
                courseCount += 1
                accumulatedGPA += course.gpa
            })
            setGrandGPA(Number((accumulatedGPA / courseCount).toFixed(2)))
            document.getElementById("grandGPA").innerHTML = `Grand GPA: ${grandGPA}`
        } else {
            document.getElementById('grandGPA').innerHTML = 'No GPA to calculate'
        }
    }, [courses, grandGPA])


    const SemesterTableHeader = (props, key) => {
        const { currentSemester } = props;
        let accumulatedGPA = 0
        let courseCount = 0
        courses.forEach((course) => {
            if (course.semester === currentSemester) {
                courseCount += 1
                accumulatedGPA += course.gpa
            }
        })

        const semestralGPA = Number((accumulatedGPA / courseCount).toFixed(2))


        return (
            <thead key={key}>
                <tr style={{ textAlign: "center" }}>
                    <th colSpan={2}>Semester {currentSemester}</th>
                    <th>{semestralGPA}</th>
                </tr>
            </thead>
        )
    }

    //pass the calculated data from SemesterTableBody to SemesterTableHeader
    const SemesterTableBody = (props, key) => {
        const {course} = props

        return (
            <>
                <tr key={key}>
                    <td className={"delete-icon"} rowSpan={2}>
                        <TiDelete size={40} color={"#6589FF"} onClick={() => {
                            deleteRow(course.course)
                        }}/>
                    </td>
                    <td style={{fontSize: 20}}>{course.course}</td>
                    <td rowSpan={2} className={"gpa-column"}>{course.gpa}</td>
                </tr>
                <tr>
                    <td>{course.courseName}</td>
                </tr>
            </>
        )
    }

    const SemesterTable = (props, key) => {
        const isDataLoaded = (courses.length > 0)
        const {currentSemester} = props

        if (isDataLoaded) {
            //console.table(courses)
            const matchCourses = courses.find((course) => course.semester === currentSemester)
            //console.log(check)

            if (matchCourses !== undefined) {

                return (
                    <Table bordered className={"table"}>
                        <SemesterTableHeader currentSemester={currentSemester} key={key}/>
                        <tbody>
                        {
                            courses.map((course, index) => {
                                if (course.semester === currentSemester) {
                                    return <SemesterTableBody key={index} course={course}/>
                                } else {
                                    return null
                                }
                            })
                        }
                        </tbody>
                    </Table>
                )
            } else {
                return null
            }
        }
    }

    return(
        <Stack gap={5}>
            <h1 id="grandGPA" className={"header"}>No GPA to calculate</h1>
            {
                semesters.map( (semester, key) => (
                    <SemesterTable currentSemester={semester} key={key}/>
                ))
            }
        </Stack>
    )
}

