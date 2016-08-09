package pl.stalostech.configuration.factory;

import javax.ejb.Stateless;

import pl.stalostech.configuration.model.ConfigurationModel;
import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.jaxws.configuration.Configuration;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;
import pl.stalostech.jaxws.configuration.Model;
import pl.stalostech.jaxws.configuration.SaveConfigurationResponse;
import pl.stalostech.jaxws.configuration.Status;

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
	
	public Configuration getSampleConfiguration() {
		Configuration conf = new Configuration();
		conf.setFps(35);
		conf.setLogoColor("#AABBCC");
		conf.setModel(Model.CAR);
		conf.setThreshold(20);
		conf.setThresholdChecked(true);
		return conf;
	}
	
	public GetConfigurationResponse getSampleGetConfigurationResponse() {
		GetConfigurationResponse r = new GetConfigurationResponse();
		Configuration conf = getSampleConfiguration();
		r.setConfiguration(conf);
		return r;
	}
	
	public SaveConfigurationResponse getSampleSaveConfigurationResponse(Status status) {
		SaveConfigurationResponse r = new SaveConfigurationResponse();
		r.setStatus(status);
		return r;
	}
	
	@Override
	public String toString() {
		return "TestObjectsFactory";
	}

}
