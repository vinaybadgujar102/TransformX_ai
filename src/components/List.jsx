import React from 'react';

const List = ({ response }) => {
  // Define the CSS styles for the list and list items
  const listStyles = {
    listStyleType: 'disc', // Use bullet points for list items
    paddingLeft: '20px',   // Add some left padding for indentation
  };

  const listItemStyles = {
    marginBottom: '8px',   // Add space between list items
  };

  return (
    <ul style={listStyles}>
      {response.map((cue, index) => (
        <li key={index} style={listItemStyles}>
          {cue}
        </li>
      ))}
    </ul>
  );
}

export default List;
