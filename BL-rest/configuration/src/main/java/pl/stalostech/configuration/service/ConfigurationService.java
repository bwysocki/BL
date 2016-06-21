package pl.stalostech.configuration.service;

import javax.ejb.Stateless;
import javax.inject.Inject;

import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;

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

	private ConfigurationRepresentation mapSoapToInternalModel(GetConfigurationResponse soap) {
		ConfigurationRepresentation internal = new ConfigurationRepresentation();
		dozerMapper.getDozerMapper().map(soap.getConfiguration(), internal, DOZER_SECTION);
		return internal;
	}

}
