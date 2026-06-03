const http = require("http");

const postData = JSON.stringify({ email: "hamza@example.com", password: "password123" });

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  console.log('Login Status:', res.statusCode);
  console.log('Login Headers:', res.headers);
  
  const cookies = res.headers['set-cookie'];
  if (!cookies) {
    console.log("No cookies received!");
    return;
  }
  
  console.log('Received cookies:', cookies);
  
  const req2 = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/profile',
    method: 'GET',
    headers: {
      'Cookie': cookies[0].split(';')[0]
    }
  }, (res2) => {
    console.log('Profile Status:', res2.statusCode);
    let body = '';
    res2.on('data', d => body += d);
    res2.on('end', () => console.log('Profile Body:', body));
  });
  
  req2.on('error', e => console.error(e));
  req2.end();
});

req.on('error', e => console.error(e));
req.write(postData);
req.end();
