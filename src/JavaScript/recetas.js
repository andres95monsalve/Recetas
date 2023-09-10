let recetas = [];

window.onload = function() {
  cargarRecetas();
};

function agregarNota() {
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
    li.innerHTML += `&nbsp;&nbsp;&nbsp;<button class="boton_lista" onclick="editarNota(${index})">Editar</button>&nbsp;&nbsp;<button class="boton_lista" onclick="eliminarNota(${index})">Eliminar</button>`;
    recetasList.appendChild(li);
  });
}

function editarNota(index) {
  const nuevaNota = prompt('Editar nota:', recetas[index]);
  if (nuevaNota !== null) {
    recetas[index] = nuevaNota;
    guardarRecetas();
    cargarRecetas();
  }
}

function eliminarNota(index) {
  recetas.splice(index, 1);
  guardarRecetas();
  cargarRecetas();
}

function guardarRecetas() {

}

function guardarNotas() {
  if (recetas.length > 0) {
    const content = generateDocxContent(recetas);
    const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notas_recetas.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('No hay notas para guardar.');
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