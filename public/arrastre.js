export function arrastre(contenedor) {
    let isDragging = false;
    let offsetX, offsetY;

    // Función para iniciar el arrastre
    function iniciarArrastre(e) {
        isDragging = true;
        // Calcular la diferencia entre la posición del mouse y la posición del contenedor
        offsetX = e.clientX - contenedor.getBoundingClientRect().left;
        offsetY = e.clientY - contenedor.getBoundingClientRect().top;
    }

    // Función para mover el contenedor
    function moverContenedor(e) {
        if (isDragging) {
            // Actualizar la posición del contenedor según la posición del mouse
            contenedor.style.left = e.clientX - offsetX + 'px';
            contenedor.style.top = e.clientY - offsetY + 'px';
        }
    }

    // Función para finalizar el arrastre
    function finalizarArrastre() {
        isDragging = false;
    }

    // Agregar event listeners para los eventos de mouse
    contenedor.addEventListener('mousedown', iniciarArrastre);
    document.addEventListener('mousemove', moverContenedor);
    document.addEventListener('mouseup', finalizarArrastre);
}
