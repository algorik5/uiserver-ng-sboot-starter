----------------------------------------------
guide (by spring-boot-maven-angular-starter)
-----
ausage/00_guide.MD 참고

# ng
- ng-zorro-starter (ng 9)
- 

# sboot
- swagger/lombok/jpa/stomp

# 샘플
- db 조회
- 차트
- stomp샘플


----------------------------------------------
start
-----
git clone https://github.com/algo/uiserver-ng-sboot-starter.git
mvn clean install -DskipTests -Dcheckstyle.skip (주의 node install실패시 node복사 + -Dskip.installnodenpm)
java -jar uiserver-sboot/target/app.jar
http://localhost:8080/


----------------------------------------------
dev ng (vscode)
-----
cd uiserver-ng
ng serve
http://localhost:4200/


----------------------------------------------
dev sboot (vscode)
-----
    (사전준비) JAVA.HOME 환경변수 필수,Java Extension Pack 설치,Spring Boot Extension Pack 설치
왼쪽아래의 SPRING-BOOT DASHBOARD에서 Start클릭
http://localhost:8080/api/ping












spring-boot-maven-angular-starter [![Build Status](https://travis-ci.org/shekhargulati/spring-boot-maven-angular-starter.svg?branch=master)](https://travis-ci.org/shekhargulati/spring-boot-maven-angular-starter)
-----

This is a multi-module Spring Boot Angular Maven starter app with good defaults.
The frontend Angular app is built using [angular-cli](https://cli.angular.io/). 
The project packages Angular application code as a [WebJar](https://www.webjars.org/). 
This project is geared towards building monolithic applications. 
I have also written [a blog that explains step by step how to create this starter project](https://shekhargulati.com/2017/11/08/a-minimalist-guide-to-building-spring-boot-angular-5-applications/).

This project provides productive setup for building Spring Boot Angular applications. 
The application is divided into two Maven modules:

1. `backend`: This contains Java code of the application.
2. `ui`: This contains source code for the Angular based frontend.

This project uses following versions:

1. Spring Boot v2.2.6.RELEASE
2. Angular v9.1.1
3. Node v12.16.2

## Running the full application

You can build the package as a single artifact by running the `./mvnw clean install`.
Next, you can run the application by executing:

```bash
$ java -jar backend/target/app.jar
```

The application will be accessible at `http://localhost:8080`.

## Features

This starter comes bundled with the following features:

1. Multi module Maven project: A multi module project to modularize backend and frontend code separately.
2. Maven wrapper: So, you don't need to install Maven on your machine.
3. Checkstyle: Enforce sane coding standard guidelines.
4. ErrorProne: Find errors in your code.
5. Frontend packaged as a WebJar.
6. CORS enabled: A global configuration is added to enable CORS so that frontend can work seamlessly with backend during development.
7. REST API base path: Sets the base REST API path to `/api`. You can configure it by changing `rest.api.base.path` property.
8. Maven release plugin
9. CI: The project is preconfigured to use TravisCI as continuous integration server.

## Running the backend for development mode

There are multiple ways to run the backend. For development, you can use your favorite IDE and run the
`com.example.app.Application`. As soon as your code compiles, Spring Boot DevTools will reload the code.

You can also run the application using Maven.

```bash
$ cd backend
$  ../mvnw spring-boot:run
```

## Running the frontend for development mode

To install all the required binaries for your project, you can run following command.

```
$ cd frontend
$ ../mvnw frontend:install-node-and-npm
```

Once the above command finishes, you can start the frontend using the `npm run serve` command.

## Hot reloading

Both the front-end and back-end modules support hot reloading.

## Example Application

Following are the example applications built using this starter

1. [boot-angular-pagination-example-app](https://github.com/shekhargulati/boot-angular-pagination-example-app)