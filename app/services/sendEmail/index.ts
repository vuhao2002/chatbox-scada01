export const sendMailResetPassword = async (data) => {
  console.log(data);
  return fetch("/api/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
