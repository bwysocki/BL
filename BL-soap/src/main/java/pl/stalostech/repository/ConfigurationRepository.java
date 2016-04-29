package pl.stalostech.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import pl.stalostech.model.ConfigurationModel;

/**
 * Repository for configuration.
 * 
 * @author Bartosz Wysocki
 *
 */
public interface ConfigurationRepository extends MongoRepository<ConfigurationModel, String> {

	@Query("{'_id' : '412662'}")
	ConfigurationModel findConfiguration();

}
