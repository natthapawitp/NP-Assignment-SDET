import { test, expect } from "@playwright/test";
import { createUserSchemaArray, createUserSchemaObject } from "../tests/schema/create-user.schema";
import { getUserSchema } from "../tests/schema/get-user.schema";
import { generateUserArray, generateUserObject } from "../tests/data/user-data";
import { createWithList, createUser, getUser } from "../tests/api/user-api";
import Ajv from "ajv";

const ajv = new Ajv();

test.describe('API Test: Create and Get User', () => {
    test('should create a user and retrieve it', async ({ request }) => {

        // STEP 1: Generate random user data
        const userData = generateUserObject();
        //const userData = generateUserArray();

        console.log("Request Body (POST):", JSON.stringify(userData, null, 2));

        // STEP 2: Send POST request to create the user
        const createResponse = await createUser(request, userData);
        //const createResponse = await createWithList(request, userData);

        // Check if the POST was successful
        expect(createResponse.status()).toBe(200);

        // Validate the request body matches the create user schema
        const validateCreate = ajv.compile(createUserSchemaObject);
        //const validateCreate = ajv.compile(createUserSchemaArray);
        expect(validateCreate(userData)).toBeTruthy();

        // STEP 3: Try to GET the user with retry mechanism
        const username = userData.username;
        //const username = userData[0].username;
        let getResponse;
        let retries = 5;
        let delayMs = 1000; // 1 second between retries

        for (let i = 0; i < retries; i++) {
            getResponse = await getUser(request, username);

            // If user found, break the loop
            if (getResponse.status() === 200) break;

            console.log(`Retry ${i + 1}: User not found yet, trying again...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }

        // After retry, make sure the user was found
        expect(getResponse.status()).toBe(200);

        // STEP 4: Validate the response body
        const getBody = await getResponse.json();

        // Validate that the GET response matches the schema
        const validateGet = ajv.compile(getUserSchema);
        expect(validateGet(getBody)).toBeTruthy();

        // STEP 5: Compare the created user and the retrieved user
        console.log("Response Body (GET):", JSON.stringify(getBody, null, 2));
        expect(getBody).toEqual(userData);
        //expect(getBody).toEqual(userData[0]);
    });
});
