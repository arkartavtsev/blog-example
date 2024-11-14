import React from 'react'

import { useAppSelector } from '@/app/hooks'
import { useAddNewPostMutation } from '@/features/api/apiSlice'
import { selectCurrentUsername } from '@/features/auth/authSlice'


interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}


export const AddPostForm = () => {
  const userId = useAppSelector(selectCurrentUsername)!

  const [ addNewPost, { isLoading } ] = useAddNewPostMutation()


  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const form = e.currentTarget
    const { elements } = form

    const title = elements.postTitle.value
    const content = elements.postContent.value

    try {
      await addNewPost({ title, content, user: userId }).unwrap()

      form.reset()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    }
  }


  return (
    <section>
      <h2>Add a New Post</h2>
      
      <form onSubmit={ handleSubmit }>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          defaultValue=""
          required
        />

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />

        <button disabled={ isLoading }>
          Save Post
        </button>
      </form>
    </section>
  )
}
