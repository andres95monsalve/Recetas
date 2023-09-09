let recetas = [];

window.onload = function() {
  cargarRecetas();
};

function agregarReceta() {
  const nota = document.getElementById('newNote').value;
  if (nota.trim() !== '') {
    recetas.push(nota);
    guardarRecetas();
    document.getElementById('newNote').value = '';
    cargarRecetas();
  }
}

function cargarRecetas() {
  const recetasList = document.getElementById('recetas');
  recetasList.innerHTML = '';
  recetas.forEach((nota, index) => {
    const li = document.createElement('li');
    li.textContent = nota;
    li.innerHTML += `&nbsp;&nbsp;&nbsp;<button class="boton_lista" onclick="editarReceta(${index})">Editar</button>&nbsp;&nbsp;<button class="boton_lista" onclick="eliminarReceta(${index})">Eliminar</button>`;
    recetasList.appendChild(li);
  });
}

function editarReceta(index) {
  const nuevaReceta = prompt('Editar Receta:', recetas[index]);
  if (nuevaReceta !== null) {
    recetas[index] = nuevaReceta;
    guardarRecetas();
    cargarRecetas();
  }
}

function eliminarReceta(index) {
  recetas.splice(index, 1);
  guardarRecetas();
  cargarRecetas();
}

function guardarRecetas() {
  if (recetas.length > 0) {
    const content = generateDocxContent(recetas);
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recetas.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('No hay receta para guardar.');
  }
}

function generateDocxContent(notes) {
  let content = '<html><body><ul>';
  notes.forEach((nota) => {
    content += `<li>${nota}</li>`;
  });
  content += '</ul></body></html>';
  return content;
}