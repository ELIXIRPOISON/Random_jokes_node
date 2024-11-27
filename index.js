const express = require('express');
const axios = require('axios'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Random Jokes API! Use /api/jokes/random to get a random joke.');
});

const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "I told my computer I needed a break, and now it won’t stop sending me KitKats.",
    "Why did the math book look sad? Because it had too many problems."
];

// Random joke endpoint
app.get('/api/jokes/random', (req, res) => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.json({ joke: randomJoke });
});


app.get('/api/jokes/random/thirdparty', async (req, res) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch a joke from the third-party API' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
