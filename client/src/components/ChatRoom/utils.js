export const scrollToLatest = () => {
  let cBody = document.getElementById("cBodyWrapper");
  if (cBody) cBody.scrollTop = cBody.scrollHeight;
};
