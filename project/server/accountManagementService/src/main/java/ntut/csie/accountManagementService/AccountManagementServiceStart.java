package ntut.csie.accountManagementService;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpServlet;

import ntut.csie.accountManagementService.adapter.gateways.database.SqlDatabaseHelper;


@SuppressWarnings("serial")
public class AccountManagementServiceStart extends HttpServlet implements ServletContextListener{
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("Account Manager Start!");

		SqlDatabaseHelper.getInstance();
		//ApplicationContext.getInstance();
	}
}
