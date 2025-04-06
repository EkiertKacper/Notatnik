const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json()); // Obsługa JSON
app.use(cors()); // Zezwolenie na połączenie z Vue
let user = undefined;


// Połączenie z MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notatnik',
});

db.connect(err => {
    user = undefined;
    if (err) {
        console.error('Błąd połączenia z MySQL:', err);
        return;
    }
    console.log('Połączono z MySQL');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/notes', (req, res) => {
    db.query(`SELECT * FROM notes WHERE user_id = ?`, [user], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/usersLogIn', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT id FROM users WHERE username = ? AND password = ?;', [username, password], (err,results) => {
        if (err) return res.status(500).json({ error: err.message });
        if(JSON.stringify(results) !== "[]"){
            user = results[0].id
            return res.status(200).json({ message: 'Zalogowano', userId: results[0].id });
        } else{
            return res.status(401).json({message: 'Zła nazwa użytkownika lub hasło'})
        }
    })
})
app.post('/usersRegister', (req, res) => {
    const { username, password } = req.body;
    db.query("INSERT INTO `users`(`username`, `password`) VALUES ( ?, ?)", [username, password], (err,results) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: 'Pomyślnie zarejestrowano'});
    })
})

app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    db.query('INSERT INTO notes (user_id, title, content) VALUES(?,?,?);', [user, title, content], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);    
    })
})



app.listen(3000, () => console.log('Serwer działa na porcie 3000'));