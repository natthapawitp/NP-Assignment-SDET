export function generateUser() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);

    return [
        {
            id: timestamp,
            username: `user_${timestamp}_${randomNum}`,
            firstName: "Test",
            lastName: "User",
            email: `test_${timestamp}@example.com`,
            password: "pass123",
            phone: `${Math.floor(100000000 + Math.random() * 900000000)}`,
            userStatus: 1
        }
    ];
}
