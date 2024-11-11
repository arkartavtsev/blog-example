import React, { useState } from 'react'

import {
  useAppDispatch,
  useAppSelector
} from '@/app/hooks'
import { addNewPost } from './postsSlice'

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

  const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>('idle')


  const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const form = e.currentTarget
    const { elements } = form

    const title = elements.postTitle.value
    const content = elements.postContent.value

    try {
      setAddRequestStatus('pending')

      await dispatch(
        addNewPost({ title, content, user: userId })
      ).unwrap()

      form.reset()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
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

        <button disabled={ addRequestStatus === 'pending' }>
          Save Post
        </button>
      </form>
    </section>
  )
}
