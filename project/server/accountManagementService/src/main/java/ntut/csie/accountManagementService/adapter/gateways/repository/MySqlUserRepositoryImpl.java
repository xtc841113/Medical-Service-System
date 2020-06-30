package ntut.csie.accountManagementService.adapter.gateways.repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import ntut.csie.accountManagementService.adapter.gateways.database.SqlDatabaseHelper;
import ntut.csie.accountManagementService.adapter.gateways.database.UserTable;
import org.springframework.security.crypto.bcrypt.BCrypt;

import ntut.csie.accountManagementService.entity.model.User;
import ntut.csie.accountManagementService.useCase.UserRepository;

public class MySqlUserRepositoryImpl implements UserRepository{
	private SqlDatabaseHelper sqlDatabaseHelper = SqlDatabaseHelper.getInstance();
	private UserMapper userMapper;
	
	public MySqlUserRepositoryImpl() {
		userMapper = new UserMapper();
	}

	@Override
	public void save(User user) {
		UserData data = userMapper.transformToUserData(user);
		String sql = String.format("Insert Into %s Values (?, ?, ?, ?, ?, ?) On Duplicate Key Update %s=?, %s=?, %s=?, %s=?",
				UserTable.tableName, UserTable.email, UserTable.password, UserTable.name, UserTable.systemRole);
		PreparedStatement preparedStatement = sqlDatabaseHelper.getPreparedStatement(sql);
		try {
			preparedStatement.setString(1, data.getId());
			preparedStatement.setString(2, data.getUsername());
			preparedStatement.setString(3, data.getEmail());
			preparedStatement.setString(4, data.getPassword());
			preparedStatement.setString(5, data.getName());
			preparedStatement.setString(6, data.getSystemRole());
			preparedStatement.setString(7, data.getEmail());
			preparedStatement.setString(8, data.getPassword());
			preparedStatement.setString(9, data.getName());
			preparedStatement.setString(10, data.getSystemRole());
			preparedStatement.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public User getUserById(String id) {
		User user = null;
		String query = String.format("Select * From %s Where %s = '%s'",
				UserTable.tableName,
				UserTable.id,
				id);
		ResultSet resultSet = sqlDatabaseHelper.getResultSet(query);
		try {
			if(resultSet.first()) {
				String userId = resultSet.getString(UserTable.id);
				String username = resultSet.getString(UserTable.username);
				String email = resultSet.getString(UserTable.email);
				String password = resultSet.getString(UserTable.password);
				String systemRole = resultSet.getString(UserTable.systemRole);
				String name = resultSet.getString(UserTable.name);
				
				UserData data = new UserData();
				data.setId(userId);
				data.setUsername(username);
				data.setEmail(email);
				data.setPassword(password);
				data.setSystemRole(systemRole);
				data.setName(name);
				
				
				user = userMapper.transformToUser(data);
			}
			resultSet.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}

	@Override
	public User getUserByUsername(String username) {
		User user = null;
		String query = String.format("Select * From %s Where %s = '%s'",
				UserTable.tableName,
				UserTable.username,
				username);
		ResultSet resultSet = sqlDatabaseHelper.getResultSet(query);
		try {
			if(resultSet.first()) {
				String userId = resultSet.getString(UserTable.id);
				String email = resultSet.getString(UserTable.email);
				String password = resultSet.getString(UserTable.password);
				String systemRole = resultSet.getString(UserTable.systemRole);
				String name = resultSet.getString(UserTable.name);
				
				UserData data = new UserData();
				data.setId(userId);
				data.setUsername(username);
				data.setEmail(email);
				data.setPassword(password);
				data.setSystemRole(systemRole);
				data.setName(name);
				
				
				user = userMapper.transformToUser(data);
			}
			resultSet.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}


	@Override
	public Boolean AuthenticateUser(String username, String password) {
		User user = getUserByUsername(username);
		
		if(user != null) {
			return BCrypt.checkpw(password, user.getPassword());
		} else {
			return false;
		}
	}

	
}
