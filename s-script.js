document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentId = document.getElementById('student-id').value;
    const idNumber = document.getElementById('id-number').value;

    // ตัวอย่างข้อมูลนักเรียน (สามารถแทนที่ด้วยการดึงข้อมูลจากฐานข้อมูล)
    const studentData = {
        "00000": {
            idNumber: "123456789",
            name: "นายณภัทร ชินวัตร",
            class: "มัธยมศึกษาปีที่ 6/5",
            number: "1",
            grades: [
                { subject: "คณิตศาสตร์", score: 85, grade: "4" },
                { subject: "วิทยาศาสตร์", score: 92, grade: "4" },
                { subject: "ภาษาอังกฤษ", score: 78, grade: "3.5" },
            ]
        }
        // สามารถเพิ่มนักเรียนอื่น ๆ ได้ที่นี่
    };

    if (studentData[studentId] && studentData[studentId].idNumber === idNumber) {
        displayStudentInfo(studentData[studentId]);
        displayGrades(studentData[studentId].grades);
    } else {
        document.getElementById('login-error').textContent = "รหัสนักเรียนหรือเลขบัตรประชาชนไม่ถูกต้อง";
        document.getElementById('login-error').style.display = "block";
    }
});

function displayStudentInfo(student) {
    document.getElementById('student-name').textContent = student.name;
    document.getElementById('student-class').textContent = student.class;
    document.getElementById('student-number').textContent = student.number;
    document.getElementById('student-id-display').textContent = student.idNumber;
}

function displayGrades(grades) {
    const gradesContainer = document.getElementById('grades-container');
    const loginContainer = document.getElementById('login-container');
    const gradesTableBody = document.getElementById('grades-table').getElementsByTagName('tbody')[0];

    gradesTableBody.innerHTML = "";

    grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${grade.subject}</td><td>${grade.score}</td><td>${grade.grade}</td>`;
        gradesTableBody.appendChild(row);
    });

    loginContainer.style.display = "none";
    gradesContainer.style.display = "block";
}

document.getElementById('logout-button').addEventListener('click', function() {
    document.getElementById('grades-container').style.display = "none";
    document.getElementById('login-container').style.display = "block";
    document.getElementById('login-form').reset();
    document.getElementById('login-error').style.display = "none";
});
