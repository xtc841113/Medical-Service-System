package ntut.csie.accountManagementService.useCase.register;

import ntut.csie.accountManagementService.useCase.Input;

public interface RegisterInput extends Input{
	public String getUsername();

	public void setUsername(String username);

	public String getEmail();

	public void setEmail(String email);

	public String getPassword();

	public void setPassword(String password);

	public String getName();

	public void setName(String name);

	public String getSystemRole();

	public void setSystemRole(String systemRole);
}
