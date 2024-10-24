document.addEventListener('DOMContentLoaded', function() {
    // Directly setting the number of planted trees as a variable
    const plantedTrees = 70;
    const goal = 1000;

    // Calculate percentage
    const percentage = (plantedTrees / goal) * 100;

    // Calculate the circumference of the circle
    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    // Set the stroke-dasharray for both circles
    const circles = document.querySelectorAll('.circle-progress');
    circles.forEach(circle => {
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
    });

    // Left circle (planted trees progress)
    const leftCircle = document.getElementById('progress-left');
    const offset = circumference - (percentage / 100 * circumference);
    leftCircle.style.strokeDashoffset = offset;

    // Right circle (goal - always full)
    const rightCircle = document.getElementById('progress-right');
    rightCircle.style.strokeDashoffset = 0;

    // Update the text
    document.getElementById('planted-trees-text').innerText = plantedTrees;
    document.getElementById('goal-text').innerText = goal;
});
