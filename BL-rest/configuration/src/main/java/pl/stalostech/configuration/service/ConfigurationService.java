package pl.stalostech.configuration.service;

import javax.ejb.Stateless;
import javax.inject.Inject;

import pl.stalostech.configuration.exposure.rs.hystrix.SoapConfigurationWSCommandException;
import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.jaxws.configuration.Configuration;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;
import pl.stalostech.jaxws.configuration.Status;

/**
 * Handles getting current configuration and saving new.
 */
@Stateless
public class ConfigurationService {

	public final static String DOZER_SECTION = "configuration";

	@Inject
	private DozerMapper dozerMapper;

	@Inject
	private SoapConfigurationWS soapConfigurationWS;

	public ConfigurationRepresentation getConfiguration() {
		return mapSoapToInternalModel(soapConfigurationWS.getConfiguration());
	}

	public void updateConfiguration(ConfigurationRepresentation configuration) {
		if (soapConfigurationWS.updateConfiguration(mapInternalToSoapModel(configuration)).getStatus()
				.equals(Status.ERROR)) {
			throw new SoapConfigurationWSCommandException("Problem with updating configuration.");
		}
	}

	private ConfigurationRepresentation mapSoapToInternalModel(GetConfigurationResponse soap) {
		ConfigurationRepresentation internal = new ConfigurationRepresentation();
		dozerMapper.getDozerMapper().map(soap.getConfiguration(), internal, DOZER_SECTION);
		return internal;
	}

	private Configuration mapInternalToSoapModel(ConfigurationRepresentation model) {
		Configuration soapModel = new Configuration();
		dozerMapper.getDozerMapper().map(model, soapModel, DOZER_SECTION);
		return soapModel;
	}

}
