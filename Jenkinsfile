pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'git checkout master'
            }
        }
        stage('Unit tests') {
            steps {
                parallel(
                    "backend": {
                        echo "testing working..."
                    },
                    "frontend": {
                        withEnv(['CHROME_BIN=/usr/lib/chromium-browser/chromium-browser']) {
                            dir("ui") {
                                sh "npm install"
                                sh "npm test"
                            }
                        }
                    }
                )
            }
        }
        stage('Docker build') {
            steps {
                parallel(
                    "backend": {
                        dir('api') {
                            dockerBuild('rest_api')
                        }
                    },
                    "ui": {
                        dir('frontend') {
                            sh "npm install"
                            sh "npm run build"
                            sh "docker build -t ashish/ui:${env.BUILD_TAG} ."
                        }
                    },
                )
            }
        }
        stage("Docker push") {
            when { expression { env.BRANCH_NAME == 'master' } }
            steps {
                dockerPush('rest_api')
                dockerPush('ui')
            }
        }
        stage('Deploy to Server') {
            when { expression { env.BRANCH_NAME == 'master' } }
            steps {
                sshagent(credentials: ['jenkins']) {
                    sh "chmod +x -R ${env.WORKSPACE}"
                    sh './deploy.sh'
                }
            }
        }
    }
    post { 
        always { 
            cleanWs()
        }
    }
}

def dockerBuild(service) {
    sh "docker build -t ashish/${service}:${env.BUILD_TAG} ."
}

def dockerPush(service) {
    sh "docker tag ashish/${service}:${env.BUILD_TAG} ashish/${service}:latest"
    sh "docker push ashish/${service}:${env.BUILD_TAG}"
    sh "docker push ashish/${service}:latest"
}