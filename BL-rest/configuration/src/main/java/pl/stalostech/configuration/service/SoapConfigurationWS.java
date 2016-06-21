package pl.stalostech.configuration.service;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;

import pl.stalostech.jaxws.configuration.ConfigurationPort;
import pl.stalostech.jaxws.configuration.ConfigurationPortService;
import pl.stalostech.jaxws.configuration.GetConfigurationRequest;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;

/**
 * Service communicating with SOAP ws.
 * 
 * @author Bartosz Wysocki
 */
@Stateless
public class SoapConfigurationWS {

	private ConfigurationPort port;

	@PostConstruct
	public void init() {
		port = new ConfigurationPortService().getConfigurationPortSoap11();
	}

	public GetConfigurationResponse getConfiguration() {
		return port.getConfiguration(new GetConfigurationRequest());
	}

}
