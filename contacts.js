import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");
const updeteContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

//  Повертає масив контактів.
export const listContacts = async () => {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  }
  
//  Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.  
export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
  }

//  Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений. 
export const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null
    }

    const [result] = contacts.splice(index, 1);
    await updeteContacts(contacts);
    return result;
  }

//  Повертає об'єкт доданого контакту. 
export const addContact = async(name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }

  contacts.push(newContact);
  await updeteContacts(contacts);
  return newContact;
  }