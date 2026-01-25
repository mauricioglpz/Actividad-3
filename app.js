
class Tarea {
    constructor(id, nombre, completada = false) {
        this.id = id;
        this.nombre = nombre;
        this.completada = completada;
    }
}


class GestorDeTareas {
    constructor() {
        this.tareas = JSON.parse(localStorage.getItem('mercedes_tasks')) || [];
        this.taskListElement = document.getElementById('taskList');
        this.inputElement = document.getElementById('taskInput');
        this.render();
    }

    agregarTarea(nombre) {
        if (nombre.trim() === "") {
            alert("Por favor, escribe una tarea válida.");
            return;
        }
        const nuevaTarea = new Tarea(Date.now(), nombre);
        this.tareas.push(nuevaTarea);
        this.guardarYRefrescar();
        this.inputElement.value = "";
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.guardarYRefrescar();
    }

    editarTarea(id) {
        const nuevoNombre = prompt("Edita tu tarea:");
        if (nuevoNombre && nuevoNombre.trim() !== "") {
            this.tareas = this.tareas.map(t => 
                t.id === id ? { ...t, nombre: nuevoNombre } : t
            );
            this.guardarYRefrescar();
        }
    }

    toggleEstado(id) {
        this.tareas = this.tareas.map(t => 
            t.id === id ? { ...t, completada: !t.completada } : t
        );
        this.guardarYRefrescar();
    }

    guardarYRefrescar() {
        localStorage.setItem('mercedes_tasks', JSON.stringify(this.tareas));
        this.render();
    }

    render() {
        this.taskListElement.innerHTML = '';
        
        this.tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.className = 'course-col'; // Reutilizamos tus estilos CSS
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.marginBottom = '15px';
            li.style.width = '100%';

            li.innerHTML = `
                <span style="text-decoration: ${tarea.completada ? 'line-through' : 'none'}; cursor: pointer;" 
                      onclick="gestor.toggleEstado(${tarea.id})">
                    ${tarea.nombre}
                </span>
                <div>
                    <button onclick="gestor.editarTarea(${tarea.id})" style="margin-right: 10px; border: none; background: none; cursor:pointer;"><i class="fa fa-edit"></i></button>
                    <button onclick="gestor.eliminarTarea(${tarea.id})" style="color: red; border: none; background: none; cursor:pointer;"><i class="fa fa-trash"></i></button>
                </div>
            `;
            this.taskListElement.appendChild(li);
        });
    }
}

const gestor = new GestorDeTareas();

document.getElementById('addTaskBtn').addEventListener('click', () => {
    gestor.agregarTarea(document.getElementById('taskInput').value);
});

document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') gestor.agregarTarea(e.target.value);
});