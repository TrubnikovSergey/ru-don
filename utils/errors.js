export function getResponsError(dataRespons) {
  const status = dataRespons.response.status;
  let error = { code: 0, message: "", _id: "0" };

  if (typeof dataRespons.response.data === "string") {
    error.message = dataRespons.response.data;
    error.code = status;
  } else if (typeof dataRespons.response.data === "object" && "error" in dataRespons.response.data) {
    error = dataRespons.response.data.error;
  }

  return { status, error };
}
