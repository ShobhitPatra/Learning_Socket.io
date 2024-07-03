import express from "express";

const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello ");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
