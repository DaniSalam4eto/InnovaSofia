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

    const leftCircle = document.querySelector('#circle-left .circle-progress');
    const offset = (100 - percentage) / 100 * circumference;
    
    setTimeout(() => {
        leftCircle.style.strokeDashoffset = offset;
        document.querySelector('#circle-right .circle-progress').style.strokeDashoffset = 0;
    }, 300);

    const counter = document.getElementById('planted-trees-text');
    const duration = 2000;
    const steps = 60;
    const increment = plantedTrees / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= plantedTrees) {
            counter.textContent = plantedTrees;
            counter.classList.add('animated-number');
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, duration / steps);

    window.addEventListener('scroll', function() {
        const steps = document.querySelectorAll('.step');
        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                step.style.animation = `fadeInSlide 0.5s ease forwards ${step.style.animationDelay}`;
            }
        });
    });
    document.addEventListener("DOMContentLoaded", function() {
        const roadmapSection = document.querySelector('.roadmap-container');
        const steps = document.querySelectorAll('.step');
    
      
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    steps.forEach((step, index) => {
                        step.style.animation = `fadeInSlide 0.5s ease forwards ${index * 0.2}s`;
                    });
                    observer.unobserve(roadmapSection);
                }
            });
        }, { threshold: 0.1 });
    
        observer.observe(roadmapSection);
    });
    
});
