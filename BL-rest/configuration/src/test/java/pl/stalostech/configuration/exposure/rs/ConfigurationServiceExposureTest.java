package pl.stalostech.configuration.exposure.rs;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

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

import pl.stalostech.configuration.exposure.rs.hystrix.SoapConfigurationWSCommandException;
import pl.stalostech.configuration.factory.TestObjectsFactory;
import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.configuration.service.ConfigurationService;
import pl.stalostech.configuration.service.DozerMapper;
import pl.stalostech.configuration.service.SoapConfigurationWS;

@RunWith(Arquillian.class)
public class ConfigurationServiceExposureTest {

	@Inject
	private TestObjectsFactory testObjectsFactory;

	@Mock
	private ConfigurationService configurationService;

	@Inject
	@InjectMocks
	private ConfigurationServiceExposure exposure;

	@Deployment
	public static JavaArchive createDeployment() {
		return ShrinkWrap.create(JavaArchive.class)
				.addClasses(TestObjectsFactory.class, ConfigurationServiceExposure.class, ConfigurationService.class,
						SoapConfigurationWS.class, DozerMapper.class)
				.addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
	}

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void testGet() {
		when(configurationService.getConfiguration())
				.thenReturn(testObjectsFactory.getSampleConfigurationRepresentation());

		assertNotNull(exposure.get());
	}

	@Test
	public void testSuccessfulPut() {
		doNothing().when(configurationService).updateConfiguration(any(ConfigurationRepresentation.class));

		Response r = exposure.put(testObjectsFactory.getSampleConfigurationRepresentation());
		assertNotNull(r);
		assertEquals(Status.OK, r.getStatusInfo());
	}

	@Test(expected = SoapConfigurationWSCommandException.class)
	public void testUnSuccessfulPut() {
		doThrow(SoapConfigurationWSCommandException.class).when(configurationService)
				.updateConfiguration(any(ConfigurationRepresentation.class));

		exposure.put(testObjectsFactory.getSampleConfigurationRepresentation());
	}

}
