package ntut.csie.accountManagementService.adapter.presenter.user;

import ntut.csie.accountManagementService.adapter.presenter.Presenter;
import ntut.csie.accountManagementService.useCase.register.RegisterOutput;

public class RegisterPresenter implements Presenter<RegisterOutput, RegisterViewModel>, RegisterOutput {
    private String message;

    @Override
    public RegisterViewModel buildViewModel() {
        RegisterViewModel viewModel = new RegisterViewModel();
        viewModel.setMessage(message);
        return viewModel;
    }

    @Override
    public String getOutputMessage() {
        return message;
    }

    @Override
    public void setOutputMessage(String message) {
        this.message = message;
    }
}
