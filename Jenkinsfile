pipeline {
    agent any

    environment {
        REGISTRY = credentials('DOCKER_REGISTRY')
        DOCKER_USER = credentials('DOCKER_USER')
        DOCKER_PASS = credentials('DOCKER_PASS')
        DEPLOY_PATH_STAGING = credentials('DEPLOY_PATH_STAGING')
        DEPLOY_PATH_PRODUCTION = credentials('DEPLOY_PATH_PRODUCTION')
    }

    stages {

        stage('Clone Repository') {
            steps {
                script {
                    echo "📂 Cloning repository on branch: ${env.BRANCH_NAME}"
                }
                git branch: env.BRANCH_NAME, url: 'https://github.com/quangnv1911/SocialPro.git'
            }
        }

        stage('Determine Environment') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        env.DEPLOY_PATH = "${env.DEPLOY_PATH_STAGING}"
                        env.DOCKER_COMPOSE_FILE = "docker-compose.staging.yml"
                    } else if (env.BRANCH_NAME == 'main') {
                        env.DEPLOY_PATH = "${env.DEPLOY_PATH_PRODUCTION}"
                        env.DOCKER_COMPOSE_FILE = "docker-compose.production.yml"
                    } 
                }
            }
        }

        stage('Login to Docker Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        docker login -u $DOCKER_USER -p $DOCKER_PASS $REGISTRY
                    """
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    def services = ["social-pro-client", "social-pro-admin", "social-pro-be", "email-proxy"]

                    services.each { service ->
                        sh """
                            docker build -t $REGISTRY/$service:${env.BRANCH_NAME} -f $service/Dockerfile $service
                            docker push $REGISTRY/$service:${env.BRANCH_NAME}
                        """
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    if (env.DEPLOY_PATH) {
                        sh "docker-compose -f $DOCKER_COMPOSE_FILE up -d --remove-orphans" 
                    }
                }
            }
        }
    }

    post {
        always {
            echo "CI/CD Pipeline hoàn tất cho branch: ${env.BRANCH_NAME}"
        }
    }
}
