package ntut.csie.accountManagementService.useCase.register;

import ntut.csie.accountManagementService.entity.model.Role;
import ntut.csie.accountManagementService.useCase.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import ntut.csie.accountManagementService.entity.model.User;
import ntut.csie.accountManagementService.entity.model.UserBuilder;

public class RegisterUseCaseImpl implements RegisterUseCase, RegisterInput{
	private UserRepository userRepository;
	
	private String username;
	private String email;
	private String password;
	private String name;
	private String systemRole;
	private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
	
	public RegisterUseCaseImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public void execute(RegisterInput input, RegisterOutput output) {
		User user = userRepository.getUserByUsername(input.getUsername());
		if(user==null) {
			user = UserBuilder.newInstance()
					.username(input.getUsername())
					.email(input.getEmail())
					.password(bCryptPasswordEncoder.encode(input.getPassword()))
					.name(input.getName())
					.systemRole(Role.valueOf(input.getSystemRole()))
					.build();
			userRepository.save(user);
			output.setOutputMessage("Thank you! Your registration was successful!");
		}
		else {
			output.setOutputMessage("Duplicate username!");
			//throw new RuntimeException("Duplicate userName");
			
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
	public String getEmail() {
		return email;
	}

	@Override
	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String getName() {
		return name;
	}

	@Override
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String getSystemRole() {
		return systemRole;
	}

	@Override
	public void setSystemRole(String systemRole) {
		this.systemRole = systemRole;
	}

}
