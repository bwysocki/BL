package pl.stalostech.app;

import static org.mockito.Mockito.mock;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import pl.stalostech.app.configuration.CacheConfig;
import pl.stalostech.app.configuration.DozerConfig;
import pl.stalostech.app.mockconfiguration.MongoConfig;
import pl.stalostech.jms.JMSClient;

@Configuration
@Import({ DozerConfig.class, MongoConfig.class, CacheConfig.class })
@ComponentScan({ "pl.stalostech.testutils", "pl.stalostech.service", "pl.stalostech.repository" })
public class TestApplication {

	@Bean
	public JMSClient getJMSClient() {
		return mock(JMSClient.class);
	}

}
