package ntut.csie.accountManagementService.adapter.controller;

import ntut.csie.accountManagementService.ApplicationContext;
import ntut.csie.accountManagementService.adapter.presenter.user.GetUserIdByUserInformationPresenter;
import ntut.csie.accountManagementService.useCase.getUserIdByUserInformation.GetUserIdByUserInformationInput;
import ntut.csie.accountManagementService.useCase.getUserIdByUserInformation.GetUserIdByUserInformationUseCase;
import ntut.csie.accountManagementService.useCase.getUserIdByUserInformation.GetUserIdByUserInformationOutput;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/users")
public class GetUserIdByUserInformationAPI{

    private ApplicationContext applicationContext = ApplicationContext.getInstance();
    private GetUserIdByUserInformationUseCase getUserIdByUserInformationUseCase = applicationContext.newGetUserIdByUserInformationUseCase();

    @GET
    @Path("/{username}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)

    public Response getUserIdByUserInformation(@PathParam("username") String username) {


        GetUserIdByUserInformationInput input = (GetUserIdByUserInformationInput) getUserIdByUserInformationUseCase;
        input.setUsername(username);
        GetUserIdByUserInformationPresenter presenter = new GetUserIdByUserInformationPresenter();

        getUserIdByUserInformationUseCase.execute(input, presenter);

        if (!presenter.getUserId().isEmpty()) {
            return Response.status(Response.Status.OK).entity(presenter.buildViewModel()).build();
        }
        return Response.status(Response.Status.NOT_FOUND).entity(ErrorCodeHandler.GET).build();

    }


}
