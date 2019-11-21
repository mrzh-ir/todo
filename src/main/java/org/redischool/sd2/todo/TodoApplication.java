package org.redischool.sd2.todo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

@SpringBootApplication
public class TodoApplication {
	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Configuration
	static class ApplicationConfiguration {
		@Bean
		Clock provideClock() {
			return Clock.systemDefaultZone();
		}
	}
}
