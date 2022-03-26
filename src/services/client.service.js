import {
  collection,
  query,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../utils/firebaseConfig'
import { dateFormat, timestampFormat } from '../utils'

const clientMapper = (client) => ({
  ci: client.id,
  createdAt: dateFormat(client.data().createdAt?.seconds),
  name: client.data().name,
  lastName: client.data().lastName,
  phone: client.data().phone,
  active: client.data().active,
})

const clientsCollection = collection(db, 'clients')
const clientDoc = (ci) => doc(clientsCollection, ci)
const orderedClients = query(clientsCollection, orderBy('lastName', 'asc'))

// CONSULTA
const getAll = (setClients) =>
  onSnapshot(orderedClients, (snapshot) => {
    const clients = snapshot.docs.map(clientMapper)
    setClients(clients)
  })

//CONSULTA UN CLIENTE
const getOne = async (ci) => {
  try {
    const doc = await getDoc(clientDoc(ci))
    return doc.exists() ? clientMapper(doc) : null
  } catch (error) {
    throw error
  }
}

// ALTA
const add = async (ci, client) => {
  const newClient = {
    ...client,
    active: true,
    createdAt: timestampFormat(),
  }
  try {
    const doc = await getOne(ci)
    if (doc) throw new Error('Ya existe un cliente con ese CI')
    return await setDoc(clientDoc(ci), newClient)
  } catch (error) {
    throw error
  }
}

// REMOVE
const remove = (ci) => deleteDoc(clientDoc(ci))

// UPDATE
const update = (ci, client) => updateDoc(clientDoc(ci), client)

const clientService = { getAll, getOne, add, remove, update }
export default clientService
