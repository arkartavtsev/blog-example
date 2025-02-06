import { FC } from 'react'
import {
  useParams,
  useNavigate
} from 'react-router-dom'

import {
  useGetPostQuery,
  useEditPostMutation
} from '@/features/api/apiSlice'

import { PageContent } from '@/components'

import styles from './_PostEdit.module.css'


interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postText: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}


export const PostEdit: FC = () => {
  const { postId } = useParams()
  
  const navigate = useNavigate()

  const { data: post } = useGetPostQuery(postId!)

  const [ updatePost, { isLoading } ] = useEditPostMutation()


  const handleFormSubmit = async (evt: React.FormEvent<EditPostFormElements>) => {
    evt.preventDefault()

    const { elements } = evt.currentTarget
    const title = elements.postTitle.value
    const content = elements.postText.value

    if (post && title && content) {
      await updatePost({
        id: post.id,
        title,
        content
      })
      
      navigate(`/posts/${ postId }`)
    }
  }


  return <>
    <div className={ styles.root }>
      <PageContent title={ post ? 'Edit Post' : 'Post not found!' }>
        {
          post && <>
            <form onSubmit={ handleFormSubmit }>
              <label htmlFor={ 'postTitle' }>
                Post title:
              </label>
              <input
                id={ 'postTitle' }
                name={ 'postTitle' }
                type={ 'text' }
                defaultValue={ post.title }
                required
              />
      
              <label htmlFor={ 'postText' }>
                Post text:
              </label>
              <textarea
                id={ 'postText' }
                name={ 'postText' }
                defaultValue={ post.content }
                required
              />
      
              <button
                type={ 'submit' }
                disabled={ isLoading }
              >
                Save Post
              </button>
            </form>
          </>
        }
      </PageContent>
    </div>
  </>
}
