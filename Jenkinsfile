// Root Jenkinsfile for the project

pipeline {
    agent any
    environment {
        DOCKER_BUILDKIT = '1'
        TAG = "${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0, 7)}"
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
                        env.SOCIAL_PRO_TELEGRAM_BOT_TOKEN = props['SOCIAL_PRO_TELEGRAM_BOT_TOKEN']
                        env.SOCIAL_PRO_TELEGRAM_CHAT = props['SOCIAL_PRO_TELEGRAM_CHAT']
                    }
                }
            }
        }

        stage('Check branch') {
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

        stage('Deploy to staging') {
            when {
                expression {
                    env.GIT_BRANCH == 'dev'
                }
            }
            steps {
                // script {
                //     sshagent(credentials : ['staging-social-pro-ssh']) {
                //         sh """
                //             ssh -o StrictHostKeyChecking=no ${STAGING_SSH_USER}@${STAGING_SERVER_IP} 'cd ${STAGING_DEPLOY_DIR} && ./deploy.sh'
                //         """
                //     }
                // }
                script {
                    // Make the POST request using curl
                    sh '''
                        curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_98g22o5YUFVHlKOzj9vKPTyN2SDG/tKybBxqhQs
                    '''
                }
            }
        }

        stage('Deploy to production') {
            when {
                expression {
                    env.GIT_BRANCH == 'main'
                }
            }
            steps {
                script {
                    sshagent(credentials : ['social-pro-ssh']) {
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
                def buildUrl = "${env.JENKINS_URL}job/${env.JOB_NAME}/job/${env.BUILD_NUMBER}/"
                def message = "✅ *Build Successful!* 🎉\n" +
                            "Project: `${env.JOB_NAME}`\n" +
                            "Branch: `${env.GIT_BRANCH}`\n" +
                            "Tag: `${env.TAG}`\n" +
                            "🔗 [View Build](${buildUrl})"

                sh '''
                    curl -s -X POST "https://api.telegram.org/bot${SOCIAL_PRO_TELEGRAM_BOT_TOKEN}/sendMessage" \
                    -d chat_id="${SOCIAL_PRO_TELEGRAM_CHAT}" \
                    -d parse_mode="Markdown" \
                    -d text="${message}"
                '''
            }
        }

        failure {
            script {
                def buildUrl = "${env.JENKINS_URL}job/${env.JOB_NAME}/job/${env.BUILD_NUMBER}/"
                def message = "❌ *Build Failed!* 😞\n" +
                            "Project: ${env.JOB_NAME}\n" +
                            "Branch: ${env.GIT_BRANCH}\n" +
                            "Tag: ${env.TAG}\n" +
                            "🔗 [View Build](${buildUrl})"

                sh '''
                    curl -s -X POST "https://api.telegram.org/bot${SOCIAL_PRO_TELEGRAM_BOT_TOKEN}/sendMessage" \
                    -d chat_id="${SOCIAL_PRO_TELEGRAM_CHAT}" \
                    -d parse_mode="Markdown" \
                    -d text="${message}"
                '''
            }
        }
    }
}
