import React, {useState} from 'react'
import InputModal from "../components/inputModal";
import {Col, Container, Form, Navbar, Row} from "react-bootstrap";
import SemesterTables from "../components/GPATable";
import {useLocalStorage} from "react-use";
import "../components/styles.css"
import LineChart from "../components/LineChart";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CourseContext} from "../components/context";
import logo from "../images/night.png"

//const ThemeContext = createContext(null);
export default function GPA_Calculator() {

  const [majorInformation, setMajorInformation] = useState({
    curriculum: require('../components/cs-2019.json').curriculum,
    years: ['2019', '2020', '2021', '2022', '2023'],
    terms: ['1','2','3'],
    grades: require('../components/grades.json').grades,
  })



  majorInformation.semesters = majorInformation.years.flatMap((year) => (
      majorInformation.terms.map((term) => (
          term+"/"+year
      ))
  ))

  const [gradeInfo, setGradeInfo] = useLocalStorage("gradeInfo",[])

  const [GPARecord, setGPARecord] = useState({
    '1/2019': [],
    '2/2019': [],
    '3/2019': [],
    '1/2020': [],
    '2/2020': [],
    '3/2020': [],
    '1/2021': [],
    '2/2021': [],
    '3/2021': [],
    '1/2022': [],
    '2/2022': [],
    '3/2022': [],
    '1/2023': [],
    '2/2023': [],
    '3/2023': []
  })

  const [sGPARecord, setsGPARecord] = useState({})
  //const [chartGPA, setChartGPA] = useLocalStorage('gpaRecord', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])

  //console.log(chartGPA)

  const matchGrade = (gradeCode) => {
    return majorInformation.grades.find(grade => grade.code === gradeCode).value
  }

  const [chartData, setChartData] = useState(
      {
        data: {
          labels: majorInformation.semesters,
          datasets: [
            {
              label: "GPA",
              data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }
          ]
        }
      }
  )

  function containsObject(obj, list) {
    if (list.length === 0) {
      return false
    }

    for (let i = 0; i < list.length; i++) {
      if (list[i].course === obj.course) {
        return true;
      }
    }
    return false;
  }

  function coursesChanges() {
    Object.assign(sGPARecord, GPARecord)
    setsGPARecord(sGPARecord)
    for (let k in sGPARecord) {
      if (sGPARecord[k].length === 0) {
        sGPARecord[k] = 0
      } else if (sGPARecord[k].length === 1) {
        sGPARecord[k] = sGPARecord[k][0].gpa
      } else {
        sGPARecord[k] = sGPARecord[k].reduce((a, b) => a.gpa + b.gpa) / sGPARecord[k].length;
      }
    }

    //setChartGPA(Object.values(sGPARecord))
    //console.log(chartGPA)
    setChartData({
      data: {
        labels: majorInformation.semesters,
        datasets: [
          {
            label: "GPA",
            data: Object.values(sGPARecord),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
        ]
      }
    })
  }
  const addNewCourseInfo = (gInfo) => {
    //gradeInfo["gpa"] = matchGrade(gradeInfo.grade)
    if (containsObject(gInfo, gradeInfo)) {
      alert("The course is already in your GPA list")
    } else {
      gInfo.gpa = matchGrade(gInfo.grade)
      gradeInfo.push(gInfo)
      setGradeInfo([...gradeInfo])
      GPARecord[gInfo.semester].push({gpa: gInfo.gpa, code: gInfo.course})
      setGPARecord(GPARecord)
      coursesChanges()
    }
  }

  const deleteCourse = (course) => {
    console.log("Deleted!", course.code)
    GPARecord[course.semester] = GPARecord[course.semester].filter((obj) => {
      return obj.code !== course.code
    })
    console.log(GPARecord)
    setGPARecord(GPARecord)
    coursesChanges()
  }

  const radioChange = (e) => {
    e.persist();
    console.log(e.target.value);
    //alert("Selecting another major after adding courses will cause course inconsistency in the semester tables. Please click the radio button again to confirm.")
    let major = e.target.value;
    if (major === 'CS') {
      console.log('Changed to CS!')
      setMajorInformation(
          {
            curriculum: require('../components/cs-2019.json').curriculum,
            years: ['2019', '2020', '2021', '2022', '2023'],
            terms: ['1','2','3'],
            grades: require('../components/grades.json').grades,
          }
      )
    } else {
      console.log('Changed to IT!')
      setMajorInformation(
          {
            curriculum: require('../components/it-2019.json').curriculum,
            years: ['2019', '2020', '2021', '2022', '2023'],
            terms: ['1','2','3'],
            grades: require('../components/grades.json').grades,
          }
      )
    }
  };

  return(
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container className="justify-content-center">
            <Navbar.Brand href="">
              <img
                  src={logo}
                  width="50"
                  height="50"
                  alt="GPA logo"
              />{' '}
              Grade Tracker
            </Navbar.Brand>
          </Container>
        </Navbar>
        <CourseContext.Provider value={majorInformation}>
          <Container className={"container"}>
            <Form className={"form"}>
              <Form.Group className="mb-3" controlId='major' key={`inline-radio`}>
                <Form.Check
                    inline
                    label="Computer Science"
                    name="group1"
                    value="CS"
                    type={"radio"}
                    id={`reverse-radio-1`}
                    onChange={radioChange}
                />
                <Form.Check
                    inline
                    label="Information Technology"
                    name="group1"
                    value="IT"
                    type={"radio"}
                    id={`reverse-radio-2`}
                    onChange={radioChange}
                />
              </Form.Group>
            </Form>
            <Row md>
              <Col md={6}>
                <InputModal
                    parentCallBack={addNewCourseInfo}
                />
              </Col>
              <Col md={6}>
                <LineChart data={chartData}/>
              </Col>

            </Row>
            <Row>
              <SemesterTables
                  courses={gradeInfo}
                  setGradeInfo={setGradeInfo}
                  deleteCourse={deleteCourse}
              />
            </Row>
          </Container>
        </CourseContext.Provider>
      </div>
  )
}
