import { v4 as uuidv4 } from 'uuid';

import ContactForm from './Components/ContactForm/';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/ContactList';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useLocalStorage('filter', '');

  const addContact = (name, number) => {
    const arrayName = contacts.map(contact => {
      return contact.name;
    });

    if (arrayName.includes(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      name,
      id: uuidv4(),
      number,
    };

    setContacts([contact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const visibleContacts = getVisibleContacts();
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </>
  );
}
