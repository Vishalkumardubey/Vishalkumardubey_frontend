//Q. Explain what the simple List component does.

/*The List component is a React functional component that renders a list of items. The component takes an array of items as its items prop, and for each item in the array, it renders a corresponding SingleListItem component.
Each SingleListItem component is responsible for rendering a single item from the array, and it displays the text property of the item. The component also has an isSelected property that determines whether the item is currently selected, and it displays the item's background color accordingly.
When a user clicks on an item, the handleClick function is called, and it updates the selectedIndex state value to reflect the selected index. The isSelected property of the SingleListItem component is then updated to reflect the current selection state of the item.*/

//Q. What problems / warnings are there with code?

/*In the List component, the initial value of the selectedIndex state is not set, which can cause problems when checking whether an item is selected or not.
In the SingleListItem component, the onClickHandler is not correctly bound to the index of the clicked item. This can cause issues when trying to retrieve the index of the clicked item.
The isSelected prop in the SingleListItem component is not checked for a truthy value, which can cause problems when trying to determine if an item is selected or not.
In the PropTypes declaration of the List component, array should be arrayOf.*/

//Q. Please fix, optimize, and/or modify the component as much as you think is necessary.

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)} // Fixed: onClickHandler should be a function, not the result of calling a function
    >
      {text}
    </li>
  );
};
WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
const SingleListItem = memo(WrappedSingleListItem);
// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null); // Fixed: setSelectedIndex is a state value, not a function
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <ul style={{ textAlign: 'left' }}>
      {items?.map((item, index) => ( // Fixed: Use optional chaining to handle null or undefined items
        <SingleListItem
          onClickHandler={handleClick} // Fixed: onClickHandler prop should reference the function, not an arrow function
          text={item.text}
          index={index}
          isSelected={selectedIndex === index} // Fixed: isSelected should compare to index, not a function
          key={index} // Added: Need a unique key prop for each list item
        />
      ))}
    </ul>
  );
};
WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ // Fixed: PropTypes.array should be PropTypes.arrayOf
    text: PropTypes.string.isRequired,
  })),
};
WrappedListComponent.defaultProps = {
  items: [], // Fixed: items should be an empty array, not null
};
const List = memo(WrappedListComponent);
export default List;