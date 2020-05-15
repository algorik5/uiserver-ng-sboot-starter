------------------------------------- ng/sboot 포팅

----- ddd
git clone https://github.com/shekhargulati/spring-boot-maven-angular-starter.git uiserver-ng-sboot-starter
git remote remove origin
(수정) backend > uiserver-sboot변경(pom2군데,폴더명)
(수정) ui > uiserver-ng (상동 + com.shekhargulati.starters.ngboot부분도 변경)
(수정) 기타 > pom.xml - scm/issuemanage 주석
(수정) ui-src > target-ui 변경 : pom.xml,package.json,gitignore추가
(수정) lint 주석 (pom.xml) : npm lint execution 주석

----- 빌드
mvn clean install -DskipTests -Dcheckstyle.skip
	***주의 : uiserver-ng/node폴더에 node/npm 자동설치됨 (설치안되면 기존설치된nodejs의 모든 내용을 복사 + -Dskip.installnodenpm)
java -jar uiserver-sboot/target/app.jar
http://localhost:8080/


