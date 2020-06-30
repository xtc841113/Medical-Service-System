package ntut.csie.accountManagementService.adapter.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ntut.csie.accountManagementService.adapter.presenter.user.RegisterPresenter;
import org.json.JSONException;
import org.json.JSONObject;

import ntut.csie.accountManagementService.ApplicationContext;
import ntut.csie.accountManagementService.useCase.register.RegisterInput;
import ntut.csie.accountManagementService.useCase.register.RegisterUseCase;

@Path("/users")
public class RegisterRestfulAPI{
	private ApplicationContext applicationContext = ApplicationContext.getInstance();
	private RegisterUseCase registerUseCase = applicationContext.newRegisterUseCase();

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response register(String userInfo) {
		String username = "";
		String email = "";
		String password = "";
		String systemRole = "";
		String name = "";
		
		try {
			JSONObject userJSON = new JSONObject(userInfo);
			username = userJSON.getString("username");
			email = userJSON.getString("email");
			password = userJSON.getString("password");
			systemRole = userJSON.getString("systemRole");
			name = userJSON.getString("name");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		RegisterInput input = (RegisterInput) registerUseCase;
		input.setUsername(username);
		input.setEmail(email);
		input.setPassword(password);
		input.setSystemRole(systemRole);
		input.setName(name);
		
		RegisterPresenter presenter = new RegisterPresenter();
		
		registerUseCase.execute(input, presenter);


		if (presenter.getOutputMessage().equals(null)) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ErrorCodeHandler.POST).build();
		}

		return Response.status(Response.Status.CREATED).entity(presenter.buildViewModel()).build();
	}
	

}
