const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const createUserInteractor = require('../../UseCases/UserUseCases/userRegisterInteractor')

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

// require("dotenv").config();

/* Connecting to the database before each test. */

beforeEach(async () => {
    await mongoose.connect(globalThis.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    // db = await connection.db(globalThis.__MONGO_DB_NAME__);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("POST /createUser", () => {
    it("should create a user", async () => {
        const user = await createUserInteractor('test@gmail.com', 'password')

        const res = await request(app).post("/createUser").send(user);
        expect(res.statusCode).toBe(201);
        // expect(res.body.name).toBe("Product 2");
    });
});