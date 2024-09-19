import z from "zod";

export const LoginSchema = z
  .object({
    emailOrUsername: z.string().min(2, {
      message: "Tài khoản hoặc Email sai",
    }),
    password: z.string().min(1, {
      message: "Mật khẩu không được trống.",
    }),
  })
  .strict();

export type TLoginRequest = z.TypeOf<typeof LoginSchema>;

export type TLoginResponse = {
  message: string;
  accessToken: string;
  expireTime: number;
};
