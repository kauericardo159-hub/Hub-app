import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Substitua pelos dados do seu Firebase Console
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "zylo-app.firebaseapp.com",
    projectId: "zylo-app",
    storageBucket: "zylo-app.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const btnGoogle = document.getElementById('btn-google');
const statusDiv = document.getElementById('status');

// LÓGICA DE SALVAMENTO AUTOMÁTICO
// O Firebase verifica se o 'token' de login está no navegador
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Utilizador detetado:", user.displayName);
        window.location.href = "index.html"; 
    }
});

// AÇÃO DE LOGIN/REGISTO
btnGoogle.addEventListener('click', async () => {
    statusDiv.classList.remove('hidden');
    try {
        await signInWithPopup(auth, provider);
        // Sucesso: o onAuthStateChanged acima cuidará do redirecionamento
    } catch (error) {
        console.error("Erro na autenticação:", error);
        alert("Erro ao conectar com o Google.");
        statusDiv.classList.add('hidden');
    }
});
