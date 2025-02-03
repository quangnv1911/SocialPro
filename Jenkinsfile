pipeline {
    agent any

    environment {
        REGISTRY = credentials('DOCKER_REGISTRY')
        DOCKER_USER = credentials('DOCKER_USER')
        DOCKER_PASS = credentials('DOCKER_PASS')
        DEPLOY_PATH_STAGING = credentials('DEPLOY_PATH_STAGING')
        DEPLOY_PATH_PRODUCTION = credentials('DEPLOY_PATH_PRODUCTION')
    }

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch để build')
    }

    stages {
        stage('Prepare') {
            steps {
                script {
                    // Xác định branch từ webhook hoặc Jenkins parameter
                    env.ACTUAL_BRANCH = env.BRANCH_NAME ?: params.BRANCH_NAME ?: DEFAULT_BRANCH
                    echo "🔍 Branch nhận từ Webhook/Parameter: ${env.ACTUAL_BRANCH}"
                }
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    echo "📂 Cloning repository on branch: ${env.ACTUAL_BRANCH}"
                }
                git branch: env.ACTUAL_BRANCH, url: 'https://github.com/quangnv1911/SocialPro.git'
            }
        }

        stage('Determine Environment') {
            steps {
                script {
                    if (env.ACTUAL_BRANCH == 'dev') {
                        env.DEPLOY_PATH = "${env.DEPLOY_PATH_STAGING}"
                        env.DOCKER_COMPOSE_FILE = "docker-compose.staging.yml"
                    } else if (env.ACTUAL_BRANCH == 'main') {
                        env.DEPLOY_PATH = "${env.DEPLOY_PATH_PRODUCTION}"
                        env.DOCKER_COMPOSE_FILE = "docker-compose.production.yml"
                    } else {
                        echo "⚠️ Không xác định được môi trường. Sử dụng branch khác: ${env.ACTUAL_BRANCH}"
                    }
                    echo "🚀 Deploy Path: ${env.DEPLOY_PATH}"
                    echo "🛠 Docker Compose File: ${env.DOCKER_COMPOSE_FILE}"
                }
            }
        }

        stage('Login to Docker Registry') {
            steps {
                sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin $REGISTRY"
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
