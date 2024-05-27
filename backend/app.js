const express = require('express');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projects');
const chatRoute = require('./routes/chat');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', projectRoutes);
app.use('/api', chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
