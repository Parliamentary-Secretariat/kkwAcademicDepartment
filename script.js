async function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("teachers.json");
        const teachers = await response.json();

        const teacher = teachers.find(t => t.username === username && t.password === password);

        if (teacher) {
            alert("Login สำเร็จ!");
            // คุณสามารถเพิ่มการนำทางไปยังหน้าอื่นได้ที่นี่
        } else {
            document.getElementById("error").textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล", error);
    }
}
