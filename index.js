import Express  from "express";

const app = Express();
const PORT = 4000 || process.env.PORT;
app.listen(4000, () => {
  console.log(`App runnig http://localhost:${PORT}`);
});
