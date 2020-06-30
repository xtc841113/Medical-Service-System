package ntut.csie.accountManagementService.useCase.getUserIdByUserInformation;

import ntut.csie.accountManagementService.useCase.Output;

public interface GetUserIdByUserInformationOutput extends Output {

    public String getUserId();

    public void setUserId(String userId);
}
