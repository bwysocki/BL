package pl.stalostech.exceptionmapping;

import java.net.URI;

import javax.ejb.EJBAccessException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import pl.stalostech.exceptionmapping.model.ErrorRepresentation;

/**
 * Mapping access exception to http response 403 (forbidden).
 */
@Provider
public class EJBAccessExceptionMapper implements ExceptionMapper<EJBAccessException> {
    @Override
    public Response toResponse(EJBAccessException e) {
        return Response
            .status(Response.Status.UNAUTHORIZED)
            .type(MediaType.APPLICATION_JSON)
            .entity(new ErrorRepresentation(URI.create("https://stalostech.pl/security/unauthorized"),
                "Access to the resource not authorized"))
            .build();
    }
}
