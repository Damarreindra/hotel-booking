import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailVerif(email: string, token: string) {
  const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "StayEase Email Verification",
    html: `<p>Click <a href="${verifyLink}">here</a> to verify your email.</p>`,
  });
}
