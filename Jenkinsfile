pipeline {
  agent any
  stages {
    stage('Install and Test') {
      steps {
        bat 'npm i'
        bat 'npx playwright install chromium'
        bat 'npx playwright test'
      }
    }
  }
}
