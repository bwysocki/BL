package pl.stalostech.bl.rest;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PUT;

public interface BLRestApi {

    @GET("rest/configuration")
    Call<ConfigurationModel> getConfiguration();

    @PUT("rest/configuration")
    Call<Void> putConfiguration(@Body ConfigurationModel configurationModel);

}
