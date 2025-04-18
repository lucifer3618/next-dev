// Test script for API endpoints
const axios = require('axios');

// Base URL for API requests
const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';

// Test the AI Chat endpoint
async function testAiChat() {
  console.log('\n--- Testing AI Chat Endpoint ---');
  try {
    const response = await axios.post(`${baseUrl}/api/ai-chat`, {
      prompt: 'Hello, how are you?'
    });
    
    console.log('Status:', response.status);
    console.log('Response has result property:', response.data.hasOwnProperty('result'));
    console.log('Test passed:', response.status === 200 && response.data.hasOwnProperty('result'));
  } catch (error) {
    console.error('Error testing AI Chat endpoint:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response:', error.response.data);
    }
  }
}

// Test the AI Code Generation endpoint
async function testAiCodeGeneration() {
  console.log('\n--- Testing AI Code Generation Endpoint ---');
  try {
    const response = await axios.post(`${baseUrl}/api/gen-ai-code`, {
      prompt: 'Create a simple React button component'
    });
    
    console.log('Status:', response.status);
    console.log('Response has files property:', response.data.hasOwnProperty('files'));
    console.log('Test passed:', response.status === 200 && response.data.hasOwnProperty('files'));
  } catch (error) {
    console.error('Error testing AI Code Generation endpoint:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Response:', error.response.data);
    }
  }
}

// Run all tests
async function runTests() {
  console.log('Starting API tests...');
  console.log(`Base URL: ${baseUrl}`);
  
  await testAiChat();
  await testAiCodeGeneration();
  
  console.log('\nAPI tests completed.');
}

// Execute tests
runTests();
