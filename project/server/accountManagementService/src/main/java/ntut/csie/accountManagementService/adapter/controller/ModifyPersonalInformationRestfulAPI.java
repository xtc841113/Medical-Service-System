package ntut.csie.accountManagementService.adapter.controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ntut.csie.accountManagementService.adapter.presenter.user.ModifyPersonalInformationPresenter;
import org.json.JSONException;
import org.json.JSONObject;

import ntut.csie.accountManagementService.ApplicationContext;
import ntut.csie.accountManagementService.useCase.modifyPersonalInformation.ModifyPersonalInformationInput;
import ntut.csie.accountManagementService.useCase.modifyPersonalInformation.ModifyPersonalInformationUseCase;

@Path("/users")
public class ModifyPersonalInformationRestfulAPI{
	private ApplicationContext applicationContext = ApplicationContext.getInstance();
	private ModifyPersonalInformationUseCase modifyPersonalInformationUseCase = applicationContext.newChangePersonalInformationUseCase();

	@PUT
	@Path("/personalInformation")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response modifyPersonalInformationOutput(String userInfo) {
		
		String userId = "";
		String email = "";
		String originalPassword = "";
		String newPassword = "";
		String name = "";
		
		try {
			JSONObject userJSON = new JSONObject(userInfo);
			userId = userJSON.getString("userId");
			email = userJSON.getString("email");
			originalPassword = userJSON.getString("originalPassword");
			newPassword = userJSON.getString("newPassword");
			name = userJSON.getString("name");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		ModifyPersonalInformationInput input = (ModifyPersonalInformationInput) modifyPersonalInformationUseCase;
		input.setUserId(userId);
		input.setEmail(email);
		input.setOriginalPassword(originalPassword);
		input.setNewPassword(newPassword);
		input.setName(name);
		
		ModifyPersonalInformationPresenter presenter = new ModifyPersonalInformationPresenter();
		
		modifyPersonalInformationUseCase.execute(input, presenter);

		if (!presenter.getOutputMessage().equals("Password error.")) {
			return Response.status(Response.Status.OK).entity(presenter.buildViewModel()).build();
		}
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ErrorCodeHandler.POST).build();	}
}
