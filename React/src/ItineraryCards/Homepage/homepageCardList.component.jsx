import React from "react";
import { HomepageCard } from "./homepageCard";

export const HomepageCardList = ({ homepageItems }) => {
  return (
    <React.Fragment>
      {homepageItems.map((homepageItem) => (
        <HomepageCard key={homepageItem.id} homepageItem={homepageItem} />
      ))}
    </React.Fragment>
  );
};
