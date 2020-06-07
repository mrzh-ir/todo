plugins {
    java
    id("com.github.node-gradle.node") version "2.2.4"
}

node {
    version = "12.18.0"
    npmVersion = "6.13.0"
    download = true
}

tasks.getByName<Jar>("jar") {
    from("dist/todo-frontend")
    into("static")
    dependsOn(tasks.findByName("npm_run_build"))
}

java {
  sourceCompatibility = JavaVersion.VERSION_11
}
