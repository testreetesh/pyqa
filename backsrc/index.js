const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = './data.json';
const DATA_FILE2 = './mock.json';
const ADMIN_PASS = "Admin123"; // Change this for production!

// Example for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontsrc/views'));
app.use(express.static('./frontsrc/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Change the default structure to include 'dailyContent'
const DEFAULT_DATA = { 
    dailyContent: {}, 
    previousPapers: [] // Good to keep this here too!
};

// 2. Updated Helper Functions
const getData = () => {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw || JSON.stringify(DEFAULT_DATA));
    } catch (e) {
        return DEFAULT_DATA;
    }
};

const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// 3. Initialize file with the NEW structure if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    saveData(DEFAULT_DATA);
}

// --- ROUTES ---

// 1. User Page
app.get('/', (req, res) => {
    const data = getData();
    const today = new Date().toISOString().split('T')[0]; // e.g., "2024-05-22"
    
    // Fallback if today's date hasn't been created yet
    const content = data.dailyContent[today] || {
        concept: { title: "Welcome!", description: "No content for today yet." },
        questions: []
    };

    res.render('user', { content, data }); 
});

// 2. Admin Page (Protected)
app.get('/admin', (req, res) => {
    if (req.query.pass !== ADMIN_PASS) return res.status(403).send("<h1>403 Forbidden</h1><p>Invalid Admin Password.</p>");
    res.render('admin', { data: getData(), pass: ADMIN_PASS });
});

// 3. Add Question
app.post('/admin/add', (req, res) => {
    if (req.query.pass !== ADMIN_PASS) return res.status(403).send("Unauthorized");
    const data = getData();
    data.questions.push({
        id: Date.now(),
        q: req.body.question,
        options: [req.body.opt0, req.body.opt1, req.body.opt2, req.body.opt3],
        correct: parseInt(req.body.correct)
    });
    saveData(data);
    res.redirect(`/admin?pass=${ADMIN_PASS}`);
});

// 4. Delete Question
app.post('/admin/delete/:id', (req, res) => {
    if (req.query.pass !== ADMIN_PASS) return res.status(403).send("Unauthorized");
    const data = getData();
    data.questions = data.questions.filter(q => q.id != req.params.id);
    saveData(data);
    res.redirect(`/admin?pass=${ADMIN_PASS}`);
});

app.listen(PORT, () => console.log(`Portal running on http://localhost:${PORT}`));