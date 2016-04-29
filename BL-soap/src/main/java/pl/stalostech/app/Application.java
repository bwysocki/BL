package pl.stalostech.app;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableAutoConfiguration
@ComponentScan("pl.stalostech")
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean(name = "dozer")
	public DozerBeanMapper configDozer() throws IOException {
		List<String> mappingFiles = Arrays.asList("dozer-mappings.xml");
		DozerBeanMapper mapper = new DozerBeanMapper();
		mapper.setMappingFiles(mappingFiles);
		return mapper;
	}

}
