package ntut.csie.accountManagementService.adapter.controller;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ntut.csie.accountManagementService.adapter.presenter.user.LoginPresenter;
import org.json.JSONException;
import org.json.JSONObject;

import ntut.csie.accountManagementService.ApplicationContext;
import ntut.csie.accountManagementService.useCase.login.LoginInput;
import ntut.csie.accountManagementService.useCase.login.LoginOutput;
import ntut.csie.accountManagementService.useCase.login.LoginUseCase;

@Path("/users")
public class LoginRestfulAPI {
	private ApplicationContext applicationContext = ApplicationContext.getInstance();
	private LoginUseCase loginUseCase = applicationContext.newLoginUseCase();

	private String outputMessage;
	private String token;
	private String userId;
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(String loginInfo) {
		String username = "";
		String password = "";
		
		
		try {
			JSONObject userJSON = new JSONObject(loginInfo);
			username = userJSON.getString("username");
			password = userJSON.getString("password");
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		LoginInput input = (LoginInput) loginUseCase;
		input.setUsername(username);
		input.setPassword(password);
		
		
		LoginPresenter presenter = new LoginPresenter();
		
		loginUseCase.execute(input, presenter);
		if (!presenter.getOutputMessage().equals("fail")) {
			return Response.status(Response.Status.CREATED).entity(presenter.buildViewModel()).build();
		}
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ErrorCodeHandler.POST).build();
	}

}
