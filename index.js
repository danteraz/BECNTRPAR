const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes/routes');
const authRoutes = require('./routes/auth');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
