package pl.stalostech.configuration.service;

import javax.ejb.Stateless;

import pl.stalostech.configuration.model.ConfigurationRepresentation;

/**
 * Handles getting current configuration and saving new.
 */
@Stateless
public class ConfigurationService {
	
	public ConfigurationRepresentation getConfigurationBySoap(){
		return new ConfigurationRepresentation();
	}

}
