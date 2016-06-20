package pl.stalostech.configuration.factory;

import javax.ejb.Stateless;

import pl.stalostech.configuration.model.ConfigurationModel;
import pl.stalostech.configuration.model.ConfigurationRepresentation;

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
	
	@Override
	public String toString() {
		return "TestObjectsFactory";
	}

}
