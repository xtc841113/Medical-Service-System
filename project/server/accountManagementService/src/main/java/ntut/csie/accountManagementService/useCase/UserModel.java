package ntut.csie.accountManagementService.useCase;

import ntut.csie.accountManagementService.entity.model.Role;

public class UserModel {
	private String id;
	private String username;
	private String email;
	private String password;
	private String name;
	private Role systemRole;
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Role getSystemRole() {
		return systemRole;
	}

	public void setSystemRole(Role systemRole) {
		this.systemRole = systemRole;
	}
}
