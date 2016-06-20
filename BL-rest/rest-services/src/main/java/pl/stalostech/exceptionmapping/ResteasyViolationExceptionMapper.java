package pl.stalostech.exceptionmapping;

import java.net.URI;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.jboss.resteasy.api.validation.ResteasyConstraintViolation;
import org.jboss.resteasy.api.validation.ResteasyViolationException;

import pl.stalostech.exceptionmapping.model.ValidationErrorRepresentation;

/**
 * Resteasy uses a specific Resteasy exception to signal validation errors. This
 * provider must only be registered when running with Resteasy.
 */
@Provider
public class ResteasyViolationExceptionMapper implements ExceptionMapper<ResteasyViolationException> {

	@Override
	public Response toResponse(ResteasyViolationException e) {
		Collection<ValidationErrorRepresentation.Violation> violations = convertToViolations(e.getViolations());
		return Response.status(Response.Status.BAD_REQUEST)
				.type(MediaType.APPLICATION_JSON)
				.entity(new ValidationErrorRepresentation(URI.create("https://stalostech.pl/validation"),
						"Request failed validation", violations))
				.build();
	}

	private Collection<ValidationErrorRepresentation.Violation> convertToViolations(
			List<ResteasyConstraintViolation> violations) {
		return violations.stream()
				.map(v -> new ValidationErrorRepresentation.Violation(v.getMessage(), v.getValue(), v.getPath()))
				.collect(Collectors.toSet());
	}

}
