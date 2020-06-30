package ntut.csie.accountManagementService.adapter.presenter.user;

import ntut.csie.accountManagementService.adapter.presenter.Presenter;
import ntut.csie.accountManagementService.useCase.modifyPersonalInformation.ModifyPersonalInformationOutput;

public class ModifyPersonalInformationPresenter implements Presenter<ModifyPersonalInformationOutput, ModifyPersonalInformationViewModel>, ModifyPersonalInformationOutput {
    private String outputMessage;

    @Override
    public ModifyPersonalInformationViewModel buildViewModel() {
        ModifyPersonalInformationViewModel viewModel = new ModifyPersonalInformationViewModel();
        viewModel.setOutputMessage(outputMessage);
        return viewModel;
    }

    @Override
    public String getOutputMessage() {
        return outputMessage;
    }

    @Override
    public void setOutputMessage(String outputMessage) {
        this.outputMessage = outputMessage;
    }
}
