package pl.stalostech.exceptionmapping;

import java.net.URI;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import pl.stalostech.exceptionmapping.model.ValidationErrorRepresentation;

/**
 * Mapping standard bean validation
 */
@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

	@Override
	public Response toResponse(ConstraintViolationException e) {
		Collection<ValidationErrorRepresentation.Violation> violations = convertToViolations(
				e.getConstraintViolations());
		return Response.status(Response.Status.BAD_REQUEST)
				.type(MediaType.APPLICATION_JSON)
				.entity(new ValidationErrorRepresentation(URI.create("https://stalostech.pl/validation"),
						"Request failed validation", violations))
				.build();
	}

	private Collection<ValidationErrorRepresentation.Violation> convertToViolations(
			Set<ConstraintViolation<?>> violations) {
		return violations.stream().map(v -> new ValidationErrorRepresentation.Violation(v.getMessage(),
				v.getInvalidValue().toString(), v.getPropertyPath().toString())).collect(Collectors.toSet());
	}
}
