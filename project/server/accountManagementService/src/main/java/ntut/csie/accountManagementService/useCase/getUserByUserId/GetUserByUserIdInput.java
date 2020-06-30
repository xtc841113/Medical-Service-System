package ntut.csie.accountManagementService.useCase.getUserByUserId;

import ntut.csie.accountManagementService.useCase.Input;

public interface GetUserByUserIdInput extends Input {
	public String getUserId();
	
	public void setUserId(String userId);
}
