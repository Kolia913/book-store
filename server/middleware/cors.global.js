export default defineEventHandler((event) => {
  // Allow all origins
  event.res.setHeader('Access-Control-Allow-Origin', '*');
  event.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  event.res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Handle preflight requests
  if (event.req.method === 'OPTIONS') {
    event.res.statusCode = 204;
    event.res.end();
    return;
  }
});
