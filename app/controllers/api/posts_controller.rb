class Api::PostsController < ApiController
  def index
  end

  def create
    post = Post.new(post_params)
    if post.save
      message = 'Post successfully created'
    else
      message = post.errors.full_messages[0]
    end
    render json: { message: message }, status: :ok
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy
  end

  private
  def post_params
    params.require(:post).permit(:user_id, :team_id, :body)
  end
end
