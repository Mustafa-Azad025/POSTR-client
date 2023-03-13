const BASE_URL = "https://postrapp.vercel.app/";

export const getUser = async () => {
	const res = await fetch(`${BASE_URL}/api/userr`);
	const data = await res.json();
	return data;
};
