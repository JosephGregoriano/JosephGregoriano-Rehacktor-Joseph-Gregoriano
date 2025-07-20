import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <Form onSubmit={handleSearchSubmit} className="d-flex">
      <FormControl
        type="search"
        placeholder="Cerca un gioco..."
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button variant="outline-success" type="submit">Cerca</Button>
    </Form>
  );
}