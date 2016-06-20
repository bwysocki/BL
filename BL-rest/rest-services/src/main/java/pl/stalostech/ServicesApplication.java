package pl.stalostech;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import pl.stalostech.configuration.exposure.rs.ConfigurationServiceExposure;
import pl.stalostech.exceptionmapping.ConstraintViolationExceptionMapper;
import pl.stalostech.exceptionmapping.EJBAccessExceptionMapper;
import pl.stalostech.exceptionmapping.ResteasyViolationExceptionMapper;

/**
 * Assembling the rest-services application by including the relevant resource.
 */
@ApplicationPath("/")
public class ServicesApplication extends Application {

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> classes = new HashSet<>();

		registerRestExposure(classes);
		registerExceptionMappers(classes);

		return classes;
	}

	private void registerRestExposure(Set<Class<?>> classes) {
		classes.addAll(Arrays.asList(ConfigurationServiceExposure.class));
	}

	private void registerExceptionMappers(Set<Class<?>> classes) {
		classes.addAll(Arrays.asList(EJBAccessExceptionMapper.class, ConstraintViolationExceptionMapper.class,
				ResteasyViolationExceptionMapper.class));
	}

}
