package ntut.csie.accountManagementService;

import ntut.csie.accountManagementService.adapter.gateways.repository.MySqlUserRepositoryImpl;
import ntut.csie.accountManagementService.useCase.UserRepository;
import ntut.csie.accountManagementService.useCase.getUserByUserId.GetUserByUserIdUseCase;
import ntut.csie.accountManagementService.useCase.getUserByUserId.GetUserByUserIdUseCaseImpl;
import ntut.csie.accountManagementService.useCase.getUserIdByUserInformation.GetUserIdByUserInformationUseCase;
import ntut.csie.accountManagementService.useCase.getUserIdByUserInformation.GetUserIdByUserInformationUseCaseImpl;
import ntut.csie.accountManagementService.useCase.login.LoginUseCase;
import ntut.csie.accountManagementService.useCase.login.LoginUseCaseImpl;
import ntut.csie.accountManagementService.useCase.modifyPersonalInformation.ModifyPersonalInformationUseCase;
import ntut.csie.accountManagementService.useCase.modifyPersonalInformation.ModifyPersonalInformationUseCaseImpl;
import ntut.csie.accountManagementService.useCase.register.RegisterUseCase;
import ntut.csie.accountManagementService.useCase.register.RegisterUseCaseImpl;

public class ApplicationContext {
	private static ApplicationContext instance = null;
	
	private UserRepository userRepository;
	
	private RegisterUseCase registerUseCase;

	private LoginUseCase loginUseCase;
	
	private GetUserByUserIdUseCase getUserByUserIdUseCase;

	private ModifyPersonalInformationUseCase changePersonalInformationUseCase;

	private GetUserIdByUserInformationUseCase getUserIdByUserInformationUseCase;
	
	private ApplicationContext() {}
	
	public static synchronized ApplicationContext getInstance() {
		if(instance == null){
			return new ApplicationContext();
		}
		return instance;
	}
	
	public UserRepository newUserRepository() {
		userRepository = new MySqlUserRepositoryImpl();
		return userRepository;
	}
	
	public RegisterUseCase newRegisterUseCase() {
		registerUseCase = new RegisterUseCaseImpl(newUserRepository());
		return registerUseCase;
	}

	public LoginUseCase newLoginUseCase() {
		loginUseCase = new LoginUseCaseImpl(newUserRepository());
		return loginUseCase;
	}
	
	public GetUserByUserIdUseCase newGetUserByUserIdUseCase() {
		getUserByUserIdUseCase = new GetUserByUserIdUseCaseImpl(newUserRepository());
		return getUserByUserIdUseCase;
	}

	public ModifyPersonalInformationUseCase newChangePersonalInformationUseCase() {
		changePersonalInformationUseCase = new ModifyPersonalInformationUseCaseImpl(newUserRepository());
		return changePersonalInformationUseCase;
	}

	public GetUserIdByUserInformationUseCase newGetUserIdByUserInformationUseCase() {
		getUserIdByUserInformationUseCase = new GetUserIdByUserInformationUseCaseImpl(newUserRepository());
		return getUserIdByUserInformationUseCase;
	}
}
