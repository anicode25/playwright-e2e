import { test, expect } from "@playwright/test";
import { HomePage } from "../tests/pages/home";
import { SignUp_Login_Page } from "../tests/pages/signup_login";

const baseURL = process.env.BASE_URL!;
const userName = process.env.REGISTER_USER_NAME!;
const userEmail = process.env.REGISTER_USER_EMAIL!;
const userPassword = process.env.REGISTER_USER_PASSWORD!;
//const userPassword = 'Itobuz#1234';

const home = new HomePage();
const signupandlogin = new SignUp_Login_Page();

test.beforeEach(async ({ page }) => {
  await home.goToHomePage(page, baseURL);
});

test("Login User with correct email and password", async ({ page }) => {
  await home.navigateToSignupPage(page);
  //await console.log(userPassword);
  await signupandlogin.logIn(page, userName, userEmail, userPassword);
  await signupandlogin.logOut(page);
});

test("Login User with incorrect email and password", async ({ page }) => {
  await home.navigateToSignupPage(page);
  await signupandlogin.invalidlogIn(page, 'sdf@gmail.com', 'Aniket@1234');
});
