package ntut.csie.accountManagementService.useCase.getUserByUserId;

import ntut.csie.accountManagementService.useCase.Output;
import ntut.csie.accountManagementService.useCase.UserModel;

public interface GetUserByUserIdOutput extends Output {
	
	public UserModel getUser();
	
	public void setUser(UserModel userModel);
}
