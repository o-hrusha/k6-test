pipeline {
    agent any

    stages {
        stage('Run k6 Test') {
            steps {
                sh 'k6 run tests/first-script.js'
            }
        }
    }
}