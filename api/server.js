const express = require('express');
const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up' })
});


let heroes = [
    {
        id: 1,
        heroName: 'Spidey'
    }
];
let nextHero = 2;

server.post("/api/heroes", (req, res) => {
    if (req.body && req.body.heroName && typeof req.body.heroName === "string") {
        heroes.push({ id: nextHero, heroName: req.body.heroName });
        nextHero++;
        res.status(201).json([nextHero-1]);
    } else {
        res.status(400).json({ error: "wrong hero" });
    }
});

 server.delete("/api/heroes/:id", (req, res) => {
    let heroExists = false;
    let heroIndex = undefined;
    heroes.forEach((hero, index) => {
        if (hero.id === parseInt(req.params.id)) {
            heroIndex = index;
            heroExists = true;
        }
    });

     if (heroExists) {
        heroes.splice(heroIndex, 1);
        res.status(200).json(1);
    } else {
        res.status(404).json({ error: "hero is not found" });
    }
}); 

module.exports = server;