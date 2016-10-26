class Api::SignupsController < ApiController
  def create
    signup = Signup.new(signup_params)
    if signup.save
      render json: {message: 'Successfully joined this team!'}
    else
      render json:{message: signup.errors.full_messages[0]}
    end
  end

  def update
    signup = Signup.find(params[:id])
    signup.update_attributes(signup_params)
    render json: {message: 'Successfully updated your volunteer preferences'}
  end

  def destroy
    signup = Signup.where(user_id: params[:id], team_id: params[:team_id])[0]
    Signup.destroy(signup.id)
    render json: {message: 'Successfully left this team'}
  end

  private
  def signup_params
    params.require(:signup).permit(:team_id, :user_id, :labor, :supplies)
  end
end
