// Enhanced Mock Database with localStorage persistence
let mockDB = {
    teachers: [],
    students: [],
    classes: [],
    notifications: [] // Store all notifications for persistence
};

// Backend API base (local development)
const API_BASE = 'http://localhost:3000/api';
// Load data from localStorage on startup
async function loadFromLocalStorage() {
    // Try to sync from backend first
    try {
        const res = await fetch(`${API_BASE}/sync`, { method: 'GET' });
        if (res.ok) {
            const data = await res.json();
            mockDB = data;
            saveToLocalStorage();
            return;
        }
    } catch (err) {
        // Backend not available — fall back to localStorage
        console.warn('Backend sync failed, using localStorage fallback.');
    }

    const savedDB = localStorage.getItem('classRoutineDB');
    if (savedDB) {
        mockDB = JSON.parse(savedDB);
    } else {
        // No saved data and backend not available — start with empty DB (credentials must be stored in MySQL)
        mockDB = {
            teachers: [],
            students: [],
            classes: [],
            notifications: []
        };
        saveToLocalStorage();
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('classRoutineDB', JSON.stringify(mockDB));
}

let currentUser = null;
let editingClassId = null;

// Initialize on load
document.addEventListener('DOMContentLoaded', async function () {
    await loadFromLocalStorage();
    showAuthForm('teacherLogin');

    // Initialize email validation listeners
    initEmailValidation();
});

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
    switch (formId) {
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
    if (!email) return false;
    const e = email.toLowerCase();
    return /@mbstu\.ac\.bd$/i.test(e) && !/^it\d{5}@mbstu\.ac\.bd$/i.test(e);
}

function isValidStudentEmail(email) {
    return /^it\d{5}@mbstu\.ac\.bd$/i.test(email);
}

// Real-time email validation
function initEmailValidation() {
    const teacherEmailInput = document.getElementById('teacherRegisterEmail');
    const studentEmailInput = document.getElementById('studentRegisterEmail');

    if (teacherEmailInput) {
        teacherEmailInput.addEventListener('input', function (e) {
            const email = e.target.value.trim().toLowerCase();
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
            } else if (mockDB.teachers.some(t => (t.email || '').toLowerCase() === email)) {
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
        studentEmailInput.addEventListener('input', function (e) {
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
}

async function registerTeacher() {
    const name = document.getElementById('teacherRegisterName').value.trim();
    const email = document.getElementById('teacherRegisterEmail').value.trim().toLowerCase();
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
    } else if (mockDB.teachers.some(t => (t.email || '').toLowerCase() === email)) {
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
    // Try registering via backend API
    try {
        const res = await fetch(`${API_BASE}/register/teacher`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const body = await res.json().catch(() => ({}));

        if (res.ok) {
            // server returns created teacher
            mockDB.teachers.push(body);
            saveToLocalStorage();
            alert('✅ Registration successful! You can now login.');
            showAuthForm('teacherLogin');
            return;
        }

        if (res.status === 409) {
            document.getElementById('teacherRegisterEmailError').textContent = body.message || 'This email is already registered';
            document.getElementById('teacherRegisterEmailError').style.display = 'block';
            return;
        }

        // other server error -> fall back to local
        console.warn('Server registration failed, falling back to localStorage');
    } catch (err) {
        console.warn('Backend unreachable, saving locally', err);
    }

    // Fallback: register locally
    const newTeacher = {
        id: Date.now(),
        email,
        password,
        name,
        registeredAt: new Date().toISOString()
    };

    mockDB.teachers.push(newTeacher);
    saveToLocalStorage();

    alert('✅ Registration successful (saved locally)! You can now login.');
    showAuthForm('teacherLogin');
}

async function registerStudent() {
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
    // Try registering via backend API
    try {
        const res = await fetch(`${API_BASE}/register/student`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const body = await res.json().catch(() => ({}));

        if (res.ok) {
            mockDB.students.push(body);
            saveToLocalStorage();
            alert('✅ Registration successful! You can now login.');
            showAuthForm('studentLogin');
            return;
        }

        if (res.status === 409) {
            document.getElementById('studentRegisterEmailError').textContent = body.message || 'This student ID is already registered';
            document.getElementById('studentRegisterEmailError').style.display = 'block';
            return;
        }

        console.warn('Server registration failed, falling back to localStorage');
    } catch (err) {
        console.warn('Backend unreachable, saving locally', err);
    }

    // Fallback: register locally
    const newStudent = {
        id: Date.now(),
        email,
        password,
        name,
        studentId,
        registeredAt: new Date().toISOString()
    };

    mockDB.students.push(newStudent);
    saveToLocalStorage();

    alert('✅ Registration successful (saved locally)! You can now login.');
    showAuthForm('studentLogin');
}

async function loginTeacher() {
    const email = document.getElementById('teacherLoginEmail').value.trim().toLowerCase();
    const password = document.getElementById('teacherLoginPassword').value;

    // Clear previous errors
    document.getElementById('teacherLoginEmailError').style.display = 'none';
    document.getElementById('teacherLoginPasswordError').style.display = 'none';

    // Try backend authentication
    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role: 'teacher' })
        });

        const body = await res.json().catch(() => ({}));

        if (res.ok && body && body.email) {
            currentUser = { ...body, role: 'teacher' };
            showDashboard();
            return;
        }
    } catch (err) {
        console.warn('Backend login failed, falling back to local auth');
    }

    // Fallback: local auth
    const teacher = mockDB.teachers.find(t => (t.email || '').toLowerCase() === email && t.password === password);

    if (teacher) {
        currentUser = { ...teacher, role: 'teacher' };
        showDashboard();
    } else {
        document.getElementById('teacherLoginPasswordError').textContent = 'Invalid email or password';
        document.getElementById('teacherLoginPasswordError').style.display = 'block';
    }
}

async function loginStudent() {
    const email = document.getElementById('studentLoginEmail').value.trim().toLowerCase();
    const password = document.getElementById('studentLoginPassword').value;

    // Clear previous errors
    document.getElementById('studentLoginEmailError').style.display = 'none';
    document.getElementById('studentLoginPasswordError').style.display = 'none';

    // Try backend authentication
    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role: 'student' })
        });

        const body = await res.json().catch(() => ({}));

        if (res.ok && body && body.email) {
            currentUser = { ...body, role: 'student' };
            showDashboard();
            return;
        }
    } catch (err) {
        console.warn('Backend login failed, falling back to local auth');
    }

    // Fallback: local auth
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
        // Set filter to show 6th semester by default for students
        document.getElementById('filterSelect').value = '6th';
        // Update student view notice based on selected filter
        updateStudentViewNotice();
    }

    renderClasses();
    updateNotificationBadge();
}

