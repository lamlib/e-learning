# Nhật ký phát triển
Mọi tiến trình được chạy trên
- JVM 17.0.12
- MVN 3.9.1
- Springboot 3.5.8

Tiến hành cài đặt maven và run thử project demo:
```bash
mvn archetype:generate

```
Với các tham số sau:
- Khởi tạo từ archetype 2031
- Group Id là com.lamlib
- Package là com.lamlib.learning
- Artifact Id là learning

Các gói được khởi tạo ban đầu là:
- Dependency management: junit-bom
- Dependency: junit-jupiter-api
- Dependency: junit-jupiter-params
- Dependency: junit-jupiter-params
- Dependency: junit-jupiter-params
- Dependency: junit-jupiter-params
- Build: maven-clean-plugin
- Build: maven-resources-plugin
- Build: maven-compiler-plugin
- Build: maven-surefire-plugin
- Build: maven-jar-plugin
- Build: maven-install-plugin
- Build: maven-deploy-plugin
- Build: maven-site-plugin
- Build: maven-site-plugin
- Build: maven-project-info-reports-plugin

Để chạy project với maven bạn cần chạy các lệnh trong [Maven Build Lifecycle](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html):
- validate: Kiểm tra dự án đã cấu hình hợp lệ và đầy đủ thông tin cần thiết.
- compile: Biên dịch dự án từ mã nguồn sang tệp thực thi.
- test: Kiểm nghiệm tệp thực thi sử dụng các unit test framework kiểm thử phù hợp. Lệnh này KHÔNG yêu cầu mã nguồn phải đã đóng gói hoặc deploy trước đó.
- package: Đóng gói tệp đã biên dịch thành dạng có thể chi sẻ, chẳng hạn JAR.
- verify: Kiểm nghiệm integration test để đảm bảo chất lượng.
- install: Cài đặc các gói phát triển được chia sẻ từ cộng đồng vào máy cục bộ, phục vụ quá trình phát triển cho nhiều project.
- deploy: Công khai gói đã package với cộng đồng.

Đầu tiên Maven sẽ validate project, sau đó sẽ compile, rồi chạy unit test và đóng gói chúng. Rồi lại chạy intergration test, cài đặt các gói vào local repository và deploy các package đã cài vào remote repository.

Một số lệnh khác hỗ trợ là:
- clean: Xóa các tệp đã compile trước đó.
- test-compile: Biên dịch mã test.
- site: Tạo một website documentation cho project.

Để run khi development, cần compile project trước rồi chạy .class:
```bash
java -cp target/classes com.lamlib.learning.App
```

Để run ở production, cần package trước rồi chạy .jar
```bash
java -jar target/learning-1.0.0.jar
```
Chú ý: Phải [chỉ định main class](https://maven.apache.org/shared/maven-archiver/examples/classpath.html#Make) cho .jar. Trong pom.xml.

Sau đó, cần cài các gói của [spring boot với maven](https://docs.spring.io/spring-boot/maven-plugin/getting-started.html)
- Parent: spring-boot-starter-parent
- Dependency: spring-boot-starter-web
- Dependency: spring-boot-starter-web
- Dependency: spring-boot-starter-test
- Dependency: spring-boot-devtools
- Build: spring-boot-maven-plugin

Cấu trúc thư mục sẽ như sau: 
```bash
project-name
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.example.app
│   │   │       ├── config
│   │   │       ├── controller
│   │   │       ├── service
│   │   │       │   └── impl
│   │   │       ├── repository
│   │   │       ├── model
│   │   │       └── dto
│   │   │
│   │   ├── resources
│   │   │   ├── static
│   │   │   │   ├── css
│   │   │   │   ├── js
│   │   │   │   └── img
│   │   │   ├── application.properties
│   │   │   └── application.yml
│   │   │
│   │   └── webapp
│   │       └── WEB-INF
│   │           ├── views
│   │               └── *.jsp
│   │
│   └── test
│       └── java
│
├── pom.xml
└── README.md
```

Lựa chọn phát triển bằng [MVC với JSP](https://docs.spring.io/spring-framework/reference/web/webmvc-view/mvc-jsp.html)
Cài đặt thêm các package sau:
- Dependency: tomcat-embed-jasper
- Dependency: jakarta.servlet.jsp.jstl-api
- Dependency: jakarta.servlet.jsp.jstl

Do sử dụng JSP làm template engine yêu cầu Tomcat, do đó cần build file war thay vì jar.
Cấu hình war package tại file POM.



