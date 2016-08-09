package pl.stalostech.configuration.service;

import javax.ejb.Stateless;

import com.netflix.hystrix.HystrixCommand;
import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.exception.HystrixRuntimeException;

import pl.stalostech.configuration.exposure.rs.hystrix.SoapConfigurationWSCommandException;
import pl.stalostech.jaxws.configuration.Configuration;
import pl.stalostech.jaxws.configuration.ConfigurationPort;
import pl.stalostech.jaxws.configuration.ConfigurationPortService;
import pl.stalostech.jaxws.configuration.GetConfigurationRequest;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;
import pl.stalostech.jaxws.configuration.SaveConfigurationRequest;
import pl.stalostech.jaxws.configuration.SaveConfigurationResponse;

/**
 * Service communicating with SOAP ws.
 * 
 * @author Bartosz Wysocki
 */
@Stateless
public class SoapConfigurationWS {

	private static class SoapConfigurationWSGetCommand extends HystrixCommand<GetConfigurationResponse> {

		private ConfigurationPort port;

		protected SoapConfigurationWSGetCommand() {
			super(Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("SoapConfigurationWSGetCommand")));
			this.port = new ConfigurationPortService().getConfigurationPortSoap11();
		}

		@Override
		protected GetConfigurationResponse run() throws Exception {
			return port.getConfiguration(new GetConfigurationRequest());
		}

	}

	private static class SoapConfigurationWSPutCommand extends HystrixCommand<SaveConfigurationResponse> {

		private ConfigurationPort port;
		private Configuration configuration;

		protected SoapConfigurationWSPutCommand(Configuration configuration) {
			super(Setter.withGroupKey(HystrixCommandGroupKey.Factory.asKey("SoapConfigurationWSPutCommand")));
			this.port = new ConfigurationPortService().getConfigurationPortSoap11();
			this.configuration = configuration;
		}

		@Override
		protected SaveConfigurationResponse run() throws Exception {
			SaveConfigurationRequest request = new SaveConfigurationRequest();
			request.setConfiguration(configuration);
			return port.saveConfiguration(request);
		}

	}

	public SaveConfigurationResponse updateConfiguration(Configuration configuration) {
		try {
			return new SoapConfigurationWSPutCommand(configuration).execute();
		} catch (HystrixRuntimeException e) {
			throw new SoapConfigurationWSCommandException(e);
		}
	}

	public GetConfigurationResponse getConfiguration() {
		try {
			return new SoapConfigurationWSGetCommand().execute();
		} catch (HystrixRuntimeException e) {
			throw new SoapConfigurationWSCommandException(e);
		}
	}

}
