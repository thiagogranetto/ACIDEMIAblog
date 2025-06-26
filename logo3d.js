// 3D Logo Animation
function init3DLogo() {
    const container = document.getElementById('logo-container');
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create logo geometry
    const geometry = new THREE.DodecahedronGeometry(0.8);;
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x39ff14, // Acid green
        wireframe: true 
    });
    const logo = new THREE.Mesh(geometry, material);
    scene.add(logo);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x9400d3); // Purple
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00f0ff, 0.8); // Blue
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 2;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        logo.rotation.x += 0.01;
        logo.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init3DLogo);