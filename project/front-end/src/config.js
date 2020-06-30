class Config{
	// Deploy
	// static host = "https://ssl-ezscrum.csie.ntut.edu.tw";
	// static front_end = "https://ssl-ezscrum.csie.ntut.edu.tw/ezKanban";
	// static kanban_api = "/ezKanban/api";
	// static accountManagementService_api = "/ams/api"

	// //Develope
	static host = "http://localhost:8080";
	static front_end = "http://localhost:3000";
	static kanban_api = "/kanban";
	static accountManagementService_api = "/accountManagementService"
	static jsonServer = "http://localhost:7000";
	static fhir_api = "http://localhost:8888/hapi-fhir-jpaserver/fhir"

	//Develpoe front-end only
	// static host = "https://ssl-ezscrum.csie.ntut.edu.tw";
	// static front_end = "http://localhost:3000";
	// static kanban_api = "/ezKanban/api";
	// static accountManagementService_api = "/ams/api"
}



export default Config;