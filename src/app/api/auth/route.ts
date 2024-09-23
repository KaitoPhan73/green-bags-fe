export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.accessToken as string;
  const expireTime = body.expireTime as number;
  console.log("accessToken", accessToken);
  console.log("expireTime", expireTime);
  if (!accessToken) {
    return new Response(
      JSON.stringify({ message: "Không nhận được session token" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Tính toán thời gian hết hạn cho cookie (3 tháng)
  const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000; // 3 tháng tính bằng milliseconds
  const expiresDate = new Date(Date.now() + threeMonthsInMs).toUTCString(); // Thời gian hết hạn của cookie

  // Thiết lập các cookie trong header
  const setCookieHeader = [
    `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${expireTime}`,
  ].join(", ");

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Set-Cookie": setCookieHeader,
      "Content-Type": "application/json",
    },
  });
}
