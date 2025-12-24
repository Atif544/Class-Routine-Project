// Enhanced Mock Database with user registration
const mockDB = {
    teachers: [
        { 
            id: 6,
            email: 'mdshahinuddin@mbstu.ac.bd', 
            password: 'teacher123', 
            name: 'Dr. Md. Shahin Uddin',
            registeredAt: new Date().toISOString()
        },
        { 
            id: 1,
            email: 'anowarkabir@mbstu.ac.bd', 
            password: 'teacher123', 
            name: 'Dr. Anowar Kabir',
            registeredAt: new Date().toISOString()
        },
        {
            id: 2,
            email: 'nazrul@mbstu.ac.bd',
            password: 'teacher123',
            name: 'Nazrul Sir',
            registeredAt: new Date().toISOString()
        },
        {
            id: 3,
            email: 'nargis@mbstu.ac.bd',
            password: 'teacher123',
            name: "Nargis Ma'am",
            registeredAt: new Date().toISOString()
        },
        {
            id: 4,
            email: 'badrul@mbstu.ac.bd',
            password: 'teacher123',
            name: 'Badrul Sir',
            registeredAt: new Date().toISOString()
        },
        {
            id: 5,
            email: 'zia@mbstu.ac.bd',
            password: 'teacher123',
            name: 'Zia Sir',
            registeredAt: new Date().toISOString()
        }
    ],
    students: [
        { 
            id: 1,
            email: 'it22002@mbstu.ac.bd', 
            password: 'student123', 
            name: 'Rafiq Ahmed',
            studentId: 'IT22002',
            registeredAt: new Date().toISOString()
        },
        { 
            id: 2,
            email: 'it22009@mbstu.ac.bd', 
            password: 'student123', 
            name: 'Fatima Khan',
            studentId: 'IT22009',
            registeredAt: new Date().toISOString()
        },
        { 
            id: 3,
            email: 'it22015@mbstu.ac.bd', 
            password: 'student123', 
            name: 'Abdul Karim',
            studentId: 'IT22015',
            registeredAt: new Date().toISOString()
        }
    ],
    classes: [
        // Saturday
        { id: 101, course: 'ICT-3207', courseName: 'Computer Organization & Architecture', semester: '6th', day: 'Saturday', time: '09:00-09:50', room: 'R-206', teacher: 'Anowar Sir', teacherEmail: 'anowarkabir@mbstu.ac.bd', status: 'scheduled' },
        { id: 102, course: 'ICT-3204', courseName: 'Web Application Development Lab', semester: '6th', day: 'Saturday', time: '10:00-10:50', room: 'R-226A', teacher: 'Anowar Sir', teacherEmail: 'anowarkabir@mbstu.ac.bd', status: 'scheduled' },
        { id: 103, course: 'ICT-3203', courseName: 'Web Application Development', semester: '6th', day: 'Saturday', time: '11:00-11:50', room: 'R-226A', teacher: 'Anowar Sir', teacherEmail: 'anowarkabir@mbstu.ac.bd', status: 'scheduled' },
        { id: 104, course: 'ICT-3201', courseName: 'Computer Networks', semester: '6th', day: 'Saturday', time: '16:00-16:50', room: 'R-208', teacher: 'Nazrul Sir', teacherEmail: 'nazrul@mbstu.ac.bd', status: 'scheduled' },

        // Sunday
        { id: 201, course: 'ICT-3206', courseName: 'Digital Signal Processing Lab', semester: '6th', day: 'Sunday', time: '09:00-09:50', room: 'R-227', teacher: "Nargis Ma'am", teacherEmail: 'nargis@mbstu.ac.bd', status: 'scheduled' },
        { id: 202, course: 'ICT-3205', courseName: 'Digital Signal Processing', semester: '6th', day: 'Sunday', time: '11:00-11:50', room: 'R-208', teacher: "Nargis Ma'am", teacherEmail: 'nargis@mbstu.ac.bd', status: 'scheduled' },
        { id: 203, course: 'ICT-3201', courseName: 'Computer Networks', semester: '6th', day: 'Sunday', time: '14:00-14:50', room: 'R-208', teacher: 'Nazrul Sir', teacherEmail: 'nazrul@mbstu.ac.bd', status: 'scheduled' },
        { id: 204, course: 'ICT-3208', courseName: 'Research Methodology', semester: '6th', day: 'Sunday', time: '15:00-15:50', room: 'R-226B', teacher: 'Badrul Sir', teacherEmail: 'badrul@mbstu.ac.bd', status: 'scheduled' },

        // Monday
        { id: 301, course: 'ICT-3209', courseName: 'Ethical and Professional Conduct', semester: '6th', day: 'Monday', time: '09:00-09:50', room: 'R-208', teacher: 'Zia Sir', teacherEmail: 'zia@mbstu.ac.bd', status: 'scheduled' },
        { id: 302, course: 'ICT-3205', courseName: 'Digital Signal Processing', semester: '6th', day: 'Monday', time: '11:00-11:50', room: 'R-208', teacher: "Nargis Ma'am", teacherEmail: 'nargis@mbstu.ac.bd', status: 'scheduled' },
        { id: 303, course: 'ICT-3201', courseName: 'Computer Networks', semester: '6th', day: 'Monday', time: '12:00-12:50', room: 'R-208', teacher: 'Nazrul Sir', teacherEmail: 'nazrul@mbstu.ac.bd', status: 'scheduled' },
        { id: 304, course: 'ICT-3206', courseName: 'Digital Signal Processing Lab', semester: '6th', day: 'Monday', time: '15:00-15:50', room: 'R-226A', teacher: "Nargis Ma'am", teacherEmail: 'nargis@mbstu.ac.bd', status: 'scheduled' },

        // Tuesday
        { id: 401, course: 'ICT-3203', courseName: 'Web Application Development', semester: '6th', day: 'Tuesday', time: '11:00-11:50', room: 'R-226A', teacher: 'Anowar Sir', teacherEmail: 'anowarkabir@mbstu.ac.bd', status: 'scheduled' },
        { id: 402, course: 'ICT-3202', courseName: 'Computer Networks Lab', semester: '6th', day: 'Tuesday', time: '12:00-12:50', room: 'R-227', teacher: 'Nazrul Sir', teacherEmail: 'nazrul@mbstu.ac.bd', status: 'scheduled' },
        { id: 403, course: 'ICT-3202', courseName: 'Computer Networks Lab', semester: '6th', day: 'Tuesday', time: '14:00-14:50', room: 'R-227', teacher: 'Nazrul Sir', teacherEmail: 'nazrul@mbstu.ac.bd', status: 'scheduled' },
        { id: 404, course: 'ICT-3207', courseName: 'Computer Organization & Architecture', semester: '6th', day: 'Tuesday', time: '15:00-15:50', room: 'R-208', teacher: 'Anowar Sir', teacherEmail: 'anowarkabir@mbstu.ac.bd', status: 'scheduled' },
    ]
};

