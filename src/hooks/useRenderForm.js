import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInputText from '../components/FormInputText'

const useRenderForm = ({
  defaultValues = {},
  inputs,
  onError,
  onFinally,
  onSubmit,
}) => {
  const {
    handleSubmit: handleSubmitRHF,
    reset,
    control,
  } = useForm({ defaultValues })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const renderInputs = useCallback(
    () =>
      inputs.map((input, i) => (
        <FormInputText key={i} {...input} control={control} />
      )),
    [control, inputs]
  )

  const handleSubmit = handleSubmitRHF(async (data) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
    } catch (error) {
      if (onError) {
        onError(error)
      } else {
        alert(error.message)
      }
    } finally {
      onFinally && onFinally()
      setIsSubmitting(false)
      reset()
    }
  })

  return {
    handleSubmit,
    isSubmitting,
    renderInputs,
    reset,
  }
}

export default useRenderForm
