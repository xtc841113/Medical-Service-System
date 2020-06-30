package ntut.csie.accountManagementService.adapter.gateways.repository;

import ntut.csie.accountManagementService.entity.model.Role;
import ntut.csie.accountManagementService.entity.model.User;

public class UserMapper {
	public User transformToUser(UserData data) {
		User user = new User();
		user.setId(data.getId());
		user.setUsername(data.getUsername());
		user.setEmail(data.getEmail());
		user.setPassword(data.getPassword());
		user.setName(data.getName());
		user.setSystemRole(Role.valueOf(data.getSystemRole()));
		return user;
	}
	
	public UserData transformToUserData(User user) {
		UserData data = new UserData();
		data.setId(user.getId());
		data.setUsername(user.getUsername());
		data.setEmail(user.getEmail());
		data.setPassword(user.getPassword());
		data.setName(user.getName());
		data.setSystemRole(user.getSystemRole().toString());
		return data;
	}
}
