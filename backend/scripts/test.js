const axios = require('axios');

axios.post('http://localhost:5000/api/auth/register', {
  name: 'Avinash',
  email: 'test@example.com',
  password: 'password123',
  role: 'tourist'
}).then(res => {
  console.log('SUCCESS:', res.data);
}).catch(err => {
  console.log('ERROR:', err.response ? err.response.data : err.message);
});
