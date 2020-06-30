package ntut.csie.accountManagementService.useCase.getUserIdByUserInformation;

import ntut.csie.accountManagementService.useCase.UserRepository;

public class GetUserIdByUserInformationUseCaseImpl implements GetUserIdByUserInformationUseCase, GetUserIdByUserInformationInput {

    private UserRepository userRepository;
    private String username;

    public GetUserIdByUserInformationUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void execute(GetUserIdByUserInformationInput input, GetUserIdByUserInformationOutput output) {
        output.setUserId(userRepository.getUserByUsername(input.getUsername()).getId());
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }


}
