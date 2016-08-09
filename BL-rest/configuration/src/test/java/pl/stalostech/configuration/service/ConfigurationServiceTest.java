package pl.stalostech.configuration.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
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
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import pl.stalostech.configuration.factory.TestObjectsFactory;
import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.jaxws.configuration.Configuration;
import pl.stalostech.jaxws.configuration.GetConfigurationResponse;
import pl.stalostech.jaxws.configuration.Status;

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

	@Test
	public void testUpdateConfigurationBySoap() {
		ConfigurationRepresentation sample = testObjectsFactory.getSampleConfigurationRepresentation();

		when(configurationSoapService.updateConfiguration(any(Configuration.class)))
				.thenReturn(testObjectsFactory.getSampleSaveConfigurationResponse(Status.OK));

		configurationService.updateConfiguration(sample);

		ArgumentCaptor<Configuration> passedConf = ArgumentCaptor.forClass(Configuration.class);
		verify(configurationSoapService, times(1)).updateConfiguration(passedConf.capture());

		assertEquals(sample.getFps().intValue(), passedConf.getValue().getFps());
		assertEquals(sample.getColor(), passedConf.getValue().getLogoColor());
		assertEquals(sample.getThreshold().intValue(), passedConf.getValue().getThreshold());
		assertEquals(sample.getModel().toString(), passedConf.getValue().getModel().toString());
		assertEquals(sample.getThresholdChecked(), passedConf.getValue().isThresholdChecked());

	}

}
