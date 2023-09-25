import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";

export const SearchForm = ({onSearch}) => {
    const [ search, setSearch ] = useState("");

    const handleSearchChange = (e) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
       
        if (newSearch === '') {
          onSearch('');
        } else {
          onSearch(newSearch);
        }
    };

      return (
        <Form>
        <Form.Control
        id="search-bar"
        type="text"
        placeholder="Search Movie Titles"
        value={search}
        onChange={handleSearchChange}
        />
        </Form>
      );
};