const express = require('express');
const app = express();

// Almacenamiento de contactos en una variable global
let contacts = [];

// Endpoint para obtener todos los contactos
app.get('/contacts', (req, res) => {
res.json(contacts);
});

// Endpoint para obtener un contacto específico
app.get('/contacts/:id', (req, res) => {
const id = req.params.id;
const contact = contacts.find(c => c.id === id);
if (contact) {
    res.json(contact);
} else {
    res.status(404).send('Contact not found');
}
});

// Endpoint para crear un nuevo contacto
app.post('/contacts', (req, res) => {
const newContact = req.body;
contacts.push(newContact);
res.json(newContact);
});

// Endpoint para actualizar un contacto existente
app.put('/contacts/:id', (req, res) => {
const id = req.params.id;
const updatedContact = req.body;
const index = contacts.findIndex(c => c.id === id);
if (index !== -1) {
    contacts[index] = updatedContact;
    res.json(updatedContact);
} else {
    res.status(404).send('Contact not found');
}
});

// Endpoint para borrar un contacto específico
app.delete('/contacts/:id', (req, res) => {
const id = req.params.id;
const index = contacts.findIndex(c => c.id === id);
if (index !== -1) {
    contacts.splice(index, 1);
    res.sendStatus(204);
} else {
    res.status(404).send('Contact not found');
}
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});