function logout() {
    currentUser = null;
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
            ${currentUser.role === 'teacher' && classItem.teacherEmail === currentUser.email ? `
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
    updateStudentViewNotice();
}

// Update the student view notice text depending on selected semester
function updateStudentViewNotice() {
    if (!currentUser || currentUser.role !== 'student') return;
    const filterValue = document.getElementById('filterSelect').value;
    const noticeEl = document.getElementById('studentViewNotice');

    if (filterValue === 'all') {
        noticeEl.innerHTML = `<strong>Student View:</strong> You are viewing the class schedule for all semesters.`;
    } else if (filterValue === 'myClasses') {
        noticeEl.innerHTML = `<strong>Student View:</strong> You are viewing classes assigned to your teacher (select a semester to filter).`;
    } else {
        // Normalize ordinal display (1st, 2nd, 3rd -> display with 'semester')
        const sem = filterValue;
        noticeEl.innerHTML = `<strong>Student View:</strong> You are viewing the class schedule for ${sem} semester.`;
    }
}

function cancelClass(classId) {
    if (!confirm('Are you sure you want to cancel this class?\n\n⚠️ Email notifications will be sent to ALL students.')) return;

    const classItem = mockDB.classes.find(c => c.id === classId);
    if (!classItem) return;

    const oldDetails = `${classItem.day} at ${classItem.time} in ${classItem.room}`;
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

    // Persist change to backend
    (async () => {
        try {
            const res = await fetch(`${API_BASE}/classes/${classId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(classItem)
            });
            if (res.ok) {
                const updated = await res.json().catch(() => null);
                if (updated && updated.id) {
                    // replace local item id if needed
                    const idx = mockDB.classes.findIndex(c => c.id === classId);
                    if (idx !== -1) mockDB.classes[idx] = updated;
                }
            }
        } catch (err) {
            console.warn('Failed to persist cancelled class to backend, saved locally');
        }
    })();

    // Add notification for ALL users (teacher and students)
    addNotificationForAll(
        `⚠️ Class Cancelled: ${classItem.course} (${classItem.courseName}) on ${classItem.day} at ${classItem.time} in ${classItem.room}`,
        true
    );

    saveToLocalStorage();
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

    const oldDay = classItem.day;
    const oldTime = classItem.time;
    const oldRoom = classItem.room;

    classItem.day = document.getElementById('rescheduleDay').value;
    classItem.time = document.getElementById('rescheduleTime').value;
    classItem.room = document.getElementById('rescheduleRoom').value;
    classItem.status = 'rescheduled';

    const subject = `📅 Class Rescheduled - ${classItem.course}`;
    const message = `Dear Students,

The following class has been RESCHEDULED:

📚 Course: ${classItem.course} - ${classItem.courseName}
❌ Previous Schedule: ${oldDay} at ${oldTime} in ${oldRoom}

✅ NEW SCHEDULE:
📅 Day: ${classItem.day}
🕐 Time: ${classItem.time}
🏫 Room: ${classItem.room}
👨‍🏫 Teacher: ${classItem.teacher}

Please note the new schedule and attend accordingly.

Thank you!`;

    // Send email to ALL students
    sendEmailToStudents(subject, message, classItem);

    // Persist reschedule to backend
    (async () => {
        try {
            const res = await fetch(`${API_BASE}/classes/${classItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(classItem)
            });
            if (res.ok) {
                const updated = await res.json().catch(() => null);
                if (updated && updated.id) {
                    const idx = mockDB.classes.findIndex(c => c.id === classItem.id);
                    if (idx !== -1) mockDB.classes[idx] = updated;
                }
            }
        } catch (err) {
            console.warn('Failed to persist reschedule to backend, saved locally');
        }
    })();

    // Add notification for ALL users (teacher and students)
    addNotificationForAll(
        `📅 Class Rescheduled: ${classItem.course} (${classItem.courseName}) \n         Old: ${oldDay} at ${oldTime} in ${oldRoom}\n         New: ${classItem.day} at ${classItem.time} in ${classItem.room}`,
        true
    );

    saveToLocalStorage();
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

    // Persist to backend
    (async () => {
        try {
            const res = await fetch(`${API_BASE}/classes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClass)
            });
            const body = await res.json().catch(() => null);
            if (res.ok && body && body.id) {
                mockDB.classes.push(body);
            } else {
                mockDB.classes.push(newClass); // fallback
            }
        } catch (err) {
            console.warn('Failed to persist new class to backend, saved locally');
            mockDB.classes.push(newClass);
        }
    })();

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

    // Add notification for ALL users
    addNotificationForAll(`📚 New Class Added: ${newClass.course} (${newClass.courseName}) on ${newClass.day} at ${newClass.time}`, true);

    saveToLocalStorage();
    closeAddClassModal();
    renderClasses();
}

