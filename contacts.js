const { writeFile } = require('fs');
const fs = require('fs/promises');
const path = require('path');
const { customAlphabet } = require('nanoid')

const nanoid = customAlphabet('1234567890', 4)

const contactsPath = path.join(__dirname, './db/contacts.json')

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, {encoding: 'utf8'});
        const parsedData = JSON.parse(data);
        console.table(parsedData);
    } catch (e) {
        throw new Error(e);
    }
}

const getContactById = async (contactId) => {
    try { 
        const data = await fs.readFile(contactsPath, {encoding: 'utf8'});
        const parsedData = JSON.parse(data);
        const findedContact = parsedData.find(contact => contact.id === contactId);
        console.log(findedContact);
    } catch (error) {
        console.error(error.message);
        process.exit(ExitCode.error);
    }
    
}

const removeContact = async (contactId) => {
    try {
         const data = await fs.readFile(contactsPath, {encoding: 'utf8'});
    const parsedData = JSON.parse(data);
    const updatedList = parsedData.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), {encoding: 'utf8'})
    } catch (e) {
        console.log(e);
    }
 
}

const addContact = async (name, email, phone) => {
    const contact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    const data = await fs.readFile(contactsPath, { encoding: 'utf8' });
    const parsedData = JSON.parse(data);
    const updatedList = [...parsedData, contact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), { encoding: 'utf8' })
    console.log('contact is added');
}

module.exports = { listContacts, getContactById, removeContact, addContact };