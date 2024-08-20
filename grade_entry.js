document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "login_teacher.html";
    } else {
        document.getElementById("userProfile").textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById("profilePic").src = user.profilePic;
        loadSubjects(user.subjects);
    }
});

function loadSubjects(subjects) {
    const subjectSelect = document.getElementById("subjectSelect");
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
}

async function loadStudents() {
    const subject = document.getElementById("subjectSelect").value;
    const response = await fetch("students.json");
    const students = await response.json();
    const studentsContainer = document.getElementById("studentsContainer");
    
    studentsContainer.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>รหัสนักเรียน</th>
                    <th>ชื่อ</th>
                    <th>นามสกุล</th>
                    <th>คะแนน (${subject})</th>
                </tr>
            </thead>
            <tbody>
                ${students.map(student => `
                    <tr>
                        <td>${student.id}</td>
                        <td>${student.firstName}</td>
                        <td>${student.lastName}</td>
                        <td><input type="number" value="${student.scores[subject] || ''}" id="score-${student.id}" data-student-id="${student.id}" data-subject="${subject}"></td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function saveScores() {
    const inputs = document.querySelectorAll('[id^="score-"]');
    inputs.forEach(input => {
        const studentId = input.getAttribute('data-student-id');
        const subject = input.getAttribute('data-subject');
        const score = input.value;
        
        // ที่นี่คุณสามารถทำการส่งข้อมูลไปยังฐานข้อมูลหรือเซิร์ฟเวอร์
        console.log(`บันทึกคะแนน ${score} สำหรับนักเรียน ${studentId} ในวิชา ${subject}`);
    });

    alert("คะแนนถูกบันทึกเรียบร้อยแล้ว");
}
