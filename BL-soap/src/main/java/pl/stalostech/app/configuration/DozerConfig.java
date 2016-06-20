package pl.stalostech.app.configuration;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.dozer.DozerBeanMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DozerConfig {

	@Bean(name = "dozer")
	public DozerBeanMapper configDozer() throws IOException {
		List<String> mappingFiles = Arrays.asList("dozer-mappings.xml");
		DozerBeanMapper mapper = new DozerBeanMapper();
		mapper.setMappingFiles(mappingFiles);
		return mapper;
	}

}
