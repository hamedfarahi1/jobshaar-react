import { accountService } from '../account/accountService';

const myTestUserNumber = Math.random() * 100;
test("register with this object should be successfully", async (done) => {
	const user = {
		username: `user_for_test${myTestUserNumber}`,
		password: '123456',
		email: `jobshaar${myTestUserNumber}@test.com`,
		allowExtraEmails: false,
		roleTypeIndex: 0
	}
	console.log(user);
	const response = await accountService.register(
		user
	);
	expect(response.status).toEqual(200);
	done();
}, 15000);

test("login with exist userpass should be successfully", async (done) => {
	const user = {
		roleTypeIndex: 0,
		username: `user_for_test${myTestUserNumber}`,
		password: '123456'
	}
	console.log(user)
	const response = await accountService.login(
		user
	);
	expect(response.status).toEqual(200);
	done();
}, 15000);



