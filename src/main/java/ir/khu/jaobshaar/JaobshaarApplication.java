package ir.khu.jaobshaar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class JaobshaarApplication {

	public static void main(String[] args) {
		SpringApplication.run(JaobshaarApplication.class, args);
	}

}