let currentUser = null;
let notifications = [];
let editingClassId = null;

// SIMULATED EMAIL SENDING FUNCTION
function sendEmailToStudents(subject, message, classDetails) {
    console.log('\n' + '='.repeat(80));
    console.log('📧 EMAIL NOTIFICATION SYSTEM - SENDING EMAILS');
    console.log('='.repeat(80));
    console.log('📌 Subject:', subject);
    console.log('📝 Message:\n', message);
    console.log('\n' + '-'.repeat(80));
    console.log('📬 EMAIL RECIPIENTS (All Students):');
    console.log('-'.repeat(80));
    
    mockDB.students.forEach((student, index) => {
        console.log(`${index + 1}. ${student.name}`);
        console.log(`   📧 Email: ${student.email}`);
        console.log(`   🆔 Student ID: ${student.studentId}`);
        console.log(`   ✅ Status: Email Sent Successfully`);
        console.log('');
    });
    
    console.log('-'.repeat(80));
    console.log(`✅ TOTAL EMAILS SENT: ${mockDB.students.length} students`);
    console.log('='.repeat(80) + '\n');
    
    return true;
}

function showAuthForm(formId) {
    // Hide all forms
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    
    // Show selected form
    document.getElementById(formId + 'Form').classList.add('active');
    
    // Activate corresponding tab
    let tabIndex = 0;
    switch(formId) {
        case 'teacherLogin': tabIndex = 0; break;
        case 'teacherRegister': tabIndex = 1; break;
        case 'studentLogin': tabIndex = 2; break;
        case 'studentRegister': tabIndex = 3; break;
    }
    document.querySelectorAll('.auth-tab')[tabIndex].classList.add('active');
    
    // Clear all error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
    document.querySelectorAll('.success-message').forEach(el => el.style.display = 'none');
    
    // Clear all input fields
    document.querySelectorAll('.auth-form input').forEach(input => input.value = '');
}

