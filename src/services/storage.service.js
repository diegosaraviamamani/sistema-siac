import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { storage } from '../utils/firebaseConfig'
import { timestampFormat } from '../utils'
import clientService from './client.service'
import testService from './test.service'

const getPathReference = ({ ci, order }) => ref(storage, `${ci}/${order}.pdf`)

const getFileUrl = async ({ ci, order, omitActive = false }) => {
  try {
    const client = await clientService.getOne(ci)
    if (!client) throw new Error('No existe un cliente con ese CI')
    if (!omitActive && !client.active)
      throw new Error('El cliente no esta activo')
    const test = await testService.getOne(ci, order)
    if (!test) throw new Error('No existe un test con ese nro de orden')
    if (!test.uploadedAt)
      throw new Error('Aun no se ha cargado el resultado de la prueba')
    const url = await getDownloadURL(getPathReference({ ci, order }))
    return url
  } catch (error) {
    throw error
  }
}

const uploadFile = async ({ ci, order }, file) => {
  try {
    const pathData = { ci, order }
    const resultUpload = await uploadBytes(getPathReference(pathData), file)
    await testService.update(ci, order, { uploadedAt: timestampFormat() })
    return resultUpload
  } catch (error) {
    throw error
  }
}
const deleteFile = async ({ ci, order }) => {
  try {
    const pathData = { ci, order }
    await deleteObject(getPathReference(pathData))
    const testData = { uploadedAt: null }
    await testService.update(ci, order, testData)
  } catch (error) {
    throw error
  }
}

const storageService = { getFileUrl, uploadFile, deleteFile }

export default storageService
