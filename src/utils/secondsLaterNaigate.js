const secondsLaterNavigate = (navigate, url) => {
  setTimeout(() => {
    navigate(url);
  }, 3000);
};
export default secondsLaterNavigate;
