package pl.stalostech.configuration.exposure.rs;

import javax.annotation.security.PermitAll;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import pl.stalostech.configuration.model.ConfigurationRepresentation;
import pl.stalostech.configuration.service.ConfigurationService;

/**
 * Exposing configuration as REST service.
 */
@Stateless
@Path("/configuration")
@Api(value = "/configuration")
@PermitAll
public class ConfigurationServiceExposure {

	@Inject
	private ConfigurationService configurationService;

	@GET
	@Produces({ "application/json" })
	@ApiOperation("Presents current configuration")
	public ConfigurationRepresentation get() {
		return configurationService.getConfiguration();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Update configuration with new values")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "successful operation") })
	public Response put(
			@ApiParam(value = "Updated configuration object", required = true) @Valid ConfigurationRepresentation configuration) {
		configurationService.updateConfiguration(configuration);
		return Response.status(Status.OK).build();
	}

}
