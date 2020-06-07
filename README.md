# "Todo list" web application

ReDI Munich Spring 2020 Software Development 2 Course

Mid-semseter project

This is a web application which provides a simple "Todo" list. We have provided a frontend which you
can access in your web browser when the service is running (see below). Your task
is to complete the backend.

The application allows one to add tasks of different types: one-time tasks,
recurring tasks, and shopping list items. Tasks can then be marked complete and
are removed from the list. Each individual task type has some special features:
one-time tasks may (optionally) have deadlines, recurring tasks are configured to
recur on specific intervals, and shopping items contain the amount of the given
item.

## Running and using the server locally

To run the server on your computer on Linux or MacOS, go to the main directory of the project in a
terminal and run

```shell script
$ ./gradlew bootRun
```

On Windows, use

```shell script
$ gradlew.bat bootRun
```

The first time you do this, the application will take a few minutes to build. Once
it is running, you should see output similar to the following:

```
> Task :bootRun

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.3.0.RELEASE)

2020-06-07 12:14:54.266  INFO 16859 --- [           main] org.redischool.sd2.todo.TodoApplication  : Starting TodoApplication on huitzilopochtli with PID 16859 (/home/hovinen/Programs/todo/build/classes/java/main started by hovinen in /home/hovinen/Programs/todo)
2020-06-07 12:14:54.268  INFO 16859 --- [           main] org.redischool.sd2.todo.TodoApplication  : No active profile set, falling back to default profiles: default
2020-06-07 12:14:55.046  INFO 16859 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2020-06-07 12:14:55.055  INFO 16859 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2020-06-07 12:14:55.055  INFO 16859 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.35]
2020-06-07 12:14:55.107  INFO 16859 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2020-06-07 12:14:55.107  INFO 16859 --- [           main] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 802 ms
2020-06-07 12:14:55.237  INFO 16859 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2020-06-07 12:14:55.279  INFO 16859 --- [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [static/index.html]
2020-06-07 12:14:55.343  INFO 16859 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2020-06-07 12:14:55.352  INFO 16859 --- [           main] org.redischool.sd2.todo.TodoApplication  : Started TodoApplication in 1.396 seconds (JVM running for 1.706)
<============--> 91% EXECUTING [1m 0s]
> :bootRun
```

Once you see the last log message `Started TodoApplication`, you may open `localhost:8080` in your
browser and you should see the application.
