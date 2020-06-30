package ntut.csie.accountManagementService.adapter.presenter;


import ntut.csie.accountManagementService.useCase.Output;

public interface Presenter<O extends Output,M extends ViewModel> {
    public M buildViewModel();
}
