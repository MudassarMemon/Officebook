export const onEnterOrSpace = (handler) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    if (e.key === " ") e.preventDefault();
    handler(e);
  }
};
