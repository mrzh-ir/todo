plugins {
	java
	id("org.springframework.boot") version "2.3.0.RELEASE"
}

group = "org.redischool.sd2"
version = "0.0.1-SNAPSHOT"

repositories {
	mavenCentral()
}

dependencies {
	implementation(platform("org.springframework.boot:spring-boot-dependencies:2.3.0.RELEASE"))
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation(project(":frontend"))

	testImplementation("org.junit.jupiter:junit-jupiter:5.6.0")
	testImplementation("org.assertj:assertj-core:3.14.0")
	testImplementation("org.mockito:mockito-core:3.1.0")
	testImplementation("org.mockito:mockito-junit-jupiter:3.1.0")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

java {
	sourceCompatibility = JavaVersion.VERSION_11
}

tasks {
	test {
		useJUnitPlatform()
	}
}
