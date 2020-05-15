------------------------------------- 
ng/sboot 포팅
---
- git clone https://github.com/shekhargulati/spring-boot-maven-angular-starter.git uiserver-ng-sboot-starter
- git remote remove origin
- (수정) backend > uiserver-sboot변경(pom2군데,폴더명)
- (수정) ui > uiserver-ng (상동 + com.shekhargulati.starters.ngboot부분도 변경)
- (수정) pom.xml - scm/issuemanage 주석
- (수정) pom.xml - npm lint execution 주석,checkstyle 주석
- (수정) ui-src > target-ui 변경 - pom.xml,package.json,gitignore추가

------------------------------------- 
빌드/실행
---
- 	***주의 : uiserver-ng/node폴더에 node/npm 자동설치됨 (또는 기존설치된nodejs 복사 + -Dskip.installnodenpm)
- mvn clean install -DskipTests -Dcheckstyle.skip (-Dskip.installnodenpm)
- java -jar uiserver-sboot/target/app.jar
- http://localhost:8080/


------------------------------------- 
ng-zorro starter 적용
---
- mv uiserver-ng uiserver-ngzzz
- git clone https://github.com/NG-ZORRO/ng-zorro-universal-starter.git uiserver-ng
- cd uiserver-ng
- 수정 - nz-form-extra주석처리 (nz-form-explain ?)
- node폴더 복사/pom.xml 복사
- package.json : build변경 (typescript 3.9.2 > 3.8.3)
- git remote remove origin > git add . > git commit -m '1'
- rm -rf yarn.lock package-lock.json
- npm install
- ng update --all --force --allow-dirty (----실패시 rm yarn.lock package-lock.json -----node_modules)
- ng serve
# proxy
- proxy.conf.js
- ng serve --proxy-config proxy.conf.js
- http://localhost:4200/
# sample 
- yguide/dbtable
- yguide/

------------------------------------- 
sboot 적용 
---
- pom.xml
- application.properties
- swagger
- websocket 패키지
- util 패키지
- http://localhost:8080/swagger-ui.html





------------------------------------- 
git push
---
- git remote add origin https://github.com/algo/uiserver-ng-sboot-starter.git
- git push -u origin master

