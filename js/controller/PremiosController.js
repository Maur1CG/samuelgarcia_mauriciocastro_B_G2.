import { 
    GetPremios, 
    createPremio,
    updatePremio,
    DeletePremio
     } from "../";

const tableBody = document.querySelector("#premiosTable tbody");
const form = document.querySelector("#premioForm");
const modal = new bootstrap.Modal(document.querySelector("#premioModal"));
const modalTitle = document.querySelector("#premioModalLabel");

let editingId = null;

// Aqui se guardan los premios samy

async function loadPremios() {

    const premios = await GetPremios();
    tableBody.innerHTML = "";
    if (premios.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7"
        class="text-center">No hay registros actualmente</td></tr>`;
        return;

    }

    premios.forEach(p => {

        const row = `
 <tr>
    <td>${p.id_premio}</td>
    <td>${p.nombre_premio}</td>
    <td>${p.categoria}</td>
    <td>${p.ano_premio}</td>
    <td>${p.resultado}</td>
    <td>${p.fecha_registro}</td>
 <td>
    <button class="btn btn-warning btn-sm me-2 edit-btn" data-id="${p.id_premio}">
    <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger btn-sm delete-btn" data-id="${p.id_premio}">
    <i class="bi bi-trash"></i>
    </button>
    </td>
</tr>`;

        tableBody.insertAdjacentHTML("beforeend", row);
    });

    document.querySelectorAll(".edit-btn").forEach(btn =>
        btn.addEventListener("click", () => editPremio(btn.dataset.id))
    );
    document.querySelectorAll(".delete-btn").forEach(btn =>
        btn.addEventListener("click", () => removePremio(btn.dataset.id))

    );

}

// Crear o editar premio

form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
        nombre_premio: document.querySelector("#nombrePremio").value,
        categoria: document.querySelector("#categoriaPremio").value,
        ano_premio: document.querySelector("#anoPremio").value,
        resultado: document.querySelector("#resultadoPremio").value,
        fecha_registro: document.querySelector("#fechaRegistro").value

    };

    if (editingId) {
        await updatePremio(editingId, data);
    } else {
        await createPremio(data);
    }

    modal.hide();
    form.reset();
    editingId = null;
    loadPremios();

});

// Editar premio samyyy

async function editPremio(id) {
    
    const premios = await GetPremios();
    const premio = premios.find(p => p.id_premio == id);
    if (!premio) return;

    document.querySelector("#nombrePremio").value = premio.nombre_premio;
    document.querySelector("#categoriaPremio").value = premio.categoria;
    document.querySelector("#anoPremio").value = premio.ano_premio;
    document.querySelector("#resultadoPremio").value = premio.resultado;
    document.querySelector("#fechaRegistro").value = premio.fecha_registro;
    editingId = id;

    modalTitle.textContent = "Editar Premio";
    modal.show();

}

// Eliminar premio samyyyy

async function removePremio(id) {

    if (confirm("¿Seguro que deseas eliminar este premio?")) {
        await DeletePremio(id);
        loadPremios();
    }
}

document.addEventListener("DOMContentLoaded", loadPremios);
 