package ntut.csie.accountManagementService.useCase;

import ntut.csie.accountManagementService.entity.model.User;

public class ConvertUserToDTO {
	public static UserModel transform(User user) {
		UserModel dto = new UserModel();
		dto.setId(user.getId());
		dto.setUsername(user.getUsername());
		dto.setEmail(user.getEmail());
		dto.setPassword(user.getPassword());
		dto.setName(user.getName());
		dto.setSystemRole(user.getSystemRole());
		return dto;
	}
}
