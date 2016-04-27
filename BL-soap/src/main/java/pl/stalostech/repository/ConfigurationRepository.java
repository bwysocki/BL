package pl.stalostech.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import pl.stalostech.model.Configuration;

/**
 * Repository for configuration.
 * @author Bartosz Wysocki
 *
 */
public interface ConfigurationRepository extends MongoRepository<Configuration, String>{

}
