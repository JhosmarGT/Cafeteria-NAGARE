//====================================
// LOGIN NAGARE
//====================================

const contenedor = document.querySelector(".nagare-contenedor");

const btnRegistro = document.getElementById("btnRegistro");
const btnLogin = document.getElementById("btnLogin");

//=============================
// ABRIR REGISTRO
//=============================

btnRegistro.addEventListener("click",function(){

    contenedor.classList.add("activo");

});

//=============================
// VOLVER A LOGIN
//=============================

btnLogin.addEventListener("click",function(){

    contenedor.classList.remove("activo");

});

//=============================
// MOSTRAR PASSWORD LOGIN
//=============================

function mostrarLogin(){

    let password = document.getElementById("loginPassword");

    if(password.type=="password"){

        password.type="text";

    }else{

        password.type="password";

    }

}

//=============================
// MOSTRAR PASSWORD REGISTRO
//=============================

function mostrarRegistro(){

    let password = document.getElementById("registerPassword");

    if(password.type=="password"){

        password.type="text";

    }else{

        password.type="password";

    }

}


//====================================
// INICIO DE SESIÓN
//====================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const usuario = document.getElementById("usuario").value;

    const password = document.getElementById("loginPassword").value;

    //=========================
    // CLIENTE
    //=========================

    if(usuario === "usuario" && password === "1234"){

        alert("Bienvenido a Nagare");

        window.location.href = "Inicio.html";

    }

    //=========================
    // ADMINISTRADOR
    //=========================

    else if(usuario === "admin" && password === "admin123"){

        alert("Bienvenido Administrador");

        window.location.href = "Administrador.html";

    }

    //=========================
    // ERROR
    //=========================

    else{

        alert("Usuario o contraseña incorrectos");

    }

});
