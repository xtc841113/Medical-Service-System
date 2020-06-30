package ntut.csie.accountManagementService.useCase.modifyPersonalInformation;

import ntut.csie.accountManagementService.useCase.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import ntut.csie.accountManagementService.entity.model.User;

public class ModifyPersonalInformationUseCaseImpl implements ModifyPersonalInformationInput, ModifyPersonalInformationUseCase{
	
	private UserRepository userRepository;
	private String userId;
	private String originalPassword;
	private String newPassword;
	private String email;
	private String name;
	private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
	
	
	public ModifyPersonalInformationUseCaseImpl(UserRepository repository) {
		this.userRepository = repository;
	}

	@Override
	public void execute(ModifyPersonalInformationInput input, ModifyPersonalInformationOutput output) {
		User user = userRepository.getUserById(input.getUserId());
		if(userRepository.AuthenticateUser(user.getUsername(), input.getOriginalPassword())) {
			user.setPassword(bCryptPasswordEncoder.encode(input.getNewPassword()));
			user.setEmail(input.getEmail());
			user.setName(input.getName());
			userRepository.save(user);
			
			output.setOutputMessage("Modify Complete.");
		} else {
			output.setOutputMessage("Password error.");
		}
	}

	@Override
	public void setOriginalPassword(String originalPassword) {
		this.originalPassword = originalPassword;
	}

	@Override
	public String getOriginalPassword() {
		return originalPassword;
	}

	@Override
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	@Override
	public String getNewPassword() {
		return newPassword;
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
	public String getName() {
		return name;
	}

	@Override
	public void setName(String name) {
		this.name = name;
	}

	@Override
	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	public String getUserId() {
		return userId;
	}

}
