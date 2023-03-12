const BASE_URL = "http://localhost:3000";

export const getUser = async () => {
	const res = await fetch(`${BASE_URL}/api/userr`);
	const data = await res.json();
	return data;
};
