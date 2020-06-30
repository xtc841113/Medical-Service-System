package ntut.csie.accountManagementService.adapter.gateways.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class SqlDatabaseHelper {
	private static SqlDatabaseHelper instance = null;
	private String serverUrl = "127.0.0.1";
	private String databaseName = "user";
	private String account = "root";
	private String password = "root";
	private Connection connection;
	
	private SqlDatabaseHelper() {
		connection();
		createUserDatabase();
		createUserTable();
	}
	
	public static synchronized SqlDatabaseHelper getInstance() {
		if(instance == null) {
			instance = new SqlDatabaseHelper();
		}
		return instance;
	}
	
	private void connection() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://"+serverUrl+":3306?useSSL=false", account, password);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private void createUserDatabase() {
		String sql = "Create Database If Not Exists " + databaseName;
		try {
			Statement statement = connection.createStatement();
			statement.executeUpdate(sql);
			connection = DriverManager.getConnection("jdbc:mysql://"+serverUrl+":3306/" + databaseName + "?useSSL=false", account, password);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private void createUserTable() {
		String sql = "Create Table If Not Exists " + UserTable.tableName + " ("
				+ UserTable.id + " Varchar(50) Not Null, "
				+ UserTable.username + " Varchar(50) Not Null, " 
				+ UserTable.email + " Varchar(50) Not Null, "
				+ UserTable.password + " Varchar(72) Not Null, "
				+ UserTable.name + " Varchar(50) Not Null, "
				+ UserTable.systemRole + " Varchar(50) Not Null, "
				+ "Primary Key (" + UserTable.id + ")"
				+ ")";
		try {
			Statement statement = connection.createStatement();
			statement.executeUpdate(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	public PreparedStatement getPreparedStatement(String sql) {
		PreparedStatement preparedStatement = null;
		try {
			preparedStatement = connection.prepareStatement(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return preparedStatement;
	}
	
	public ResultSet getResultSet(String query) {
		ResultSet resultSet = null;
		try {
			Statement statement = connection.createStatement();
			resultSet = statement.executeQuery(query);
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return resultSet;
	}
}
