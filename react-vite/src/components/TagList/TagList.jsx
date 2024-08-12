// import React from 'react';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetTag } from "../../redux/tags";

const TagList = () => {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags)
	const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkGetTag()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    isLoaded ? (
    <div>
      {Object.values(tags).map((tag) => {
        <ul>
          <li>{tag}</li>
        </ul>
      })}
    </div>
    ) : (
      <div>whoopsie</div>
    )
  )
};

export default TagList;
