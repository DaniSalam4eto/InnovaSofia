document.addEventListener('DOMContentLoaded', function() {

    const plantedTrees = 1220;
    const goal = 10000;


    const percentage = (plantedTrees / goal) * 100;

 
    const radius = 45;
    const circumference = 2 * Math.PI * radius;


    const circles = document.querySelectorAll('.circle-progress');
    circles.forEach(circle => {
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
    });

    const leftCircle = document.getElementById('progress-left');
    const offset = circumference - (percentage / 100 * circumference);
    leftCircle.style.strokeDashoffset = offset;

    const rightCircle = document.getElementById('progress-right');
    rightCircle.style.strokeDashoffset = 0;

    document.getElementById('planted-trees-text').innerText = plantedTrees;
    document.getElementById('goal-text').innerText = goal;
});
