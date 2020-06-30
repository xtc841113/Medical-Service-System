package ntut.csie.accountManagementService.useCase.login;

import ntut.csie.accountManagementService.useCase.Input;

public interface LoginInput extends Input {

	public String getUsername();

	public void setUsername(String username);
	
	public String getPassword();

	public void setPassword(String password);
}
