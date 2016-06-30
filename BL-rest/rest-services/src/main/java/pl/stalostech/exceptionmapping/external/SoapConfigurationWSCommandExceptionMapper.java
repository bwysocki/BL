package pl.stalostech.exceptionmapping.external;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import pl.stalostech.configuration.exposure.rs.hystrix.SoapConfigurationWSCommandException;

@Provider
public class SoapConfigurationWSCommandExceptionMapper implements ExceptionMapper<SoapConfigurationWSCommandException> {

	private static Logger LOG = LoggerFactory.getLogger(SoapConfigurationWSCommandExceptionMapper.class);

	@Override
	public Response toResponse(SoapConfigurationWSCommandException e) {
		LOG.error("Problem with communication with Configuration SOAP service.", e.getMessage());
		return Response.status(Response.Status.SERVICE_UNAVAILABLE).build();
	}

}
