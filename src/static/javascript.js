const { ipcRenderer } = require("electron");

function pressButton(){
    let usuario = window.document.getElementById("userId");
    let local = window.document.getElementById('localId');

    if(usuario.value.length >=2){
        let nomeUsuario = usuario.value.trim();
        let localEmpresa = local.value;
        let item = ipcRenderer.send("eventoButton", {nomeUsuario, localEmpresa });
    }else {
        if(usuario.classList.contains("border-primary")){
            usuario.classList.remove("border-primary");
        }
        usuario.classList.add("border-danger");
    }
};

function buttonEncerrar(){
    ipcRenderer.send("buttonEncerrar", "encerrar");
}