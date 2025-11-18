/**
 * Simple test file to verify the basic functionality
 * Run with: node test.js
 */

const { handleRequest } = require('./index');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testOperations() {
  log('\n🧪 Starting GitHub Monica Skill Tests\n', 'blue');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: Missing token
  try {
    log('Test 1: Handling missing token...', 'yellow');
    await handleRequest('listRepos', {}, null);
    log('✗ FAILED: Should have thrown error for missing token\n', 'red');
    failed++;
  } catch (error) {
    if (error.message.includes('token')) {
      log('✓ PASSED: Correctly rejected missing token\n', 'green');
      passed++;
    } else {
      log(`✗ FAILED: Wrong error message: ${error.message}\n`, 'red');
      failed++;
    }
  }
  
  // Test 2: Invalid operation
  try {
    log('Test 2: Handling invalid operation...', 'yellow');
    const result = await handleRequest('invalidOperation', {}, 'fake-token');
    if (!result.success && result.error.includes('not found')) {
      log('✓ PASSED: Correctly handled invalid operation\n', 'green');
      passed++;
    } else {
      log('✗ FAILED: Should have returned error for invalid operation\n', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAILED: Unexpected error: ${error.message}\n`, 'red');
    failed++;
  }
  
  // Test 3: Missing operation name
  try {
    log('Test 3: Handling missing operation name...', 'yellow');
    await handleRequest('', {}, 'fake-token');
    log('✗ FAILED: Should have thrown error for missing operation\n', 'red');
    failed++;
  } catch (error) {
    if (error.message.includes('required')) {
      log('✓ PASSED: Correctly rejected missing operation\n', 'green');
      passed++;
    } else {
      log(`✗ FAILED: Wrong error message: ${error.message}\n`, 'red');
      failed++;
    }
  }
  
  // Test 4: Load all operation modules
  try {
    log('Test 4: Loading all operation modules...', 'yellow');
    const operations = require('./handlers/operations');
    const operationCount = Object.keys(operations).length;
    
    if (operationCount > 0) {
      log(`✓ PASSED: Loaded ${operationCount} operations successfully\n`, 'green');
      passed++;
    } else {
      log('✗ FAILED: No operations loaded\n', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAILED: Could not load operations: ${error.message}\n`, 'red');
    failed++;
  }
  
  // Test 5: Verify all lib modules exist
  try {
    log('Test 5: Verifying all lib modules...', 'yellow');
    const modules = [
      'repositories',
      'files',
      'issues',
      'pullRequests',
      'commits',
      'workflows',
      'gists',
      'search'
    ];
    
    let allModulesExist = true;
    for (const module of modules) {
      try {
        require(`./lib/${module}`);
      } catch (error) {
        log(`  ✗ Module ${module} not found`, 'red');
        allModulesExist = false;
      }
    }
    
    if (allModulesExist) {
      log('✓ PASSED: All lib modules exist\n', 'green');
      passed++;
    } else {
      log('✗ FAILED: Some lib modules are missing\n', 'red');
      failed++;
    }
  } catch (error) {
    log(`✗ FAILED: Error checking modules: ${error.message}\n`, 'red');
    failed++;
  }
  
  // Summary
  log('═══════════════════════════════════════', 'blue');
  log(`📊 Test Results:`, 'blue');
  log(`   ✓ Passed: ${passed}`, 'green');
  log(`   ✗ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`   Total:  ${passed + failed}`, 'blue');
  log('═══════════════════════════════════════\n', 'blue');
  
  if (failed === 0) {
    log('🎉 All tests passed!\n', 'green');
    process.exit(0);
  } else {
    log('❌ Some tests failed. Please review.\n', 'red');
    process.exit(1);
  }
}

// Run tests
testOperations().catch(error => {
  log(`\n💥 Unexpected error during testing: ${error.message}\n`, 'red');
  console.error(error);
  process.exit(1);
});
