package ntut.csie.accountManagementService.useCase;

import ntut.csie.accountManagementService.entity.model.User;

public interface UserRepository {
	public void save(User user);
	
	public User getUserById(String id);
	
	public User getUserByUsername(String username);

	public Boolean AuthenticateUser(String username, String password);
}
