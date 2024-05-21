import e from "express";
import path from 'path';
import { fileURLToPath } from "url";


const app = e();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000")
});

app.use('/assets', e.static(path.join(__dirname, 'assets')));

app.get("/", (req, res) => {
    res.send("Ruta principal");
});


// Arreglo usuarios

let usuarios = [
    "Juan",
    "Jocelyn",
    "Astrid",
    "Maria",
    "Ignacia",
    "Javier",
    "Brian"
];

app.get('/abracadabra/usuarios', (req, res) => {
    res.json({ usuarios: usuarios });
})


//Middleware Validacion usuario

const validacionUsuario = (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'who.jpeg'));
    }
};

//Ruta Get

app.get('/abracadabra/juego/:usuario', validacionUsuario, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


// Juego:

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero = parseInt(req.params.n);
    // Numero aleatorio
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;
    console.log("Número aleatorio generado:", numeroAleatorio);
    if (numero >= 1 && numero <= 4 && numero === numeroAleatorio) {
        res.sendFile(path.join(__dirname, 'assets', 'conejito.jpg'));
    } else {
        res.sendFile(path.join(__dirname, 'assets', 'voldemort.jpg'));
    }
});

// Ruta no definida

app.use((req, res, next) => {
    res.status(404).send("Esta página no existe...");
});


//URLs para probar el juego

"http://localhost:3000/abracadabra/usuarios"

"http://localhost:3000/abracadabra/juego/usuarioNoRegistrado"

"http://localhost:3000/abracadabra/juego/Ignacia"

"http://localhost:3000/cualquierCosa"