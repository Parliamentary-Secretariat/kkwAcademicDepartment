// สมมุติว่าเรามีข้อมูลนักเรียนและผู้ใช้/ครู
let students = [
    { id: '61001', name: 'นายนักเรียน A', grade: '' },
    { id: '61002', name: 'นางสาวนักเรียน B', grade: '' },
    { id: '61003', name: 'นายนักเรียน C', grade: '' }
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
            <td><input type="text" value="${student.grade}" oninput="updateGrade('${student.id}', this.value)"></td>
        `;
        studentTable.appendChild(row);
    });
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
    name: 'ครูสมชาย',
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
