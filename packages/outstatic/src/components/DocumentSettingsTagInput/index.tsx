import { useContext, useState } from 'react'
import Input from '../Input'
import { DocumentContext } from '../../context'
import { FormProvider, useForm } from 'react-hook-form'

type DocumentSettingsTagInputForm = { tag: string }

const DocumentSettingsTagInput = () => {
  const { document, editDocument } = useContext(DocumentContext)
  const { tags } = document
  const form = useForm<DocumentSettingsTagInputForm>()

  const handleTagAdd = ({ tag }: DocumentSettingsTagInputForm) => {
    if (tags?.includes(tag)) return
    editDocument('tags', [...(document.tags || []), tag])
    form.reset({ tag: '' })
  }

  const handleTagDelete = (tag: string) => {
    editDocument('tags', document.tags?.filter((t) => t !== tag) || [])
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit((data) => handleTagAdd(data))}>
        <div className="flex align-middle" style={{ gap: '5px' }}>
          <FormProvider {...form}>
            <Input id="tag" label="Add Tag" />
          </FormProvider>
          <button
            style={{ marginTop: 'auto', height: '38px' }}
            className="flex-shrink rounded-lg border border-gray-600 bg-gray-800 text-sm px-4 font-medium text-white hover:border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            Add
          </button>
        </div>
      </form>
      <label className="block mb-2 mt-2 text-sm font-medium text-gray-900">
        Tags
      </label>
      <div className="flex flex-wrap gap-2">
        {(tags || []).map((tag) => (
          <div
            key={tag}
            className="p-1 bg-gray-200 rounded-md flex flex-shrink align-middle"
          >
            <span>{tag}</span>
            <button
              type="button"
              className="-left-px-2"
              onClick={() => handleTagDelete(tag)}
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="css-i6dzq1"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentSettingsTagInput
