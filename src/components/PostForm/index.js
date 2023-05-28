import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "./styles.css"

const PostForm = ({
  post,
  setPost,
  onSubmit
}) => {
  const {handleSubmit, register, formState: { errors }} = useForm({
    values: {...post}
  });


  return (
    <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="post-form-input-group">
        <label htmlFor="title">Title *</label>
        <input 
          onChange={(e) => setPost({...post, title:e.target.value})}
          {...register("title", {
            name: "title",
            required: "Title is required"
          })}
        />
        {errors.title && <div className="error">{errors.title.message}</div>}
      </div>

      <div className="post-form-input-group">
        <label htmlFor="description">Description *</label>
        <input 
          {...register("description", {
            name:"description",
            required: "Description is required"
          })}
        />
        {errors.description && <div className="error">{errors.description.message}</div>}
      </div>

      <div className="post-form-input-group">
        <label htmlFor="price">Price *</label>
        <input 
          {...register("price", {
            name:"price",
            required: "Price is required"
          })}
        />
        {errors.price && <div className="error">{errors.price.message}</div>}
      </div>

      <div className="post-form-input-group">
        <label htmlFor="location">Location</label>
        <input 
          {...register("location", {
            name:"location"
          })}
        />
      </div>

      <div 
        className="post-form-input-group"
        style={{
          display: "block"
        }}
      >
        <label htmlFor="willDeliver">Will you deliver this item? </label>
        <input 
          type="checkbox"
          {...register("willDeliver", {
            name:"willDeliver"
          })}
        />
      </div>
      <Button type="submit">Submit</Button>
      <Link to="/">Return to Homepage</Link>
    </form>
  );
}

export default PostForm;
