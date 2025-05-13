const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());


const supabaseUrl = "https://hnlpeyhswykhumqljonz.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubHBleWhzd3lraHVtcWxqb256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NzczODgsImV4cCI6MjA2MjU1MzM4OH0.WmITf6rpMU6vzduDOeGfOItJqm55sK2eI109vzMOl38"
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/rankings', async (req, res) => {
  const { player_name, rating } = req.body;
  const { data, error } = await supabase
    .from('rankings')
    .insert([{ player_name, rating }]);

  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
});

app.get('/rankings', async (req, res) => {
  const { data, error } = await supabase
    .from('rankings')
    .select('*')
    .order('rating', { ascending: false }); 

  if (error) return res.status(500).json({ error });
  res.status(200).json(data);
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
