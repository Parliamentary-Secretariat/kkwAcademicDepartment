// สมมุติว่าเรามีข้อมูลนักเรียนและผู้ใช้/ครู
let students = [
    { id: '00001', name: 'นายนักเรียน A', grade: 'M401' },
    { id: '00002', name: 'นางสาวนักเรียน B', grade: 'M401' },
    { id: '00003', name: 'นายนักเรียน C', grade: '' }
];

// สมมุติว่าดึงข้อมูลผู้ใช้จากการล็อกอินแล้ว
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// แสดงข้อมูลผู้ใช้ในส่วน Header
document.getElementById('userProfile').innerText = currentUser.name;
document.getElementById('profilePic').src = currentUser.profilePic;

// ฟังก์ชันเพื่อโหลดรายชื่อนักเรียนและช่องกรอกคะแนน
function loadStudents() {
    const studentTable = document.getElementById('studentTable');
    students.forEach(student => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td><input type="text" id="grade-${student.id}" value="${student.grade}" disabled></td>
            <td><button onclick="editGrade('${student.id}')">แก้ไข</button></td>
        `;
        studentTable.appendChild(row);
    });
}

function editGrade(studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    if (gradeInput.disabled) {
        gradeInput.disabled = false;
        document.querySelector(`button[onclick="editGrade('${studentId}')"]`).innerText = "บันทึก";
    } else {
        gradeInput.disabled = true;
        updateGrade(studentId, gradeInput.value);
        document.querySelector(`button[onclick="editGrade('${studentId}')"]`).innerText = "แก้ไข";
    }
}


// ฟังก์ชันเพื่ออัปเดตคะแนนในอาร์เรย์ students
function updateGrade(studentId, grade) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.grade = grade;
        saveGrades();
    }
}

// ฟังก์ชันเพื่อบันทึกคะแนนลง localStorage (จำลองการบันทึกข้อมูลแบบ Real-Time)
function saveGrades() {
    localStorage.setItem('grades', JSON.stringify(students));
}

// โหลดข้อมูลนักเรียนเมื่อเปิดหน้า
loadStudents();

// เก็บข้อมูลผู้ใช้ลงใน localStorage
let loggedInUser = {
    name: 'ครูณภัทร ชินวัตร',
    profilePic: 'link_to_profile_picture.jpg'
};

localStorage.setItem('currentUser', JSON.stringify(loggedInUser));

// ดึงข้อมูลผู้ใช้จาก localStorage
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// ใช้ข้อมูลผู้ใช้ที่ดึงมาจาก localStorage
if (currentUser) {
    document.getElementById('userProfile').innerText = currentUser.name;
    document.getElementById('profilePic').src = currentUser.profilePic;
}
