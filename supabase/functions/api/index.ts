import { Router, Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { EmailVerificationService } from './services/emailVerificationService.ts';

const router = new Router()
const emailVerificationService = new EmailVerificationService();

router.post('/api/verify', async (context) => {
  try {
    const body = await context.request.body().value;
    const emailToVerify = body.email;

    if (!emailToVerify) {
      context.response.status = 400;
      context.response.body = { message: "Email is required" };
      return;
    }

    const isValidEmail = await emailVerificationService.isEmailValid(emailToVerify);
    
    context.response.status = 200;
    context.response.body = { isValid: isValidEmail };
  } catch (error) {
    console.error('Error:', error);
    context.response.status = 500;
    context.response.body = { message: error };
  }
})

const app = new Application()

app.use(
  oakCors({
    origin: "*", // This allows all origins. Adjust as needed for production.
  }),
);

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 54321 })