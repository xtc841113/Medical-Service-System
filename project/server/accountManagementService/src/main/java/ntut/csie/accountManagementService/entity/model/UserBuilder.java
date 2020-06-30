package ntut.csie.accountManagementService.entity.model;

import java.util.UUID;

public class UserBuilder {
	private String id;
	private String username;
	private String email;
	private String password;
	private String name;
	private Role systemRole;
	
	public static UserBuilder newInstance() {
		return new UserBuilder();
	}
	
	public UserBuilder username(String username) {
		this.username = username;
		return this;
	}
	
	public UserBuilder email(String email) {
		this.email = email;
		return this;
	}
	
	public UserBuilder password(String password) {
		this.password = password;
		return this;
	}
	
	public UserBuilder name(String name) {
		this.name = name;
		return this;
	}
	
	public UserBuilder systemRole(Role systemRole) {
		this.systemRole = systemRole;
		return this;
	}
	
	public User build() {
		id = UUID.randomUUID().toString();
		User user = new User(id, username, email, password, name, systemRole);
		return user;
	}
}
