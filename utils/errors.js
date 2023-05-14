export function getResponsError(dataRespons) {
  const valueError = dataRespons.response.data.error;
  return { status: valueError.code, error: dataRespons.response.data.error };
}
