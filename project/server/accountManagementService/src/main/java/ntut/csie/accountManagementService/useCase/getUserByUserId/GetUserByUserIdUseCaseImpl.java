package ntut.csie.accountManagementService.useCase.getUserByUserId;

import ntut.csie.accountManagementService.useCase.ConvertUserToDTO;
import ntut.csie.accountManagementService.useCase.UserRepository;

public class GetUserByUserIdUseCaseImpl implements GetUserByUserIdUseCase, GetUserByUserIdInput{
	private UserRepository userRepository;
	
	private String userId;
	
	public GetUserByUserIdUseCaseImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Override
	public void execute(GetUserByUserIdInput input, GetUserByUserIdOutput output) {
		output.setUser(ConvertUserToDTO.transform(userRepository.getUserById(input.getUserId())));
	}

	@Override
	public String getUserId() {
		return userId;
	}

	@Override
	public void setUserId(String userId) {
		this.userId = userId;
	}

}
