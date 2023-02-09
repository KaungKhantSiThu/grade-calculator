### Project Description

<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p style="text-align: center">
  <img src="https://img.icons8.com/3d-fluency/94/null/books.png" alt="3D book icon"/>
</p>
<h1 style="text-align: center">
  Grade Tracker by Kaung Khant Si Thu
</h1>

The website will display the Total GPA and semestral GPA by doing the calculation based on the course information you add.


## 🚀 Features

1. Adaptive Layout
2. Simple and Intuitive UI
3. Line Cart that gives you a quick overview of your GPA  over the semesters

### Home Page
![Grade Tracker Website](grade-calculator/src/screenshots/home-page.png "Home Page")

### Alert showing when trying to add course that's already in the storage
![Alert showing when trying to add course that's already in the storage](grade-calculator/src/screenshots/alert.png "Alert")

### Option for IT major
![Different courses shown when selecting IT option](grade-calculator/src/screenshots/Option-for-IT.png "Option for IT major")

### Adaptive layout for both desktop and mobile
![For mobile and desktop](grade-calculator/src/screenshots/Adaptive-layout.png "Adaptive layout")
## 🧐 What's inside?

A quick look at the components created to use in this website

    .
    ├── src
         ├── components
                 ├── GPATable.js
                 ├── inputModal.js
                 ├── LineChart.js
                 ├── cs-2019.json
                 ├── it-2019.json
    └── README.md


1.  **`inputModal.js`**: This file includes the component responsible for giving use the options to choose such as semester, course name and GPA and saving that information.

2.  **`GPATable.js`**: This file includes the component responsible for displaying the course information passed by InputModal component from **`inputModal.js`** in a tablular format  along with calculationg total and semestral GPA which shows up on the headers.

3.  **`LineChart.js`**: This file includes the component responsible for displaying the line chart.

4.  **`cs-2019.json`**: This file includes all the subject groups and their related courses that 62X Computer Science students need to take.

5.  **`it-2019.json`**: This file includes all the subject groups and their related courses that 62X Information Technology students need to take.

6.  **`README.md`**: A text file containing useful reference information about Grade Tracker project.

## Tech Stack

### Frontend Frameworks
[Gatsby](https://www.gatsbyjs.com/), [React Bootstrap](https://react-bootstrap.github.io/), [Chart.js](https://www.chartjs.org/)

### Icons
[Icon8](https://icons8.com/)

<!-- AUTO-GENERATED-CONTENT:END -->
