package pl.stalostech.exceptionmapping.model;

import java.net.URI;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * General representation of error.
 */
@XmlRootElement
public class ErrorRepresentation {
    private URI type;
    private String message;

    public ErrorRepresentation(URI type, String message) {
        this.type = type;
        this.message = message;
    }

    public URI getType() {
        return type;
    }

    public String getMessage() {
        return message;
    }
}
