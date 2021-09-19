const app = require('./lib/app')
const PORT = process.env.PORT || 3000; 

app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Origin",
      "http://<YOUR-APP-NAME>.herokuapp.com"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  
app.listen(PORT, () => {
    console.log(`Started on ${PORT}`);
});
