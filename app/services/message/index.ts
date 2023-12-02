export const addNewMessage = async (formData) => {
  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessage = async (chatID) => {
  try {
    const res = await fetch(`/api/message?id=${chatID}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
