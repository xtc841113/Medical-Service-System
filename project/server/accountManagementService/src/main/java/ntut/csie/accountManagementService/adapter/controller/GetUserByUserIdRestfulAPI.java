package ntut.csie.accountManagementService.adapter.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ntut.csie.accountManagementService.adapter.presenter.user.GetUserByUserIdPresenter;
import org.json.JSONException;
import org.json.JSONObject;

import ntut.csie.accountManagementService.ApplicationContext;
import ntut.csie.accountManagementService.useCase.getUserByUserId.GetUserByUserIdInput;
import ntut.csie.accountManagementService.useCase.getUserByUserId.GetUserByUserIdUseCase;

@Path("/users")
public class GetUserByUserIdRestfulAPI{
	private ApplicationContext applicationContext = ApplicationContext.getInstance();
	private GetUserByUserIdUseCase getUserByUserIdUseCase = applicationContext.newGetUserByUserIdUseCase();

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserByUserId(String getUserByUserIdInfo) {
		String userId = "";
		
		try {
			JSONObject userJSON = new JSONObject(getUserByUserIdInfo);
			userId = userJSON.getString("userId");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		GetUserByUserIdInput input = (GetUserByUserIdInput) getUserByUserIdUseCase;
		input.setUserId(userId);

		GetUserByUserIdPresenter presenter = new GetUserByUserIdPresenter();
		
		getUserByUserIdUseCase.execute(input, presenter);

		if (!presenter.getUser().getId().equals(null)) {
			return Response.status(Response.Status.CREATED).entity(presenter.buildViewModel()).build();
		}
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ErrorCodeHandler.POST).build();
	}

}
