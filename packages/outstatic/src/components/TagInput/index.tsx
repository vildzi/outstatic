import { useFormContext, RegisterOptions, Controller } from 'react-hook-form'
import { CustomFieldArrayValue } from '../../types'
import Creatable from 'react-select/creatable'
import camelcase from 'camelcase'
import { useState } from 'react'

export type TagProps = {
  label?: string
  id: string
  placeholder?: string
  helperText?: string
  type?: string
  readOnly?: boolean
  registerOptions?: RegisterOptions
  wrapperClass?: string
  className?: string
  suggestions?: CustomFieldArrayValue[]
} & React.ComponentPropsWithoutRef<'input'>

const TagInput = ({
  label,
  helperText,
  id,
  wrapperClass,
  suggestions = []
}: TagProps) => {
  const {
    control,
    getValues,
    setValue,
    formState: { errors }
  } = useFormContext()

  const [options, setOptions] = useState(suggestions)

  const createOption = (label: string) => ({
    label,
    value: camelcase(label)
  })

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue)
    setOptions((prev) => [...prev, newOption])
    const values = getValues(id) || []
    setValue(id, [...values, newOption])
  }

  return (
    <div className={wrapperClass}>
      {label && (
        <label
          htmlFor={id}
          className={`'block mb-2 text-sm font-medium text-gray-900 first-letter:capitalize`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <Controller
          name={id}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Creatable
              {...field}
              options={options}
              isMulti
              className={errors.multiSelect ? 'is-invalid' : ''}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? 'focus:ring-blue-500' : '',
                  borderRadius: '0.375rem',
                  backgroundColor: '#f9fafb',
                  fontSize: '0.875rem'
                })
              }}
              classNames={{
                menu: () => 'text-sm'
              }}
              onCreateOption={handleCreate}
            />
          )}
        />
      </div>
      <div className="flex flex-wrap"></div>
      <>
        {(errors[id]?.message || helperText) && (
          <div className="mt-1 first-letter:capitalize">
            {helperText && (
              <p className="text-xs text-gray-500">{helperText}</p>
            )}
            {errors[id]?.message && (
              <span className="text-sm text-red-500">
                {errors[id]?.message?.toString()}
              </span>
            )}
          </div>
        )}
      </>
    </div>
  )
}

export default TagInput
