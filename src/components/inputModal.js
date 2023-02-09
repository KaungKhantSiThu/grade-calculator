import React, {useContext, useRef, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import "./styles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {CourseContext} from "./context";

export default function InputModal(props) {
    const {parentCallBack} = props;

    const {terms, years, curriculum, grades} = useContext(CourseContext)

    const yearRef = useRef('2019');

    const termRef = useRef('1');

    const groupRef = useRef('Basic Language Courses');

    const courseRef = useRef('BG 1001');

    const gradeRef = useRef('A');

    const yearOptions = years.map((year, index) => {
        return(
            <option key={index} value={year.toString()}>{year}</option>
        )

    })

    const termsOption = terms.map((term, index) => {
        return(
            <option key={index} value={term}>{term}</option>
        )
    })

    const groupOptions = curriculum.courses.map((group, index) => {
        return(
            <option key={index} value={group.groupName}>{group.groupName}</option>
        )
    })

    const gradeOptions = grades.map((grade, index) => {
        return(
            <option key={index} value={grade.code}>{grade.code}</option>
        )
    })

    const [courseOptions, setCourseOptions] = useState([
        curriculum.courses[0].subjects.map((course, index) => {
            return(
                <option key={index} value={course.code}>{`${course.code} ${course.name}`}</option>
            )
    })
    ])

    const groupChanges = () => {
        const gName = groupRef.current.value
        let selectedCourses = curriculum.courses.find((group) => group.groupName === gName).subjects
        const tempSelectedCourseOptions = selectedCourses.map((course, index) => {
            return(
                <option key={index} value={course.code}>{`${course.code} ${course.name}`}</option>
            )
        })
        setCourseOptions(tempSelectedCourseOptions)

    }

    const subjectList = curriculum.courses.flatMap(
        (course) => course.subjects.map(
            (subject) => ({code: subject.code, name: subject.name})
        ))

    const matchCourse = (courseCode) => {
        return subjectList.find((course) => (course.code === courseCode)).name
    }

    const handleSubmit = () => {
        const formObjc = {
            semester: termRef.current.value + '/' + yearRef.current.value,
            course: courseRef.current.value,
            courseName: matchCourse(courseRef.current.value),
            grade: gradeRef.current.value
        }
        parentCallBack(formObjc)
    }




    return(
        <>
            <h1 className={"header"}>Select your course</h1>
            <Form className={"form"}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId='term'>
                            <Form.Label>Term</Form.Label>
                            <Form.Select
                                ref={termRef}
                            >
                                {
                                    termsOption
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId='year'>
                            <Form.Label>Year</Form.Label>
                            <Form.Select ref={yearRef} >
                                {
                                    yearOptions
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId='group'>
                    <Form.Label>Group</Form.Label>
                    <Form.Select
                        ref={groupRef}
                        onChange={groupChanges}
                    >
                        {
                            groupOptions
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Courses</Form.Label>
                    <Form.Select
                        ref={courseRef}
                        onChange={groupChanges}
                    >
                        {
                            courseOptions
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select ref={gradeRef} >
                        {
                            gradeOptions
                        }
                    </Form.Select>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button
                        size="lg"
                        onClick={handleSubmit}
                        className={"button"}
                    >
                        Add
                    </Button>
                </div>
            </Form>
        </>
    )
}