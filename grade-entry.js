// สมมุติว่าเรามีข้อมูลนักเรียนและผู้ใช้/ครู
let students = [
    { id: '00001', name: 'นายนักเรียน A', grade: '' },
    { id: '00002', name: 'นางสาวนักเรียน B', grade: '' },
    { id: '00003', name: 'นายนักเรียน C', grade: '' }
];


// ฟังก์ชันเพื่อโหลดข้อมูลนักเรียนจาก localStorage หากมี
function loadStudents() {
    const savedGrades = JSON.parse(localStorage.getItem('grades'));
    if (savedGrades) {
        students = savedGrades; // อัปเดต students ด้วยข้อมูลจาก localStorage
    }

    const studentTable = document.getElementById('studentTable');
    studentTable.innerHTML = ''; // ล้างข้อมูลเก่าก่อนโหลดใหม่
    students.forEach(student => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td><input type="text" id="grade-${student.id}" value="${student.grade}" disabled></td>
            <td>
                <button onclick="enableEdit('${student.id}')">แก้ไข</button>
                <button id="save-${student.id}" onclick="saveGrade('${student.id}')" disabled>บันทึก</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

// ฟังก์ชันเพื่อเปิดให้แก้ไขคะแนน
function enableEdit(studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = false;

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = false;
}

// ฟังก์ชันเพื่อบันทึกคะแนนและรีเฟรชข้อมูล
function saveGrade(studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = true;

    const grade = gradeInput.value;
    updateGrade(studentId, grade);

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = true;

    // หลังจากบันทึกข้อมูลแล้ว รีโหลดข้อมูลทั้งหมดเพื่ออัปเดตตาราง
    loadStudents();
}

// ฟังก์ชันเพื่ออัปเดตคะแนนในอาร์เรย์ students และบันทึกใน localStorage
function updateGrade(studentId, grade) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.grade = grade;
        saveGrades();
    }
}

// ฟังก์ชันเพื่อบันทึกข้อมูลลงใน localStorage
function saveGrades() {
    localStorage.setItem('grades', JSON.stringify(students));
}

// โหลดข้อมูลนักเรียนเมื่อเปิดหน้า
loadStudents();