// Email validation functions
function isValidTeacherEmail(email) {
    return email.endsWith('@mbstu.ac.bd') && !email.match(/^IT\d{5}@mbstu\.ac\.bd$/i);
}

function isValidStudentEmail(email) {
    return /^it\d{5}@mbstu\.ac\.bd$/i.test(email);
}

// Real-time email validation
document.addEventListener('DOMContentLoaded', function() {
    const teacherEmailInput = document.getElementById('teacherRegisterEmail');
    const studentEmailInput = document.getElementById('studentRegisterEmail');
    
    if (teacherEmailInput) {
        teacherEmailInput.addEventListener('input', function(e) {
            const email = e.target.value.trim();
            const errorEl = document.getElementById('teacherRegisterEmailError');
            const successEl = document.getElementById('teacherRegisterEmailSuccess');
            
            if (email === '') {
                errorEl.style.display = 'none';
                successEl.style.display = 'none';
                return;
            }
            
            if (!isValidTeacherEmail(email)) {
                errorEl.textContent = 'Teacher email must end with @mbstu.ac.bd (e.g., anowarkabir@mbstu.ac.bd)';
                errorEl.style.display = 'block';
                successEl.style.display = 'none';
            } else if (mockDB.teachers.some(t => t.email === email)) {
                errorEl.textContent = 'This email is already registered';
                errorEl.style.display = 'block';
                successEl.style.display = 'none';
            } else {
                errorEl.style.display = 'none';
                successEl.textContent = '✓ Valid MBSTU teacher email';
                successEl.style.display = 'block';
            }
        });
    }
    
    if (studentEmailInput) {
        studentEmailInput.addEventListener('input', function(e) {
            const email = e.target.value.trim().toLowerCase();
            const errorEl = document.getElementById('studentRegisterEmailError');
            const successEl = document.getElementById('studentRegisterEmailSuccess');
            
            if (email === '') {
                errorEl.style.display = 'none';
                successEl.style.display = 'none';
                return;
            }
            
            if (!isValidStudentEmail(email)) {
                errorEl.textContent = 'Student email must be like it22002@mbstu.ac.bd (it followed by 5 digits)';
                errorEl.style.display = 'block';
                successEl.style.display = 'none';
            } else if (mockDB.students.some(s => s.email === email)) {
                errorEl.textContent = 'This student ID is already registered';
                errorEl.style.display = 'block';
                successEl.style.display = 'none';
            } else {
                errorEl.style.display = 'none';
                successEl.textContent = '✓ Valid MBSTU student email';
                successEl.style.display = 'block';
            }
        });
    }
});

