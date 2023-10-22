import express from "express";

const app = express();

app.get("/api", (req, res) => {
  const backy = {
    title: "Franks Backend",
    why: "Just in case a Smart Contract is not enought to build it. It doesn't hurt to have a Backend.",
    inUse: false,
  };

  res.json(backy);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
