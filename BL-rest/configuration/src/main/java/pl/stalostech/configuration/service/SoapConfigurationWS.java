package pl.stalostech.configuration.service;

import javax.ejb.Stateless;

import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.exception.HystrixRuntimeException;

import pl.stalostech.configuration.exposure.rs.hystrix.SoapConfigurationWSCommandException;
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

	private static class SoapConfigurationWSCommand extends HystrixCommand<GetConfigurationResponse> {

		private ConfigurationPort port;

		protected SoapConfigurationWSCommand() {
			super(Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("soapConfigurationWSCommand")));
			this.port = new ConfigurationPortService().getConfigurationPortSoap11();
		}

		@Override
		protected GetConfigurationResponse run() throws Exception {
			return port.getConfiguration(new GetConfigurationRequest());
		}

	}

	public GetConfigurationResponse getConfiguration() {
		try {
			return new SoapConfigurationWSCommand().execute();
		} catch (HystrixRuntimeException e) {
			throw new SoapConfigurationWSCommandException(e);
		}
	}

}
