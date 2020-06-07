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
 :: Spring Boot ::        (v2.2.1.RELEASE)

2019-11-16 18:51:16.111  INFO 11211 --- [           main] org.redischool.sd2.todo.TodoApplication  : Starting TodoApplication on ... with PID 11211 (.../todo/build/classes/java/main started by ... in .../todo)
2019-11-16 18:51:16.115  INFO 11211 --- [           main] org.redischool.sd2.todo.TodoApplication  : No active profile set, falling back to default profiles: default
2019-11-16 18:51:17.069  INFO 11211 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2019-11-16 18:51:17.080  INFO 11211 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2019-11-16 18:51:17.080  INFO 11211 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.27]
2019-11-16 18:51:17.154  INFO 11211 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2019-11-16 18:51:17.155  INFO 11211 --- [           main] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 982 ms
2019-11-16 18:51:17.327  INFO 11211 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2019-11-16 18:51:17.377  INFO 11211 --- [           main] o.s.b.a.w.s.WelcomePageHandlerMapping    : Adding welcome page: class path resource [static/index.html]
2019-11-16 18:51:17.557  INFO 11211 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2019-11-16 18:51:17.569  INFO 11211 --- [           main] org.redischool.sd2.todo.TodoApplication  : Started TodoApplication in 1.914 seconds (JVM running for 2.428)
2019-11-16 18:51:30.402  INFO 11211 --- [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2019-11-16 18:51:30.403  INFO 11211 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2019-11-16 18:51:30.420  INFO 11211 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 16 ms
<============--> 87% EXECUTING [1m 0s]
> :bootRun
```

Once you see this, you may open `localhost:8080` in your browser and you should see the application.
