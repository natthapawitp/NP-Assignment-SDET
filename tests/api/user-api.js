const baseURL = 'https://petstore.swagger.io/v2';

export async function createWithList(request, userData) {
  return await request.post(`${baseURL}/user/createWithList`, { data: userData });
}

export async function createUser(request, userData) {
  return await request.post(`${baseURL}/user`, { data: userData });
}

export async function getUser(request, username) {
  return await request.get(`${baseURL}/user/${username}`);
}