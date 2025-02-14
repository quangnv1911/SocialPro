// Root Jenkinsfile for the project

pipeline {
    agent any
    environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"
    }
    stages {
        stage('Load .env file') {
            steps {
                withCredentials([file(credentialsId: 'env-jenkins', variable: 'ENV_FILE')]) {
                    script {
                        def props = readProperties file: env.ENV_FILE
                        env.STAGING_SERVER_IP = props['STAGING_SERVER_IP']
                        env.STAGING_SSH_USER = props['STAGING_SSH_USER']
                        env.PROD_SERVER_IP = props['PROD_SERVER_IP']
                        env.PROD_SSH_USER = props['PROD_SSH_USER']
                        env.PROD_SERVER_IP = props['STAGING_DEPLOY_DIR']
                        env.PROD_SSH_USER = props['PROD_DEPLOY_DIR']
                    }
                }
            }
        }

        stage('Trigger Social Pro Backend Project') {
            steps {
                build job: 'social-pro-be', parameters: [string(name: 'BRANCH_NAME', value: BRANCH_NAME)]
            }
        }
        stage('Trigger Social Pro Admin Project') {
            steps {
                build job: 'social-pro-admin', parameters: [string(name: 'BRANCH_NAME', value: BRANCH_NAME)]
            }
        }
        stage('Trigger Social Pro Client Project') {
            steps {
                build job: 'social-pro-client', parameters: [string(name: 'BRANCH_NAME', value: BRANCH_NAME)]
            }
        }
        stage('Trigger Email proxy Project') {
            steps {
                build job: 'email-proxy', parameters: [string(name: 'BRANCH_NAME', value: BRANCH_NAME)]
            }
        }

        stage('Deploy to staging'){
            when {
                expression { 
                    BRANCH_NAME == 'dev'
                }
            }
            steps {
                scripts {
                    sshagent(credentials : ['staging-social-pro-ssh']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${STAGING_SSH_USER}@${STAGING_SERVER_IP} 'cd ${STAGING_DEPLOY_DIR} && ./deploy.sh'
                        """
                    }
                }
            }
        }

        stage('Deploy to production'){
            when {
                expression { 
                    BRANCH_NAME == 'main'
                }
            }
            steps {
                scripts {
                    sshagent(credentials : ['prod-social-pro-ssh']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${PROD_SSH_USER}@${PROD_SERVER_IP} 'cd ${PROD_DEPLOY_DIR} && ./deploy.sh'
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Build successful!"
        }
        failure {
            echo "Build failed!"
        }
    }
}