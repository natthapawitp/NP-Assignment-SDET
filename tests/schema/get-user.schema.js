const getUserSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        username: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string"},
        password: { type: "string" },
        phone: { type: "string" },
        userStatus: { type: "integer" }
    },
    required: ["id", "username", "firstName", "lastName", "email", "password", "phone", "userStatus"],
    additionalProperties: false
}

module.exports = {
    getUserSchema,
};