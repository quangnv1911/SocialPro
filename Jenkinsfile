pipeline {
    agent any

    environment {
        SOCIAL_PRO_CLIENT = "quangnv1911/social-pro-client"
        SOCIAL_PRO_ADMIN = "your-dockerhub-user/spring-app:dev"
        SOCIAL_PRO_BE = "your-dockerhub-user/social-pro-backend:dev"
        REACT_IMAGE = "quangnv1911/social-pro-client"
        SPRING_IMAGE = "your-dockerhub-user/spring-app:dev"
        SONARQUBE_SERVER = "SonarQube" // Name of your SonarQube server configured in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'dev', url: 'https://github.com/your-repo.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') { // SonarQube environment defined in Jenkins
                        sh 'mvn clean verify sonar:sonar'
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'mvn test' // Replace with appropriate test command if not using Maven
                }
            }
        }

        stage('Build Docker Images') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    sh 'docker compose build'
                }
            }
        }

        stage('Push Docker Images') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    withDockerRegistry([credentialsId: 'dockerhub-credentials', url: '']) {
                        sh 'docker push $REACT_IMAGE'
                        sh 'docker push $SPRING_IMAGE'
                        sh 'docker push $SOCIAL_PRO_BE'
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                script {
                    sh '''
                    docker-compose down
                    docker-compose up -d
                    '''
                }
            }
        }
    }
}
