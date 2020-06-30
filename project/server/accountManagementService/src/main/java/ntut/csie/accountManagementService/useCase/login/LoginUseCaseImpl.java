package ntut.csie.accountManagementService.useCase.login;

import ntut.csie.accountManagementService.entity.model.User;
import ntut.csie.accountManagementService.useCase.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class LoginUseCaseImpl implements LoginUseCase, LoginInput{
	private UserRepository userRepository;
	
	private String username;
	private String password;

	public LoginUseCaseImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public void execute(LoginInput input, LoginOutput output) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		if(userRepository.AuthenticateUser(input.getUsername(), input.getPassword())) {

			User user = userRepository.getUserByUsername(input.getUsername());
			output.setOutputMessage("success");
			output.setToken(bCryptPasswordEncoder.encode(input.getUsername()));
			output.setUserId(user.getId());
			output.setName(user.getName());
			output.setRole(user.getSystemRole().toString());
		} else {
			output.setOutputMessage("fail");
		}
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public void setPassword(String password) {
		this.password = password;
	}
}
