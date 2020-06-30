package ntut.csie.accountManagementService.adapter.presenter.user;

import ntut.csie.accountManagementService.adapter.presenter.Presenter;
import ntut.csie.accountManagementService.useCase.login.LoginOutput;

public class LoginPresenter implements Presenter<LoginOutput, LoginViewModel>, LoginOutput {

    private String outputMessage;
    private String token;
    private String userId;
    private String name;
    private String role;
    @Override
    public LoginViewModel buildViewModel() {
        LoginViewModel viewModel = new LoginViewModel();
        viewModel.setOutputMessage(outputMessage);
        viewModel.setToken(token);
        viewModel.setUserId(userId);
        viewModel.setName(name);
        viewModel.setRole(role);
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

    @Override
    public String getToken() {
        return token;
    }

    @Override
    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String getUserId() {
        return userId;
    }

    @Override
    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getRole() {
        return role;
    }

    @Override
    public void setRole(String role) {
        this.role = role;
    }
}
