package ntut.csie.accountManagementService.useCase.getUserIdByUserInformation;

import ntut.csie.accountManagementService.useCase.Input;

public interface GetUserIdByUserInformationInput extends Input {

    public String getUsername();

    public void setUsername(String username);
}
