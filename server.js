const express = require("express");

const app = express();

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
