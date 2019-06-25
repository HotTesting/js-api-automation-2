import * as mongoose from "mongoose";
import * as faker from "faker";
import { expect } from "chai";
import { Users } from "../../3/framework/service/controllers/users_controller";

async function promoteUserToAdmin(id: string) {
    await mongoose.connect("mongodb://localhost/admin", {
        useNewUrlParser: true
    });
    let users = mongoose.connection.collection("users");
    console.log("connected");

    // Query
    let result = await users.findOne({ _id: id });
    console.log(result);
    await users.findOneAndUpdate({ _id: id }, { $set: { isAdmin: true } });
    await mongoose.connection.close();
}

describe("Admin", function() {
    it("promotion", async function() {
        // Generating random email
        const email = faker.internet.email(
            undefined,
            undefined,
            "ip-5236.sunline.net.ua"
        );
        console.log('EMAIL', email)
        const resp = await new Users('http://localhost:38021').registerUser(email, email)

        expect(resp, JSON.stringify(resp))
            .to.be.an("object")
            .that.has.all.keys("token", "tokenExpires", "id");
        expect(typeof resp.token, JSON.stringify(resp)).to.equal("string");
        expect(typeof resp.tokenExpires, JSON.stringify(resp)).to.equal("string");
        expect(typeof resp.id, JSON.stringify(resp)).to.equal("string");

        await promoteUserToAdmin(resp.id);

        let tokenResp = await new Users('http://localhost:38021').login(email, email)
        const userDetails = await new Users('http://localhost:38021', undefined, tokenResp.token).userDetailsByID(resp.id)
        console.dir(userDetails)
    });
});
