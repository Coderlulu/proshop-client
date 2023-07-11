import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({
  title = "Welcome To ProShop",
  description = "We sell the best products for you",
  keywords = "electronics ",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

export default Meta;
