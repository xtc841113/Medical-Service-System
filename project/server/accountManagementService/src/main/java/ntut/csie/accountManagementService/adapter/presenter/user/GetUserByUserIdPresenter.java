package ntut.csie.accountManagementService.adapter.presenter.user;

import ntut.csie.accountManagementService.adapter.presenter.Presenter;
import ntut.csie.accountManagementService.useCase.UserModel;
import ntut.csie.accountManagementService.useCase.getUserByUserId.GetUserByUserIdOutput;

public class GetUserByUserIdPresenter implements Presenter<GetUserByUserIdOutput, GetUserByUserIdViewModel>, GetUserByUserIdOutput {
    private UserModel userModel;

    @Override
    public GetUserByUserIdViewModel buildViewModel() {
        GetUserByUserIdViewModel viewModel = new GetUserByUserIdViewModel();
        viewModel.setUserModel(userModel);
        return viewModel;
    }

    @Override
    public UserModel getUser() {
        return userModel;
    }

    @Override
    public void setUser(UserModel userModel) {
        this.userModel = userModel;
    }
}