// Add notification for ALL users (students and teachers)
function addNotificationForAll(message, emailSent = false) {
    const notification = {
        message,
        emailSent,
        forAll: true
    };

    // Persist to backend
    (async () => {
        try {
            const res = await fetch(`${API_BASE}/notifications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notification)
            });
            const body = await res.json().catch(() => null);
            if (res.ok && body && body.id) {
                mockDB.notifications.push(body);
            } else {
                // fallback local
                const local = { id: Date.now(), message, time: new Date().toLocaleString(), emailSent, forAll: true };
                mockDB.notifications.push(local);
            }
        } catch (err) {
            const local = { id: Date.now(), message, time: new Date().toLocaleString(), emailSent, forAll: true };
            mockDB.notifications.push(local);
        }

        saveToLocalStorage();
        updateNotificationBadge();
        renderNotifications();
    })();
}

// Get notifications for current user
function getNotificationsForCurrentUser() {
    if (!currentUser) return [];

    // Return all notifications (since we're storing them for all users)
    return mockDB.notifications;
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    const notifications = getNotificationsForCurrentUser();

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
    const notifications = getNotificationsForCurrentUser();

    if (notifications.length === 0) {
        list.innerHTML = '<div class="no-data"><p>No notifications yet</p></div>';
        return;
    }

    // Display notifications in reverse chronological order (newest first)
    list.innerHTML = notifications.slice().reverse().map(notif => `
        <div class="notification-item">
            <p>${notif.message}</p>
            <span class="notification-time">${notif.time}</span>
            ${notif.emailSent ? '<span class="email-sent-badge">✓ Emailed to All Students</span>' : ''}
        </div>
    `).join('');
}

document.addEventListener('click', function (e) {
    const panel = document.getElementById('notificationsPanel');
    const btn = document.querySelector('.notification-btn');

    if (panel && panel.classList.contains('active') && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('active');
    }
});