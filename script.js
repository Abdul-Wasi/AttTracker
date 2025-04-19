// script.js
document.getElementById('attendanceForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const attendedClasses = parseInt(document.getElementById('attendedClasses').value);
    const totalClasses = parseInt(document.getElementById('totalClasses').value);
    const minAttendance = parseInt(document.getElementById('minAttendance').value);

    const attendanceResult = document.getElementById('attendanceResult');
    const attendanceStatus = document.getElementById('attendanceStatus');

    // Clear previous results and remove status classes
    attendanceResult.textContent = '';
    attendanceStatus.textContent = '';
    attendanceStatus.classList.remove('green', 'red');

    // Validate input
    if (isNaN(attendedClasses) || isNaN(totalClasses) || isNaN(minAttendance)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    if (attendedClasses < 0 || totalClasses <= 0 || minAttendance < 0 || minAttendance > 100) {
        alert('Please enter valid values: \n- Attended classes cannot be negative.\n- Total classes must be greater than zero.\n- Minimum attendance percentage should be between 0 and 100.');
        return;
    }

    if (attendedClasses > totalClasses) {
        alert('Attended classes cannot be greater than total classes.');
        return;
    }

    // Current attendance percentage
    const currentPercentage = (attendedClasses / totalClasses) * 100;

    // Calculate the number of total classes required to meet the minimum attendance percentage
    const requiredTotalClasses = Math.ceil((minAttendance / 100) * (totalClasses + (totalClasses - attendedClasses)));

    // Calculate how many future classes are needed to meet the required total classes
    const futureClassesRequired = requiredTotalClasses - attendedClasses;

    // Display the results with a bit more flair
    attendanceResult.textContent = `Your current attendance is: ${currentPercentage.toFixed(2)}%`;

    if (currentPercentage >= minAttendance) {
        attendanceStatus.textContent = 'Fantastic! You meet the required attendance.';
        attendanceStatus.classList.add('green');
    } else {
        attendanceStatus.textContent = `Keep going! You need to attend ${futureClassesRequired} more classes to reach ${minAttendance}% attendance.`;
        attendanceStatus.classList.add('red');
    }
});