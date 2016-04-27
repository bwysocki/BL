package pl.stalostech.app;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

import pl.stalostech.repository.ConfigurationRepository;

@Configuration
@EnableMongoRepositories(basePackageClasses = ConfigurationRepository.class)
public class MongoConfig extends AbstractMongoConfiguration {

	@Override
	protected String getDatabaseName() {
		return "bl";
	}

	@Override
	public Mongo mongo() throws Exception {
		return new MongoClient("localhost", 27017);
	}

	@Override
	protected String getMappingBasePackage() {
		return "pl.stalostech.model";
	}

}
