export const addNewChat = async (formData) => {
  try {
    const response = await fetch("/api/newchat/create-newchat", {
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

export const getAllNewChat = async (userID) => {
  try {
    const res = await fetch(`/api/newchat/get-all-newchat?id=${userID}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const DeleteChat = async (chatID) => {
  try {
    const res = await fetch(`/api/newchat/delete-newchat?id=${chatID}`, {
      method: "DELETE",
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
