// สมมุติว่าเรามีข้อมูลนักเรียนและผู้ใช้/ครู
let students = [
    { id: '00001', name: 'นายนักเรียน A', grade: 'M401' },
    { id: '00002', name: 'นางสาวนักเรียน B', grade: 'M401' },
    { id: '00003', name: 'นายนักเรียน C', grade: '' }
];

function loadStudents() {
    const studentTable = document.getElementById('studentTable');
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

function enableEdit(studentId) {
    // เปิดให้แก้ไขช่องกรอกคะแนน
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = false;

    // เปิดใช้งานปุ่มบันทึก
    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = false;
}

function saveGrade(studentId) {
    // ปิดการแก้ไขช่องกรอกคะแนน
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = true;

    // บันทึกคะแนน
    const grade = gradeInput.value;
    updateGrade(studentId, grade);

    // ปิดใช้งานปุ่มบันทึกหลังจากบันทึกข้อมูล
    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = true;
}

// ฟังก์ชันเพื่ออัปเดตคะแนนในอาร์เรย์ students และบันทึกใน localStorage
function updateGrade(studentId, grade) {
    const student = students.find(s => s.id === studentId);
    if (student) {
        student.grade = grade;
        saveGrades();
    }
}

// ฟังก์ชันเพื่อบันทึกคะแนนลง localStorage
function saveGrades() {
    localStorage.setItem('grades', JSON.stringify(students));
}

// โหลดข้อมูลนักเรียนเมื่อเปิดหน้า
loadStudents();