function registerTeacher() {
    const name = document.getElementById('teacherRegisterName').value.trim();
    const email = document.getElementById('teacherRegisterEmail').value.trim();
    const password = document.getElementById('teacherRegisterPassword').value;
    const confirmPassword = document.getElementById('teacherRegisterConfirmPassword').value;
    
    let hasError = false;
    
    // Validate name
    if (name.length < 2) {
        document.getElementById('teacherRegisterNameError').textContent = 'Name is required';
        document.getElementById('teacherRegisterNameError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('teacherRegisterNameError').style.display = 'none';
    }
    
    // Validate email
    if (!isValidTeacherEmail(email)) {
        document.getElementById('teacherRegisterEmailError').textContent = 'Valid teacher email required (ending with @mbstu.ac.bd)';
        document.getElementById('teacherRegisterEmailError').style.display = 'block';
        hasError = true;
    } else if (mockDB.teachers.some(t => t.email === email)) {
        document.getElementById('teacherRegisterEmailError').textContent = 'This email is already registered';
        document.getElementById('teacherRegisterEmailError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('teacherRegisterEmailError').style.display = 'none';
    }
    
    // Validate password
    if (password.length < 6) {
        document.getElementById('teacherRegisterPasswordError').textContent = 'Password must be at least 6 characters';
        document.getElementById('teacherRegisterPasswordError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('teacherRegisterPasswordError').style.display = 'none';
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
        document.getElementById('teacherRegisterConfirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('teacherRegisterConfirmPasswordError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('teacherRegisterConfirmPasswordError').style.display = 'none';
    }
    
    if (hasError) return;
    
    // Register teacher
    const newTeacher = {
        id: mockDB.teachers.length + 1,
        email,
        password,
        name,
        registeredAt: new Date().toISOString()
    };
    
    mockDB.teachers.push(newTeacher);
    
    alert('✅ Registration successful! You can now login.');
    showAuthForm('teacherLogin');
}

function registerStudent() {
    const name = document.getElementById('studentRegisterName').value.trim();
    const email = document.getElementById('studentRegisterEmail').value.trim().toLowerCase();
    const password = document.getElementById('studentRegisterPassword').value;
    const confirmPassword = document.getElementById('studentRegisterConfirmPassword').value;
    
    let hasError = false;
    
    // Validate name
    if (name.length < 2) {
        document.getElementById('studentRegisterNameError').textContent = 'Name is required';
        document.getElementById('studentRegisterNameError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('studentRegisterNameError').style.display = 'none';
    }
    
    // Validate email
    if (!isValidStudentEmail(email)) {
        document.getElementById('studentRegisterEmailError').textContent = 'Valid student email required (it22002@mbstu.ac.bd format)';
        document.getElementById('studentRegisterEmailError').style.display = 'block';
        hasError = true;
    } else if (mockDB.students.some(s => s.email === email)) {
        document.getElementById('studentRegisterEmailError').textContent = 'This student ID is already registered';
        document.getElementById('studentRegisterEmailError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('studentRegisterEmailError').style.display = 'none';
    }
    
    // Validate password
    if (password.length < 6) {
        document.getElementById('studentRegisterPasswordError').textContent = 'Password must be at least 6 characters';
        document.getElementById('studentRegisterPasswordError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('studentRegisterPasswordError').style.display = 'none';
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
        document.getElementById('studentRegisterConfirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('studentRegisterConfirmPasswordError').style.display = 'block';
        hasError = true;
    } else {
        document.getElementById('studentRegisterConfirmPasswordError').style.display = 'none';
    }
    
    if (hasError) return;
    
    // Extract student ID from email
    const studentId = email.split('@')[0].toUpperCase();
    
    // Register student
    const newStudent = {
        id: mockDB.students.length + 1,
        email,
        password,
        name,
        studentId,
        registeredAt: new Date().toISOString()
    };
    
    mockDB.students.push(newStudent);
    
    alert('✅ Registration successful! You can now login.');
    showAuthForm('studentLogin');
}

function loginTeacher() {
    const email = document.getElementById('teacherLoginEmail').value.trim();
    const password = document.getElementById('teacherLoginPassword').value;
    
    // Clear previous errors
    document.getElementById('teacherLoginEmailError').style.display = 'none';
    document.getElementById('teacherLoginPasswordError').style.display = 'none';
    
    const teacher = mockDB.teachers.find(t => t.email === email && t.password === password);
    
    if (teacher) {
        currentUser = { ...teacher, role: 'teacher' };
        showDashboard();
    } else {
        document.getElementById('teacherLoginPasswordError').textContent = 'Invalid email or password';
        document.getElementById('teacherLoginPasswordError').style.display = 'block';
    }
}

function loginStudent() {
    const email = document.getElementById('studentLoginEmail').value.trim().toLowerCase();
    const password = document.getElementById('studentLoginPassword').value;
    
    // Clear previous errors
    document.getElementById('studentLoginEmailError').style.display = 'none';
    document.getElementById('studentLoginPasswordError').style.display = 'none';
    
    const student = mockDB.students.find(s => s.email === email && s.password === password);
    
    if (student) {
        currentUser = { ...student, role: 'student' };
        showDashboard();
    } else {
        document.getElementById('studentLoginPasswordError').textContent = 'Invalid student ID or password';
        document.getElementById('studentLoginPasswordError').style.display = 'block';
    }
}

function showDashboard() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('dashboard').classList.add('active');
    
    if (currentUser.role === 'teacher') {
        document.getElementById('userInfo').innerHTML = `Welcome, <strong>${currentUser.name}</strong> (Teacher)`;
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRole').textContent = 'Teacher';
        document.getElementById('userAvatar').textContent = '👨‍🏫';
        document.getElementById('addClassBtn').style.display = 'block';
        document.getElementById('studentViewNotice').style.display = 'none';
        
        // Set filter to show teacher's classes by default
        document.getElementById('filterSelect').value = 'myClasses';
    } else {
        document.getElementById('userInfo').innerHTML = `Welcome, <strong>${currentUser.name}</strong> (${currentUser.studentId})`;
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRole').textContent = `Student - ${currentUser.studentId}`;
        document.getElementById('userAvatar').textContent = '👨‍🎓';
        document.getElementById('addClassBtn').style.display = 'none';
        document.getElementById('studentViewNotice').style.display = 'block';
        document.getElementById('studentViewNotice').innerHTML = `<strong>Student View:</strong> You are viewing the class schedule for 6th semester.`;
        
        // Set filter to show 6th semester by default for students
        document.getElementById('filterSelect').value = '6th';
    }
    
    renderClasses();
    updateNotificationBadge();
}

function logout() {
    currentUser = null;
    notifications = [];
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('dashboard').classList.remove('active');
    showAuthForm('teacherLogin');
}

function renderClasses() {
    const grid = document.getElementById('classesGrid');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterValue = document.getElementById('filterSelect').value;
    
    let filteredClasses = [...mockDB.classes];
    
    // Apply search filter
    if (searchTerm) {
        filteredClasses = filteredClasses.filter(c => 
            c.course.toLowerCase().includes(searchTerm) ||
            c.courseName.toLowerCase().includes(searchTerm) ||
            c.semester.toLowerCase().includes(searchTerm) ||
            c.day.toLowerCase().includes(searchTerm) ||
            c.room.toLowerCase().includes(searchTerm) ||
            c.teacher.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply semester/teacher filter
    if (filterValue === 'myClasses' && currentUser.role === 'teacher') {
        filteredClasses = filteredClasses.filter(c => c.teacherEmail === currentUser.email);
    } else if (filterValue !== 'all' && filterValue !== 'myClasses') {
        filteredClasses = filteredClasses.filter(c => c.semester === filterValue);
    }
    
    if (filteredClasses.length === 0) {
        grid.innerHTML = '<div class="no-data"><h3>No classes found</h3><p>Try adjusting your search or filters</p></div>';
        return;
    }
    
    grid.innerHTML = filteredClasses.map(classItem => `
        <div class="class-card ${classItem.status}">
            <div class="class-header">
                <div>
                    <h3>${classItem.course}</h3>
                    <p>${classItem.courseName}</p>
                </div>
                ${classItem.status === 'cancelled' ? '<span class="status-badge cancelled">Cancelled</span>' : ''}
                ${classItem.status === 'rescheduled' ? '<span class="status-badge rescheduled">Rescheduled</span>' : ''}
            </div>
            <div class="class-details">
                <p><strong>Semester:</strong> ${classItem.semester}</p>
                <p><strong>Day:</strong> ${classItem.day}</p>
                <p><strong>Time:</strong> ${classItem.time}</p>
                <p><strong>Room:</strong> ${classItem.room}</p>
                <p><strong>Teacher:</strong> ${classItem.teacher}</p>
            </div>
            ${currentUser.role === 'teacher' && classItem.teacherEmail === currentUser.email && classItem.status === 'scheduled' ? `
                <div class="class-actions">
                    <button class="action-btn reschedule-btn" onclick="openRescheduleModal(${classItem.id})">📅 Reschedule</button>
                    <button class="action-btn cancel-btn" onclick="cancelClass(${classItem.id})">❌ Cancel</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function filterClasses() {
    renderClasses();
}

function cancelClass(classId) {
    if (!confirm('Are you sure you want to cancel this class?\n\n⚠️ Email notifications will be sent to ALL students.')) return;
    
    const classItem = mockDB.classes.find(c => c.id === classId);
    if (!classItem) return;
    
    classItem.status = 'cancelled';
    
    const subject = `⚠️ Class Cancelled - ${classItem.course}`;
    const message = `Dear Students,

The following class has been CANCELLED:

📚 Course: ${classItem.course} - ${classItem.courseName}
📅 Day: ${classItem.day}
🕐 Time: ${classItem.time}
🏫 Room: ${classItem.room}
👨‍🏫 Teacher: ${classItem.teacher}

Please check with your teacher for alternative arrangements or makeup classes.

Thank you for your understanding.`;
    
    // Send email to ALL students
    sendEmailToStudents(subject, message, classItem);
    
    addNotification(
        `Class Cancelled: ${classItem.course} (${classItem.courseName}) on ${classItem.day} at ${classItem.time}`,
        true
    );
    renderClasses();
}

function openRescheduleModal(classId) {
    editingClassId = classId;
    const classItem = mockDB.classes.find(c => c.id === classId);
    if (!classItem) return;
    
    document.getElementById('rescheduleDay').value = classItem.day;
    document.getElementById('rescheduleTime').value = classItem.time;
    document.getElementById('rescheduleRoom').value = classItem.room;
    
    document.getElementById('rescheduleModal').classList.add('active');
}

function closeRescheduleModal() {
    document.getElementById('rescheduleModal').classList.remove('active');
    editingClassId = null;
}

function saveReschedule() {
    const classItem = mockDB.classes.find(c => c.id === editingClassId);
    if (!classItem) return;
    
    const oldDetails = `${classItem.day} at ${classItem.time} in ${classItem.room}`;
    
    classItem.day = document.getElementById('rescheduleDay').value;
    classItem.time = document.getElementById('rescheduleTime').value;
    classItem.room = document.getElementById('rescheduleRoom').value;
    classItem.status = 'rescheduled';
    
    const subject = `📅 Class Rescheduled - ${classItem.course}`;
    const message = `Dear Students,

The following class has been RESCHEDULED:

📚 Course: ${classItem.course} - ${classItem.courseName}
❌ Previous Schedule: ${oldDetails}

✅ NEW SCHEDULE:
📅 Day: ${classItem.day}
🕐 Time: ${classItem.time}
🏫 Room: ${classItem.room}
👨‍🏫 Teacher: ${classItem.teacher}

Please note the new schedule and attend accordingly.

Thank you!`;
    
    // Send email to ALL students
    sendEmailToStudents(subject, message, classItem);
    
    addNotification(
        `Class Rescheduled: ${classItem.course} - New time: ${classItem.day} at ${classItem.time} in ${classItem.room}`,
        true
    );
    
    closeRescheduleModal();
    renderClasses();
}

function showAddClassModal() {
    document.getElementById('addClassModal').classList.add('active');
}

function closeAddClassModal() {
    document.getElementById('addClassModal').classList.remove('active');
    document.getElementById('newCourse').value = '';
    document.getElementById('newCourseName').value = '';
    document.getElementById('newSemester').value = '';
    document.getElementById('newDay').value = '';
    document.getElementById('newTime').value = '';
    document.getElementById('newRoom').value = '';
}

function saveNewClass() {
    const course = document.getElementById('newCourse').value;
    const courseName = document.getElementById('newCourseName').value;
    const semester = document.getElementById('newSemester').value;
    const day = document.getElementById('newDay').value;
    const time = document.getElementById('newTime').value;
    const room = document.getElementById('newRoom').value;
    
    if (!course || !semester || !day || !time || !room) {
        alert('Please fill all required fields!');
        return;
    }
    
    const newClass = {
        id: Date.now(),
        course,
        courseName,
        semester,
        day,
        time,
        room,
        teacher: currentUser.name,
        teacherEmail: currentUser.email,
        status: 'scheduled'
    };
    
    mockDB.classes.push(newClass);
    
    const subject = `📚 New Class Added - ${newClass.course}`;
    const message = `Dear Students,

A new class has been added to your schedule:

📚 Course: ${newClass.course} - ${newClass.courseName}
📖 Semester: ${newClass.semester}
📅 Day: ${newClass.day}
🕐 Time: ${newClass.time}
🏫 Room: ${newClass.room}
👨‍🏫 Teacher: ${newClass.teacher}

Please update your schedule accordingly.

Thank you!`;
    
    // Send email to ALL students
    sendEmailToStudents(subject, message, newClass);
    
    addNotification(`New Class Added: ${newClass.course} (${newClass.courseName})`, true);
    
    closeAddClassModal();
    renderClasses();
}

function addNotification(message, emailSent = false) {
    notifications.unshift({
        id: Date.now(),
        message,
        time: new Date().toLocaleString(),
        emailSent
    });
    
    updateNotificationBadge();
    renderNotifications();
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (notifications.length > 0) {
        badge.textContent = notifications.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function toggleNotifications() {
    const panel = document.getElementById('notificationsPanel');
    panel.classList.toggle('active');
    if (panel.classList.contains('active')) {
        renderNotifications();
    }
}

function renderNotifications() {
    const list = document.getElementById('notificationsList');
    
    if (notifications.length === 0) {
        list.innerHTML = '<div class="no-data"><p>No notifications yet</p></div>';
        return;
    }
    
    list.innerHTML = notifications.map(notif => `
        <div class="notification-item">
            <p>${notif.message}</p>
            <span class="notification-time">${notif.time}</span>
            ${notif.emailSent ? '<span class="email-sent-badge">✓ Emailed to All Students</span>' : ''}
        </div>
    `).join('');
}

document.addEventListener('click', function(e) {
    const panel = document.getElementById('notificationsPanel');
    const btn = document.querySelector('.notification-btn');
    
    if (panel && panel.classList.contains('active') && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('active');
    }
});

// Initialize with teacher login form
showAuthForm('teacherLogin');