// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Setup Interactive 3D Globe with Globe.gl
const initGlobe = () => {
    const container = document.getElementById('globe-container');
    if (!container) return;

    // We only want the globe to render and look beautiful on the right side of the screen
    // It will be interactive (rotatable/zoomable).
    
    const world = Globe()(container)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundColor('rgba(0,0,0,0)')
        .width(window.innerWidth)
        .height(window.innerHeight);

    // Auto-rotate the globe slowly
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;
    world.controls().enableZoom = false; // Disable zoom so it doesn't mess with page scrolling
    
    // Position the camera
    world.pointOfView({ lat: 20, lng: 0, altitude: 2 });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        world.width(window.innerWidth);
        world.height(window.innerHeight);
    });

    // Let's add some mock data (Geo-tagged photos) to visualize the app's functionality
    // These will appear as glowing arcs or points on the globe
    const markerData = [...Array(30).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 150,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.5 + 0.1,
        color: ['#FF3366', '#00C6FF', '#8E2DE2'][Math.floor(Math.random() * 3)]
    }));

    world
        .pointsData(markerData)
        .pointAltitude('size')
        .pointColor('color')
        .pointRadius(0.5);
};

// Initialize globe after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // A small timeout ensures the container has dimensions computed
    setTimeout(initGlobe, 100);
});

// Card Hover Glow Effect Tracker
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
