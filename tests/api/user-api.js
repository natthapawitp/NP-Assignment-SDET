const baseURL = 'https://petstore.swagger.io/v2/user';

export async function createUser(request, userData) {
  return await request.post(`${baseURL}/createWithList`, { data: userData });
}

export async function getUser(request, username) {
  return await request.get(`${baseURL}/${username}`);
}