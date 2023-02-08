import React, {useState} from 'react'
import InputModal from "../components/InputModal";
import {Col, Container, Row} from "react-bootstrap";
import SemesterTables from "../components/GPATable";
import {useLocalStorage} from "react-use";
import "../components/styles.css"
import LineChart from "../components/LineChart";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CourseContext} from "../components/context";

export default function GPA_Calculator() {

  const majorInformation = {
    curriculum: require('../components/cs-2019.json').curriculum,
    years: ['2019', '2020', '2021', '2022', '2023'],
    terms: ['1','2','3'],
    grades: require('../components/grades.json').grades,
  }

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

  const matchGrade = (gradeCode) => {
    return majorInformation.grades.find(grade => grade.code === gradeCode).value
  }

  if (localStorage.getItem('gradeInfo') !== null) {

  }

  let [chartData, setChartData] = useState(
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
      } else {
        sGPARecord[k] = sGPARecord[k].reduce((a, b) => a + b) / sGPARecord[k].length;
      }
    }
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
      GPARecord[gInfo.semester].push(gInfo.gpa)
      setGPARecord(GPARecord)
      coursesChanges()
    }
  }

  return(
      <CourseContext.Provider value={majorInformation}>
        <Container className={"container"}>
          <Row>
            <Col>
              <InputModal
                  parentCallBack={addNewCourseInfo}
              />
            </Col>
            <Col>
              <LineChart data={chartData}/>
            </Col>

          </Row>
          <Row>
            <SemesterTables
                courses={gradeInfo}
                setGradeInfo={setGradeInfo}
            />
          </Row>
        </Container>
      </CourseContext.Provider>
  )
}