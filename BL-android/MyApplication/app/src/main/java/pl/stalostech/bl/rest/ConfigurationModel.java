package pl.stalostech.bl.rest;

public class ConfigurationModel {

    private String color;

    private String model;

    private Integer fps;

    private Integer threshold;

    private Boolean thresholdChecked;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getThreshold() {
        return threshold;
    }

    public void setThreshold(Integer threshold) {
        this.threshold = threshold;
    }

    public Boolean getThresholdChecked() {
        return thresholdChecked;
    }

    public void setThresholdChecked(Boolean thresholdChecked) {
        this.thresholdChecked = thresholdChecked;
    }

    public Integer getFps() {
        return fps;
    }

    public void setFps(Integer fps) {
        this.fps = fps;
    }

    @Override
    public String toString() {
        return "ConfigurationRepresentation [color=" + color + ", model=" + model + ", fps=" + fps + ", threshold="
                + threshold + ", thresholdChecked=" + thresholdChecked + "]";
    }

}

