package pl.stalostech.jms;

import pl.stalostech.autogenerated.xsd.model.Configuration;

public interface JMSClient {

	public void sendConfigurationMessage(Configuration configuration);

}
