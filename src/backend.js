const environmentConfigData = import.meta.env;

export const BackendURL = environmentConfigData.PROD === true
	? environmentConfigData.VITE_BACKEND_SERVICE
	: "http://localhost:9000";
