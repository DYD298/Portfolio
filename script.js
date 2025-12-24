// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-4-line');
    } else {
        icon.classList.remove('ri-menu-4-line');
        icon.classList.add('ri-close-line');
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('ri-close-line');
        icon.classList.add('ri-menu-4-line');
    });
});

// Three.js Background Animation
const canvas = document.getElementById('bg-canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles
const geometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    // Generate random positions spread out in a wider area
    posArray[i] = (Math.random() - 0.5) * 15; // Spread between -7.5 and 7.5
}

geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create a circular textute for stars
const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');

const material = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x6366f1, // Primary color (Indigo)
    transparent: true,
    opacity: 0.8,
    map: sprite,
    blending: THREE.AdditiveBlending
});

// Create different layers for depth effect
const particlesMesh = new THREE.Points(geometry, material);
scene.add(particlesMesh);

// Center the camera
camera.position.z = 3;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Rotate the entire particle system slowly
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;

    // Mouse Parallax effect
    // Calculate target rotation based on mouse position
    // (mouseX / width - 0.5) gives value from -0.5 to 0.5
    const targetX = mouseX * 0.0001;
    const targetY = mouseY * 0.0001;

    particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
    particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

    // Wave effect (optional subtle movement)
    // particlesMesh.position.y = Math.sin(elapsedTime * 0.2) * 0.1;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
