const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

app.get("*", (req, res) => {
  return handle(req, res);
});

app.post("*", (req, res) => {
  return handle(req, res);
});
