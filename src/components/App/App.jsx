import { Component } from 'react';
import { Contacts } from '../Contacts/Contacts';
import { FormPhoneBook } from '../Form/Form';
import { nanoid } from 'nanoid';
import { FindContacts } from '../FindContacts/FindContacts';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PageWrapper } from './App.styled';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSubmit = ({ name, number }) => {
    this.setState(prevState => {
      if (prevState.contacts.find(contact => contact.name === name)) {
        Notify.failure(`${name} is alredy in contacts`);
        return;
      }

      const newContact = { name, number, id: nanoid() };
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };
  onDelete = delEl => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== delEl),
    }));
  };
  onFindUser = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  render() {
    const filterNumbers = this.state.contacts.filter(user =>
      user.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <PageWrapper>
        <h1>Phonebook</h1>
        <FormPhoneBook onSubmit={this.onSubmit} />
        <h2>Contacts</h2>
        <FindContacts onFindUser={this.onFindUser} />
        <Contacts
          onDelete={this.onDelete}
          users={filterNumbers}
          onFindUser={this.onFindUser}
        />
      </PageWrapper>
    );
  }
}
