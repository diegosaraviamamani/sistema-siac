import { db, storage } from '../utils/firebaseConfig'
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
import { dateFormat, timestampFormat } from '../utils'
import { deleteObject, ref } from 'firebase/storage'

const testMapper = (test) => ({
  order: test.id,
  createdAt: dateFormat(test.data().createdAt?.seconds),
  type: test.data().type,
  uploadedAt: dateFormat(test.data().uploadedAt?.seconds),
})

const testsCollection = (ci) => collection(db, 'clients', ci, 'testResults')
const testDoc = (ci, order) => doc(testsCollection(ci), order)
const orderedTests = (ci) =>
  query(testsCollection(ci), orderBy('createdAt', 'desc'))

// CONSULTA
const getAll = (ci, setTests) =>
  onSnapshot(orderedTests(ci), (snapshot) => {
    const tests = snapshot.docs.map(testMapper)
    setTests(tests)
  })

//CONSULTA UN TEST
const getOne = async (ci, order) => {
  try {
    const doc = await getDoc(testDoc(ci, order))
    return doc.exists() ? testMapper(doc) : null
  } catch (error) {
    throw error
  }
}

// ALTA
const add = async ({ ci, order, type }) => {
  const newTest = {
    type: type.toUpperCase(),
    createdAt: timestampFormat(),
  }
  try {
    const doc = await getOne(ci, order)
    if (doc) throw new Error('Ya existe un test con ese número de orden')
    return await setDoc(testDoc(ci, order), newTest)
  } catch (error) {
    throw error
  }
}

// REMOVE
const remove = async (ci, order) => {
  try {
    const { uploadedAt } = await getOne(ci, order)
    await deleteDoc(testDoc(ci, order))
    const fileReference = ref(storage, `${ci}/${order}.pdf`)
    if (uploadedAt) deleteObject(fileReference)
  } catch (error) {
    throw error
  }
}

// UPDATE
const update = (ci, order, test) => updateDoc(testDoc(ci, order), test)

const testService = { getAll, getOne, add, remove, update }
export default testService
