const ApiClient = async (url, method, bodyConfig) => {
  const res = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyConfig),
  });

  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("Something went wrong");
  }
};

export default ApiClient;
