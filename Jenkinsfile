// pipeline {
//     agent any

//     environment {
//         REGISTRY = credentials('DOCKER_REGISTRY')
//         DOCKER_USER = credentials('DOCKER_USER')
//         DOCKER_PASS = credentials('DOCKER_PASS')
//         DEPLOY_PATH_STAGING = credentials('DEPLOY_PATH_STAGING')
//         DEPLOY_PATH_PRODUCTION = credentials('DEPLOY_PATH_PRODUCTION')

//         // Telegram notify config
//         TELEGRAM_TOKEN = credentials('telegram-token')
//         TELEGRAM_CHAT_ID = credentials('telegram-chat-id') 

//         TEXT_PRE_BUILD = "Jenkins is building ${JOB_NAME}"
//         TEXT_SUCCESS_BUILD = "${JOB_NAME} is Success"
//         TEXT_FAILURE_BUILD = "${JOB_NAME} is Failure"
//         TEXT_ABORTED_BUILD = "${JOB_NAME} is Aborted"
//     }

//     stages {

//         stage('Clone Repository') {
//             steps {
//                 script {
//                     echo "📂 Cloning repository on branch: ${env.BRANCH_NAME}"
//                 }
//                 git branch: env.BRANCH_NAME, url: 'https://github.com/quangnv1911/SocialPro.git'
//             }
//         }

//         stage('Determine Environment') {
//             steps {
//                 script {
//                     if (env.BRANCH_NAME == 'dev') {
//                         env.DEPLOY_PATH = "${env.DEPLOY_PATH_STAGING}"
//                         env.DOCKER_COMPOSE_FILE = "docker-compose.staging.yml"
//                     } else if (env.BRANCH_NAME == 'main') {
//                         env.DEPLOY_PATH = "${env.DEPLOY_PATH_PRODUCTION}"
//                         env.DOCKER_COMPOSE_FILE = "docker-compose.production.yml"
//                     } 
//                 }
//             }
//         }

//         stage('Login to Docker Registry') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
//                     sh """
//                         docker login -u $DOCKER_USER -p $DOCKER_PASS $REGISTRY
//                     """
//                 }
//             }
//         }

//         stage("Pre-Build"){
//             steps{
//                 bat ''' curl -s -X POST https://api.telegram.org/bot"%TELEGRAM_TOKEN%"/sendMessage -d chat_id="%TELEGRAM_CHAT_ID%" -d text="%TEXT_PRE_BUILD%" '''
//             }
//         }

//         stage('Build & Push Docker Images') {
//             steps {
//                 script {
//                     def services = ["social-pro-client", "social-pro-admin", "social-pro-be", "email-proxy"]

//                     services.each { service ->
//                         sh """
//                             docker build -t $REGISTRY/$service:${env.BRANCH_NAME} -f $service/Dockerfile $service
//                             docker push $REGISTRY/$service:${env.BRANCH_NAME}
//                         """
//                     }
//                 }
//             }
//         }

//         stage('Deploy to Server') {
//             steps {
//                 script {
//                     if (env.DEPLOY_PATH) {
//                         sh "docker-compose -f $DOCKER_COMPOSE_FILE up -d --remove-orphans" 
//                     }
//                 }
//             }
//         }
//     }

//     post {
//         success{
//             script {
//                 bat ''' curl -s -X POST https://api.telegram.org/bot"%TELEGRAM_TOKEN%"/sendMessage -d chat_id="%TELEGRAM_CHAT_ID%" -d text="%TEXT_SUCCESS_BUILD%" '''
//             }
//         }
//         failure{
//             script {
//                 bat ''' curl -s -X POST https://api.telegram.org/bot"%TELEGRAM_TOKEN%"/sendMessage -d chat_id="%TELEGRAM_CHAT_ID%" -d text="%TEXT_FAILURE_BUILD%" '''
//             }
//         }
//         aborted{
//             script {
//                 bat ''' curl -s -X POST https://api.telegram.org/bot"%TELEGRAM_TOKEN%"/sendMessage -d chat_id="%TELEGRAM_CHAT_ID%" -d text="%TEXT_ABORTED_BUILD%" '''
//             }
//         }
        
//         always {
//             echo "CI/CD Pipeline hoàn tất cho branch: ${env.BRANCH_NAME}"
//         }
//     }
// }

pipeline {
  agent none
  stages {
    stage('Build All Projects') {
      parallel {
        stage('Social-pro-be') {
          agent any
        //   when { changeset "social-pro-be/**" }
          def projectAPipeline = load 'social-pro-be/Jenkinsfile'
          projectAPipeline()
        }
       
      }
    }
  }
}