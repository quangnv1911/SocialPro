// Root Jenkinsfile for the project

pipeline {
    agent any
    environment {
        DOCKER_BUILDKIT='1'
        TAG = "${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
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
                        env.STAGING_DEPLOY_DIR = props['STAGING_DEPLOY_DIR']
                        env.PROD_DEPLOY_DIR = props['PROD_DEPLOY_DIR']
                    }
                }
            }
        }

        stage ('Check branch') {
            steps {
                echo "${env.GIT_BRANCH}"
            }
        }
        stage('Trigger Projects') {
            parallel {
                stage('Trigger Social Pro Backend Project') {
                    steps {
                        build job: 'social-pro-be', parameters: [string(name: 'BRANCH_NAME', value: env.GIT_BRANCH), string(name: 'TAG', value: TAG)]
                    }
                }
                stage('Trigger Social Pro Admin Project') {
                    steps {
                        build job: 'social-pro-admin', parameters: [string(name: 'BRANCH_NAME', value: env.GIT_BRANCH), string(name: 'TAG', value: TAG)]
                    }
                }
                stage('Trigger Social Pro Client Project') {
                    steps {
                        build job: 'social-pro-client', parameters: [string(name: 'BRANCH_NAME', value: env.GIT_BRANCH), string(name: 'TAG', value: TAG)]
                    }
                }
                stage('Trigger Email proxy Project') {
                    steps {
                        build job: 'email-proxy', parameters: [string(name: 'BRANCH_NAME', value: env.GIT_BRANCH), string(name: 'TAG', value: TAG)]
                    }
                }
            }
        }

        stage('Deploy to staging'){
            when {
                expression { 
                    env.GIT_BRANCH == 'dev'
                }
            }
            steps {
                script {
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
                    env.GIT_BRANCH == 'main'
                }
            }
            steps {
                script {
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
            script {
                withCredentials([
                string(credentialsId: 'SOCIAL_PRO_TELEGRAM_BOT_TOKEN', variable: 'SOCIAL_PRO_TELEGRAM_BOT_TOKEN'),
                string(credentialsId: 'JENKINS_TELEGRAM_CHAT', variable: 'JENKINS_TELEGRAM_CHAT')
                ]) {
                    def buildUrl = "${env.JENKINS_URL}job/${env.JOB_NAME}/job/${env.BUILD_NUMBER}/"
                    def message = "✅ *Build Successful!* 🎉\n" +
                                "Project: `${env.JOB_NAME}`\n" +
                                "Branch: `${env.GIT_BRANCH}`\n" +
                                "Tag: `${env.TAG}`\n" +
                                "🔗 [View Build](${buildUrl})"

                    sh """
                        curl -s -X POST "https://api.telegram.org/bot${SOCIAL_PRO_TELEGRAM_BOT_TOKEN}/sendMessage" \
                        -d chat_id="${JENKINS_TELEGRAM_CHAT}" \
                        -d parse_mode="Markdown" \
                        -d text="${message}"
                    """
                }
            }
        }
    
        failure {
            script {
                withCredentials([
                string(credentialsId: 'SOCIAL_PRO_TELEGRAM_BOT_TOKEN', variable: 'SOCIAL_PRO_TELEGRAM_BOT_TOKEN'),
                string(credentialsId: 'JENKINS_TELEGRAM_CHAT', variable: 'JENKINS_TELEGRAM_CHAT')
                ]) {
                    def buildUrl = "${env.JENKINS_URL}job/${env.JOB_NAME}/job/${env.BUILD_NUMBER}/"
                    def message = "❌ *Build Failed!* 😞\n" +
                                "Project: ${env.JOB_NAME}\n" +
                                "Branch: ${env.GIT_BRANCH}\n" +
                                "Tag: ${env.TAG}\n" +
                                "🔗 [View Build](${buildUrl})"

                    sh """
                        curl -s -X POST "https://api.telegram.org/bot${SOCIAL_PRO_TELEGRAM_BOT_TOKEN}/sendMessage" \
                        -d chat_id="${JENKINS_TELEGRAM_CHAT}" \
                        -d parse_mode="Markdown" \
                        -d text="${message}"
                    """
                }
            }
        }
    }

}