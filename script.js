const frm = document.forms.registrar;
frm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (frm.titulo.value.length === 0 || frm.titulo.value.trim() === "") {
        alert("Insira o nome da tarefa!");
        return;
    }

    if (frm.descricao.value.length === 0 || frm.descricao.value.trim() === "") {
        alert("Insira a descrição da tarefa!");
        return;
    }

    criarItemEmTela();
});

function criarItemEmTela() {
    const cbx = document.createElement("input");
    cbx.setAttribute("type", "checkbox");

    const pTitulo = document.createElement("p");
    pTitulo.textContent = frm.titulo.value;

    const pDescricao = document.createElement("p");
    pDescricao.textContent = frm.descricao.value;

    const pDataHora = document.createElement("p");
    pDataHora.textContent = frm.dataHora.value;

    const div = document.createElement("div");
    div.append(cbx, pTitulo, pDescricao, pDataHora);

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("remover");
    btnRemover.addEventListener("click", function(event) {
        event.target.parentElement.remove();
    });

    cbx.addEventListener("change", function(event) {
        const tarefalista = event.target.parentElement.parentElement;
        if (event.target.checked) {
            tarefalista.style.background = "#0dcaf0";
            pTitulo.style.color = "white";
            pDescricao.style.color = "white";
            pDataHora.style.color = "white";
        } else {
            tarefalista.style.background = "white";
            pTitulo.style.color = "black";
            pDescricao.style.color = "black";
            pDataHora.style.color = "black";
        }
    });

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");
    btnEditar.addEventListener("click", function(event) {
        const tarefaDiv = event.target.parentElement;
        tarefaDiv.innerHTML = ""; // Limpa a tarefa atual

        const editTitulo = document.createElement("input"); // Cria o elemento de input do titulo
        editTitulo.classList.add("titulo"); // adiciona a classe .titulo do arquivo style.css no input
        editTitulo.type = "text";
        editTitulo.value = pTitulo.textContent;

        const editDescricao = document.createElement("input");
        editDescricao.classList.add("descricao");
        editDescricao.type = "text";
        editDescricao.value = pDescricao.textContent;

        const editDataHora = document.createElement("input");
        editDataHora.type = "datetime-local";
        editDataHora.classList.add("dataHora");
        editDataHora.value = pDataHora.textContent;

        const btnSalvarEdicao = document.createElement("button");
        btnSalvarEdicao.textContent = "Salvar";
        btnSalvarEdicao.classList.add("salvar")
        btnSalvarEdicao.style.width = "100px";
        btnSalvarEdicao.addEventListener("click", function() {
            // Atualiza os valores da tarefa após a edição
            pTitulo.textContent = editTitulo.value;
            pDescricao.textContent = editDescricao.value;
            pDataHora.textContent = editDataHora.value;

            // Remove os campos de edição e volta à visualização original
            tarefaDiv.innerHTML = "";

            const div = document.createElement("div");
            div.append(cbx, pTitulo, pDescricao, pDataHora);

            tarefaDiv.append(div, btnRemover, btnEditar);
        });

        // Adiciona os campos de edição dentro da tarefa
        tarefaDiv.classList.add("item");
        tarefaDiv.append(editTitulo, editDescricao, editDataHora, btnSalvarEdicao);
    });

    const item = document.createElement("div");
    item.classList.add("item");
    item.append(div, btnRemover, btnEditar);

    const tarefasLista = document.querySelector("div#tarefa");
    tarefasLista.append(item);

    // reseta todos os valores dos inputs no final de tudo
    frm.titulo.value = "";
    frm.descricao.value = "";
    frm.dataHora.value = "";
}