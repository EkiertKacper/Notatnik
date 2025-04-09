const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt')
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
    db.query('SELECT id, password FROM users WHERE username = ?;', [username], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            const hashedPasswordFromDB = results[0].password;
            const userId = results[0].id;
            user = results[0].id

            try {
                const match = await bcrypt.compare(password, hashedPasswordFromDB);

                if (match) {
                    return res.status(200).json({ message: 'Zalogowano', userId: userId });
                } else {
                    return res.status(401).json({ message: 'Zła nazwa użytkownika lub hasło' });
                }
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        } else {
            return res.status(401).json({ message: 'Zła nazwa użytkownika lub hasło' });
        }
    })
})

const hashPassword = async(password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
app.post('/usersRegister', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password)
    db.query("INSERT INTO `users`(`username`, `password`) VALUES ( ?, ?)", [username, hashedPassword], (err,results) => {
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

app.put('/noteEdit/:id', (req, res) => {
    const { title, content } = req.body;
    const userId = req.params.id
    db.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, userId], (err, result) => {
        if (err) {
            console.error('Błąd aktualizacji notatki:', err);
            return res.status(500).json({error: err.message});
          }      
          if (result.affectedRows === 0) {
            return res.status(404).send('Notatka nie znaleziona');
          }     
          return res.status(200).json({ message: 'Pomyślnie zedytowano'});
    })
})



app.listen(3000, () => console.log('Serwer działa na porcie 3000'));