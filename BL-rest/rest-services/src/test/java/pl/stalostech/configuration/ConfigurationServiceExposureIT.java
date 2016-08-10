package pl.stalostech.configuration;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.jaxrs.json.JacksonJaxbJsonProvider;

import pl.stalostech.configuration.model.ConfigurationModel;
import pl.stalostech.configuration.model.ConfigurationRepresentation;

public class ConfigurationServiceExposureIT {

	private Invocation.Builder invocationBuilder;

	@Before
	public void init() {
		WebTarget target = ClientBuilder.newClient().register(JacksonJaxbJsonProvider.class)
				.target("http://localhost:7001/rest").path("configuration");
		invocationBuilder = target.request();
	}

	@Test
	public void testGetConfiguration() {
		Response response = invocationBuilder.get();
		assertNotNull(response.readEntity(ConfigurationRepresentation.class));
	}

	@Test
	public void testPutConfiguration() {
		Response response = invocationBuilder
				.put(Entity.entity(getSampleConfigurationRepresentation(), MediaType.APPLICATION_JSON));

		assertEquals(200, response.getStatus());
	}

	@Test
	public void testPutConfigurationValidation() {
		ConfigurationRepresentation conf = getSampleConfigurationRepresentation();
		conf.setColor("Wrong color");

		Response response = invocationBuilder.put(Entity.entity(conf, MediaType.APPLICATION_JSON));
		assertEquals(400, response.getStatus());

		conf = getSampleConfigurationRepresentation();
		conf.setFps(100);

		response = invocationBuilder.put(Entity.entity(conf, MediaType.APPLICATION_JSON));
		assertEquals(400, response.getStatus());
	}

	private ConfigurationRepresentation getSampleConfigurationRepresentation() {
		ConfigurationRepresentation r = new ConfigurationRepresentation();
		r.setColor("#1100FF");
		r.setFps(35);
		r.setModel(ConfigurationModel.CAR);
		r.setThreshold(20);
		r.setThresholdChecked(true);
		return r;
	}

}
