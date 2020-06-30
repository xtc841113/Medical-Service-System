package ntut.csie.accountManagementService.useCase.login;

import ntut.csie.accountManagementService.useCase.Output;

public interface LoginOutput extends Output {
	
	public String getOutputMessage();
	
	public void setOutputMessage(String outputMessage);
	
	public String getToken();
	
	public void setToken(String token);
	
	public String getUserId();
	
	public void setUserId(String userId);

	public String getName();

	public void setName(String name);

	public String getRole();

	public void setRole(String role);
}
