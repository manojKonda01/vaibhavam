const axios = require('axios');

async function testAPIs() {
  const baseURL = 'http://localhost:5001/api';

  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Test login
    console.log('Testing login...');
    const loginResponse = await axios.post(`${baseURL}/auth/login`, {
      email: 'admin@vaibhavam.com',
      password: 'admin123'
    });
    console.log('✅ Login successful:', loginResponse.data.user);

    // Test planners endpoint
    console.log('Testing planners endpoint...');
    const plannersResponse = await axios.get(`${baseURL}/planners`);
    console.log('✅ Planners count:', plannersResponse.data.planners.length);

    // Test products endpoint
    console.log('Testing products endpoint...');
    const productsResponse = await axios.get(`${baseURL}/products`);
    console.log('✅ Products count:', productsResponse.data.products.length);

    console.log('🎉 All API tests passed!');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

testAPIs();