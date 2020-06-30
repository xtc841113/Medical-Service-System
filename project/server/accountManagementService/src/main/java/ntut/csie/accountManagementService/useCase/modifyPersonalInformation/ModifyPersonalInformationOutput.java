package ntut.csie.accountManagementService.useCase.modifyPersonalInformation;

import ntut.csie.accountManagementService.useCase.Output;

public interface ModifyPersonalInformationOutput extends Output {
	
	public String getOutputMessage();
	
	public void setOutputMessage(String outputMessage);
}
