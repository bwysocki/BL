package pl.stalostech.configuration.factory;

import javax.ejb.Stateless;

import pl.stalostech.configuration.model.ConfigurationModel;
import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.jaxws.configuration.Configuration;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;
import pl.stalostech.jaxws.configuration.Model;

@Stateless
public class TestObjectsFactory {

	public ConfigurationRepresentation getSampleConfigurationRepresentation() {
		ConfigurationRepresentation r = new ConfigurationRepresentation();
		r.setColor("#AABBCC");
		r.setFps(35);
		r.setModel(ConfigurationModel.CAR);
		r.setThreshold(20);
		r.setThresholdChecked(true);
		return r;
	}
	
	public GetConfigurationResponse getSampleGetConfigurationResponse() {
		GetConfigurationResponse r = new GetConfigurationResponse();
		Configuration conf = new Configuration();
		conf.setFps(34);
		conf.setLogoColor("#AABBCC");
		conf.setModel(Model.CAR);
		conf.setThreshold(15);
		conf.setThresholdChecked(true);
		r.setConfiguration(conf);
		return r;
	}
	
	@Override
	public String toString() {
		return "TestObjectsFactory";
	}

}
