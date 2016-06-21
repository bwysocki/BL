package pl.stalostech.configuration.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

import javax.inject.Inject;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import pl.stalostech.configuration.factory.TestObjectsFactory;
import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;

@RunWith(Arquillian.class)
public class ConfigurationServiceTest {

	@Inject
	private TestObjectsFactory testObjectsFactory;

	@Mock
	private SoapConfigurationWS configurationSoapService;

	@Inject
	@InjectMocks
	private ConfigurationService configurationService;

	@Deployment
	public static JavaArchive createDeployment() {
		return ShrinkWrap
				.create(JavaArchive.class).addClasses(TestObjectsFactory.class, ConfigurationService.class,
						DozerMapper.class, SoapConfigurationWS.class)
				.addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
	}

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGetConfigurationBySoap() {
		GetConfigurationResponse sample = testObjectsFactory.getSampleGetConfigurationResponse();

		when(configurationSoapService.getConfiguration()).thenReturn(sample);

		ConfigurationRepresentation r = configurationService.getConfiguration();

		assertNotNull(r);
		assertEquals(sample.getConfiguration().getFps(), r.getFps().intValue());
		assertEquals(sample.getConfiguration().getLogoColor(), r.getColor());
		assertEquals(sample.getConfiguration().getThreshold(), r.getThreshold().intValue());
		assertEquals(sample.getConfiguration().getModel().value(), r.getModel().toString());
		assertEquals(sample.getConfiguration().isThresholdChecked(), r.getThresholdChecked());
	}

}
