import React from 'react'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'
import { postAdded } from './postsSlice'

import { selectCurrentUsername } from '@/features/auth/authSlice'


interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}


export const AddPostForm = () => {
  const dispatch = useAppDispatch()

  const userId = useAppSelector(selectCurrentUsername)!


  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const form = e.currentTarget
    const { elements } = form

    const title = elements.postTitle.value
    const content = elements.postContent.value

    dispatch(postAdded(title, content, userId))

    form.reset()
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

        <button>Save Post</button>
      </form>
    </section>
  )
}
